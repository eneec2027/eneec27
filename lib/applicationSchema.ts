import { z } from 'zod'
import { SECTOR_SLUGS, type Sector } from './sectors'
import { UNIVERSITIES, COURSES } from './formOptions'

const answerBlock = z.object({
  q1: z.string().min(1, 'Responde à pergunta.'),
  q2: z.string().min(1, 'Responde à pergunta.'),
  q3: z.string().min(1, 'Responde à pergunta.'),
})

export const applicationSchema = z.object({
  full_name:       z.string().min(2, 'Nome obrigatório.'),
  email:           z.string().email('Email inválido.'),
  phone:           z.string().refine(
    v => v.replace(/\D/g, '').length >= 9,
    'Número de telemóvel inválido — mínimo 9 dígitos.'
  ),
  university:      z.enum(UNIVERSITIES, { error: 'Seleciona uma universidade válida.' }),
  course:          z.enum(COURSES, { error: 'Seleciona um curso válido.' }),
  academic_year:   z.string().min(1, 'Seleciona o ano curricular.'),
  has_event_xp:    z.boolean({ message: 'Seleciona Sim ou Não.' }),
  event_xp_desc:   z.string().optional(),
  availability:    z.string().min(1, 'Seleciona a disponibilidade.'),
  can_travel:      z.string().min(1, 'Seleciona uma opção.'),
  sector_prefs:    z.array(z.string()).min(1, 'Seleciona pelo menos um setor.'),
  motivation:      z.string().min(1, 'Escreve a tua motivação.'),
  differentiation: z.string().min(1, 'Escreve a tua resposta.'),
  how_found_out:   z.string().min(1, 'Seleciona como tomaste conhecimento.'),
  sector_answers:  z.record(z.string(), answerBlock),
}).superRefine((data, ctx) => {
  if (data.has_event_xp && (!data.event_xp_desc || data.event_xp_desc.trim().length < 1)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Descreve brevemente o teu papel (mínimo 10 caracteres).',
      path: ['event_xp_desc'],
    })
  }
  for (const sector of data.sector_prefs) {
    const slug = SECTOR_SLUGS[sector as Sector]
    if (!slug) continue
    const ans = data.sector_answers[slug]
    if (!ans || !ans.q1.trim() || !ans.q2.trim() || !ans.q3.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Responde às 3 perguntas do setor "${sector}".`,
        path: ['sector_answers', slug],
      })
    }
  }
})

export type ApplicationInput = z.infer<typeof applicationSchema>
