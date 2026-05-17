export const SECTORS = [
  'Relações Institucionais & Empresariais',
  'Científico & Pedagógico',
  'Comunicação & Marketing',
  'Logística',
  'Cultural',
  'Financeiro',
] as const

export type Sector = typeof SECTORS[number]

export const SECTOR_SLUGS: Record<Sector, string> = {
  'Relações Institucionais & Empresariais': 'relacoes',
  'Científico & Pedagógico':               'cientifico',
  'Comunicação & Marketing':               'comunicacao',
  'Logística':                             'logistica',
  'Cultural':                              'cultural',
  'Financeiro':                            'financeiro',
}

export const SECTOR_SHORT: Record<Sector, string> = {
  'Relações Institucionais & Empresariais': 'Parcerias com empresas, câmaras e ordens profissionais.',
  'Científico & Pedagógico':               'Palestras, workshops e conteúdo técnico.',
  'Comunicação & Marketing':               'Identidade visual, redes sociais e imprensa.',
  'Logística':                             'Coordenação operacional e apoio no terreno.',
  'Cultural':                              'Entretenimento, convívio e atividades sociais.',
  'Financeiro':                            'Orçamento, patrocínios e gestão de recursos.',
}

// Icon names — import the actual components in client files
export const SECTOR_ICON_NAME: Record<Sector, string> = {
  'Relações Institucionais & Empresariais': 'Handshake',
  'Científico & Pedagógico':               'Microscope',
  'Comunicação & Marketing':               'Megaphone',
  'Logística':                             'Package',
  'Cultural':                              'Palette',
  'Financeiro':                            'TrendingUp',
}

export const SECTOR_QUESTIONS: Record<Sector, [string, string, string]> = {
  'Relações Institucionais & Empresariais': [
    'Já tiveste alguma experiência de contacto formal com empresas ou instituições — seja em nome de uma associação, núcleo ou projeto académico? Descreve brevemente.',
    'Que tipo de parceiros imaginas ser mais relevante para o ENEEC 2027 e porquê? (empresas de engenharia, câmaras municipais, ordens profissionais, etc.)',
    'Tens facilidade em comunicar em inglês por escrito e oralmente? (Sim / Razoavelmente / Não) — e existe alguma outra língua relevante que domines?',
  ],
  'Científico & Pedagógico': [
    'Qual é a tua experiência com investigação académica, publicação de artigos ou participação em conferências científicas?',
    'Que tipo de conteúdo científico ou pedagógico achas que deve ter mais destaque num ENEEC — palestras, workshops, visitas técnicas, papers? Justifica.',
    'Já participaste na organização ou avaliação de submissões científicas (abstracts, artigos, comunicações)? Se sim, descreve o contexto.',
  ],
  'Comunicação & Marketing': [
    'Que ferramentas de design ou edição de conteúdo dominas? (Canva, Adobe Suite, CapCut, Figma, outras — sê específico/a)',
    'Tens algum trabalho anterior que possas partilhar — redes sociais, identidade visual, vídeos, campanhas?',
    'Na tua opinião, qual é o maior desafio de comunicação de um evento como o ENEEC e como o abordarias?',
  ],
  'Logística': [
    'Já participaste na organização operacional de um evento — seja académico, desportivo ou outro? Qual foi o teu papel concreto?',
    'Como geres situações de pressão quando várias tarefas urgentes surgem ao mesmo tempo? Dá um exemplo real ou hipotético.',
    'Tens carta de condução? (Sim / Não) — e disponibilidade para apoio logístico presencial nos dias do evento em Aveiro?',
  ],
  'Cultural': [
    'Que tipo de atividades culturais ou de entretenimento imaginas para o ENEEC 2027? Apresenta pelo menos uma ideia concreta.',
    'Já organizaste ou participaste ativamente na organização de eventos culturais, festas académicas ou atividades de convívio? Descreve.',
    'Como garantirias que as atividades culturais são inclusivas e apelativas para participantes de diferentes universidades e perfis?',
  ],
  'Financeiro': [
    'Tens alguma experiência em gestão de orçamentos, controlo de despesas ou contabilidade — seja em contexto académico, associativo ou profissional? Descreve brevemente.',
    'Já trabalhaste com ferramentas de gestão financeira ou folhas de cálculo para acompanhamento de custos? (Excel, Google Sheets, outras)',
    'Como abordarias a gestão de um orçamento limitado num evento com múltiplos departamentos com necessidades simultâneas?',
  ],
}
