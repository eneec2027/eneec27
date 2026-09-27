// Avisa a equipa por email quando alguma coisa deixa de funcionar em silêncio.
//
// Existe porque o site já parou de guardar inscrições três vezes (12/08, 25/08,
// 01/09) a responder `200` em todas as páginas, e das três vezes só se soube
// porque alguém tentou usar o site. Server-side only — a chave do Resend nunca
// pode chegar ao browser.
//
// Envia pela API HTTP do Resend, sem SDK: é um único POST. Variáveis:
//   RESEND_API_KEY   — obrigatória; sem ela não há alerta, e isso é registado
//   ALERT_EMAIL_TO   — obrigatória; um ou mais endereços separados por vírgula
//   ALERT_EMAIL_FROM — opcional; enquanto o domínio eneec.pt não estiver
//                      verificado no Resend, só o remetente de testes
//                      `onboarding@resend.dev` funciona, e só para o email
//                      da própria conta Resend.

const DEFAULT_FROM = "ENEEC'27 <onboarding@resend.dev>"

export async function sendAlert(subject: string, text: string): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ALERT_EMAIL_TO?.split(',').map(s => s.trim()).filter(Boolean) ?? []

  if (!apiKey || to.length === 0) {
    const missing = [!apiKey && 'RESEND_API_KEY', to.length === 0 && 'ALERT_EMAIL_TO']
      .filter(Boolean).join(' e ')
    // Um alerta que não pode sair tem de deixar pelo menos rasto nos logs.
    console.error(`[alert] não enviado — falta ${missing}. Assunto: ${subject}`)
    return { sent: false, error: `falta ${missing}` }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.ALERT_EMAIL_FROM || DEFAULT_FROM,
        to,
        subject: `[ENEEC'27] ${subject}`,
        text,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error(`[alert] o Resend recusou (${res.status}): ${body}`)
      return { sent: false, error: `Resend ${res.status}: ${body}` }
    }
    return { sent: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[alert] falhou o envio: ${message}`)
    return { sent: false, error: message }
  }
}
