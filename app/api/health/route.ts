import { sendAlert } from '@/lib/alert'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { getSupabaseAnon } from '@/lib/supabaseAnon'

// Health check da camada de dados: faz o que um visitante faz e confirma que
// ficou guardado.
//
// Porque existe: o site já parou de guardar emails três vezes a responder `200`
// em todas as páginas, e o Supabase do plano gratuito pausa ao fim de ~7 dias
// sem actividade. Chamado pelo cron de `vercel.json`, fecha as duas metades de
// uma vez — tocar na base de dados é o que a impede de pausar, e a falha chega
// por email em vez de esperar que alguém a reporte.
//
// O cron corre uma vez por dia (07:00 UTC): chega para impedir a pausa e põe o
// atraso máximo de um alerta em ~24h, contra os quatro dias da paragem de 01/09.
// No plano Hobby a Vercel só aceita crons diários, e corre-os algures dentro da
// hora marcada. Um alerta imediato vem de outro lado: o `signupEmail` avisa
// sozinho quando um visitante real não consegue guardar o email.
//
// O que faz, por ordem:
//   1. insere um email-sentinela com a chave ANON, pela mesma policy de RLS
//      que os formulários do site usam;
//   2. apaga-o com a service-role e exige ter apagado pelo menos uma linha.
// O passo 2 é o que prova a escrita: um insert sem erro não chega, e o próprio
// `signupEmail` devolve `ok:true` para um email repetido sem ter guardado nada.
//
// Responde 200 se as duas coisas correram bem, 503 (e envia o alerta) se não.

// Sentinelas: um endereço por execução, para não colidir com o `unique` da
// coluna se uma limpeza anterior tiver falhado — e a limpeza apaga todos os
// que encontrar, incluindo restos dessas execuções.
const SENTINEL_PREFIX = 'healthcheck+'
const SENTINEL_DOMAIN = '@eneec.pt'
const SENTINEL_SOURCE = 'healthcheck'

export async function GET(request: Request) {
  // A Vercel envia `Authorization: Bearer <CRON_SECRET>` nas chamadas de cron.
  // Sem segredo configurado, recusa em vez de ficar aberto: este endpoint
  // escreve na base de dados de produção.
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return Response.json({ ok: false, error: 'CRON_SECRET não configurado' }, { status: 500 })
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: 'não autorizado' }, { status: 401 })
  }

  const started = Date.now()
  const sentinel = `${SENTINEL_PREFIX}${started}${SENTINEL_DOMAIN}`

  const failure = await checkWrite(sentinel)
  const ms = Date.now() - started

  if (!failure) {
    return Response.json({ ok: true, ms })
  }

  console.error(`[health] falhou no passo "${failure.step}": ${failure.error}`)
  const alert = await sendAlert(
    'A base de dados não está a guardar',
    `O health check de ${new Date(started).toISOString()} falhou no passo "${failure.step}".\n\n` +
    `Erro: ${failure.error}\n\n` +
    `Enquanto isto durar, os formulários de eneec.pt respondem normalmente e não guardam nada.\n\n` +
    `Primeiro diagnóstico (vault › eneec/proximos-passos › 0.4):\n` +
    `  dig +short <ref>.supabase.co — sem IPs quer dizer projecto pausado; retomar no dashboard do Supabase.`,
  )

  return Response.json(
    { ok: false, step: failure.step, error: failure.error, ms, alertSent: alert.sent },
    { status: 503 },
  )
}

async function checkWrite(sentinel: string): Promise<{ step: string; error: string } | null> {
  try {
    const { error: insertError } = await getSupabaseAnon()
      .from('email_signups')
      .insert({ email: sentinel, source: SENTINEL_SOURCE })
    if (insertError) {
      return { step: 'insert (chave anon)', error: `${insertError.code || 'sem código'} — ${insertError.message}` }
    }

    const { data, error: deleteError } = await getSupabaseAdmin()
      .from('email_signups')
      .delete()
      .like('email', `${SENTINEL_PREFIX}%${SENTINEL_DOMAIN}`)
      .select('email')
    if (deleteError) {
      return { step: 'delete (service role)', error: `${deleteError.code || 'sem código'} — ${deleteError.message}` }
    }
    if (!data.some(row => row.email === sentinel)) {
      return { step: 'confirmação', error: 'o insert não deu erro, mas a linha não estava na tabela' }
    }
    return null
  } catch (err) {
    // `getSupabaseAdmin` atira se faltar a service-role key; um erro de rede
    // também pode chegar aqui em vez de vir no `error` do cliente.
    return { step: 'excepção', error: err instanceof Error ? err.message : String(err) }
  }
}
