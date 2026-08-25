// De onde veio um email recolhido. Vive fora de app/actions/signup.ts porque um
// ficheiro 'use server' só pode exportar funções assíncronas — exportar esta
// constante de lá partia o módulo inteiro em runtime, e com ele toda a recolha
// de emails. O build não apanha: só rebenta quando alguém submete.
//
// O briefing pede dois pontos de recolha — newsletter e aviso de Early Birds —
// a partilhar o mesmo sistema, "distinguindo apenas o interesse do utilizador".
// É a coluna `source` da tabela que faz essa distinção.
export const SIGNUP_SOURCES = ['v1_teaser', 'v2_newsletter', 'v2_early_birds'] as const

export type SignupSource = (typeof SIGNUP_SOURCES)[number]
