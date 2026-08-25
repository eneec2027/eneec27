// Português e inglês do site.
//
// O português é o original: a copy entre aspas vem do briefing da NEBEC e não
// se toca sem passar pela organização. O inglês é **tradução de trabalho**,
// feita aqui e ainda não revista pela NEBEC — ver o vault, briefing-conteudos.
//
// O ENEEC é um encontro nacional e decorre em português; o inglês serve quem
// vem de fora, parceiros e imprensa, não substitui o original.

export const LANGS = ['pt', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const DEFAULT_LANG: Lang = 'pt'

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v)
}

/** Texto que existe nas duas línguas. */
export interface Localized {
  pt: string
  en: string
}

export const t = (v: Localized, lang: Lang) => v[lang]

export const LANG_LABEL: Record<Lang, string> = { pt: 'PT', en: 'EN' }
export const LANG_NAME: Record<Lang, string> = { pt: 'Português', en: 'English' }
/** Para o atributo lang do <html>. */
export const HTML_LANG: Record<Lang, string> = { pt: 'pt', en: 'en' }

// O tipo Dict sai daqui: o português é a referência e o inglês tem de o cobrir
// por inteiro — falta uma chave, o tsc falha.
const pt = {
  event: {
    edition: '15.ª Edição',
    dates: '7 a 10 de abril',
    datesLong: '7 a 10 de abril de 2027',
    month: 'Abril 2027',
    venue: 'Universidade de Aveiro',
    department: 'Departamento de Engenharia Civil',
    fullName: 'Encontro Nacional de Estudantes de Engenharia Civil',
  },

  nav: {
    inicio: 'Início',
    evento: 'O Evento',
    programa: 'Programa',
    equipa: 'Equipa & Embaixadores',
    equipaShort: 'Equipa',
    parceiros: 'Parceiros',
    contactos: 'Contactos',
    menu: 'Menu',
    theme: 'Alternar tema',
    language: 'Mudar de língua',
  },

  cta: {
    discover: 'Descobre o ENEEC27',
    // Versão curta para a barra entre 1024 e 1280px, onde a longa não cabe.
    discoverShort: 'Descobre',
    ticket: 'Garantir Bilhete',
    ticketShort: 'Bilhete',
    event: 'O Evento',
    scroll: 'scroll',
  },

  countdown: { days: 'dias', hours: 'horas', minutes: 'min', seconds: 'seg' },

  home: {
    // As três opções do briefing. HERO_HEADLINE_INDEX em lib/content.ts escolhe.
    heroHeadlines: [
      'De norte a sul, todos os caminhos vão dar a Aveiro.',
      'Vem construir ligações que ficam muito para além destes quatro dias.',
      'Quatro dias. Uma cidade. A próxima geração da Engenharia Civil reunida em Aveiro.',
    ],
    whatIsLabel: "O que é o ENEEC'27?",
    whatIs:
      'Oito anos depois, o ENEEC regressa a Aveiro!! Durante quatro dias, estudantes ' +
      'de Engenharia Civil de todo o país juntam-se para partilhar conhecimento, criar ' +
      'ligações e viver uma experiência que vai muito além da sala de aula.',
    historyLink: 'A história do ENEEC e a visão de Aveiro →',
    reasonsLabel: 'Razões para vir',
    highlights: {
      estudantes: 'Estudantes esperados',
      dias: 'Dias de evento',
      workshops: 'Workshops',
      visitas: 'Visitas Técnicas',
      festas: 'Festas & Convívios',
    },
    partnersLabel: 'Apoios Institucionais',
    partnersTitle: 'Quem caminha connosco',
    sponsorsLabel: 'Patrocinadores',
    allPartners: 'Ver todos os parceiros →',
    supportUs: 'Apoiar o ENEEC27',
  },

  evento: {
    label: 'O Evento',
    title: 'O ENEEC regressa a Aveiro.',
    intro: (edition: string, org: string) =>
      `${edition} do Encontro Nacional de Estudantes de Engenharia Civil, organizada pelo ${org}.`,
    historyLabel: 'A história do ENEEC',
    history:
      'O ENEEC é um encontro nacional que reúne estudantes de Engenharia Civil de ' +
      'diferentes instituições, promovendo a partilha de conhecimento, a aproximação ' +
      'à profissão e a criação de ligações dentro da comunidade académica. Ao longo ' +
      'das suas edições, o encontro passou por várias cidades portuguesas. Aveiro ' +
      'recebeu a 10.ª edição em 2014, organizada pelo NEBEC-AAUAv, e em 2027 ' +
      'prepara-se para voltar a acolher o evento, na sua 15.ª edição, retomando uma ' +
      'tradição nacional e abrindo um novo capítulo do ENEEC.',
    aveiroLabel: 'A visão de Aveiro',
    aveiro:
      'Aveiro é a cidade dos canais, dos moliceiros e de uma universidade que respira ' +
      'engenharia. É aqui, junto à Ria, que o ENEEC27 vai acontecer, entre o ' +
      'Departamento de Engenharia Civil, o campus e o coração da cidade. Uma edição ' +
      'pensada para quem vem de fora conhecer não só a engenharia civil portuguesa, ' +
      'mas também esta cidade.',
    pillarsLabel: 'Os 3 Pilares',
    pillars: [
      {
        title: 'Conhecimento Técnico',
        description:
          'Conferências, workshops e visitas técnicas que aprofundam a formação académica e expõem os estudantes ao estado da arte da engenharia civil.',
      },
      {
        title: 'Networking Profissional',
        description:
          'Contacto direto com empresas, engenheiros seniores e instituições, criando pontes entre a academia e o mercado de trabalho.',
      },
      {
        title: 'Cultura de Engenharia',
        description:
          'Debate de ideias, troca de experiências entre estudantes de todo o país e celebração da identidade coletiva da engenharia civil portuguesa.',
      },
    ],
    welcomeLabel: 'Mensagem de boas-vindas',
    welcome:
      'É com enorme entusiasmo que vos recebemos em Aveiro para o ENEEC27. Queremos ' +
      'que estes quatro dias sejam feitos de novas ideias, novas pessoas e ' +
      'experiências que ficam para além do evento, da engenharia às visitas, do campus ' +
      'à cidade, das conversas aos momentos de convívio. Façam desta edição também ' +
      'vossa. Sejam muito bem-vindos ao ENEEC27.',
    welcomeSignature: 'Comissão Organizadora do ENEEC’27',
  },

  programa: {
    label: 'Programa',
    title: 'Quatro dias de engenharia.',
    titleSoon: 'Brevemente.',
    intro:
      'Palestras, feira de empresas, visitas técnicas e convívio, de quarta a sábado. ' +
      'Os temas e oradores por fechar são anunciados à medida que forem confirmados.',
    introSoon:
      'O programa dos quatro dias — conferências, workshops, visitas técnicas e ' +
      'momentos de convívio — está a ser fechado. Anunciamos cada peça assim que ' +
      'estiver confirmada.',
    followAnnouncements: (handle: string) => `Acompanhar os anúncios em ${handle} →`,
    soonCard: 'A anunciar',
    soonNote: 'Programa a confirmar. Acompanhe as nossas redes sociais para anúncios.',
    parallel: 'em paralelo',
    parallelShort: 'paralelo',
    moments: (n: number) => `${n} momentos`,
    speakerSoon: 'Orador a anunciar',
    endSoon: ' — fim a anunciar',
    disclaimer:
      'Programa sujeito a ajustes. Os temas e oradores marcados como “a anunciar” são divulgados assim que estiverem confirmados.',
    speakersLabel: 'Oradores',
    speakersTitle: 'Vozes da engenharia',
    speakersSoon: (handle: string) => `Oradores a confirmar. Acompanhe ${handle} para os anúncios.`,
    typeLabels: {
      sessao: 'Sessão',
      palestra: 'Palestra',
      feira: 'Feira de Empresas',
      visita: 'Visita',
      social: 'Convívio',
      logistica: 'Logística',
    },
  },

  equipa: {
    label: 'Equipa & Embaixadores',
    title: 'Quem está a construir o ENEEC27.',
    intro: (org: string) =>
      `A Comissão Organizadora do ${org} e os embaixadores que representam o encontro em cada universidade do país.`,
    teamLabel: 'Comissão Organizadora',
    teamTitle: 'A casa',
    teamSoon: 'Fotografias e funções a publicar.',
    ambassadorsLabel: 'Embaixadores',
    ambassadorsTitle: 'O país todo',
    ambassadorsSoon: 'Embaixadores por universidade a anunciar.',
    soon: 'A anunciar',
    joinTitle: 'Queres fazer parte da equipa?',
    joinText: 'As candidaturas à Comissão Organizadora fazem-se num formulário curto.',
    joinCta: 'Candidatar-me →',
    ambassadorTitle: 'Queres representar a tua universidade?',
    ambassadorText: 'Fala connosco — há lugar para embaixadores em todo o país.',
  },

  parceiros: {
    label: 'Parceiros',
    title: 'Quem torna isto possível.',
    intro:
      'O ENEEC27 acontece com o apoio de instituições e empresas que acreditam na formação dos futuros engenheiros civis portugueses.',
    institutional: 'Apoios Institucionais',
    organization: 'Organização',
    sponsors: 'Patrocinadores',
    companiesLabel: 'Empresas',
    companiesTitle: 'Associe a sua marca ao futuro da engenharia civil.',
    companiesText: (venue: string) =>
      `Quatro dias, ${venue}, centenas de estudantes de Engenharia Civil de todo o país. Se quiser apoiar o ENEEC'27, falamos das formas de colaboração possíveis — apresentamos o que faz sentido para cada empresa.`,
  },

  contactos: {
    label: 'Contactos',
    title: 'Falar connosco.',
    intro: 'Para dúvidas, propostas de parceria ou imprensa — respondemos a todos.',
    teamLabel: 'Equipa organizadora',
    teamTitle: 'Queres fazer parte da equipa?',
    teamText:
      "A Comissão Organizadora do ENEEC'27 está a crescer. A candidatura é um formulário curto — conta-nos quem és e onde queres ajudar.",
    teamCta: 'Candidatar-me →',
    teamDoubts: 'Dúvidas sobre a candidatura:',
    sponsorLabel: 'Empresas',
    sponsorTitle: 'Patrocínios e parcerias',
    sponsorText: (venue: string) =>
      `Quatro dias, ${venue}, centenas de estudantes de Engenharia Civil de todo o país. Falamos das formas de colaboração que fazem sentido para cada empresa.`,
    sponsorCta: 'Fala connosco →',
    emailsLabel: 'E-mails oficiais',
    emailGeneral: 'E-mail geral',
    emailSponsors: 'Patrocínios / parcerias',
    emailApplications: 'Candidaturas à equipa',
    socialLabel: 'Redes sociais',
    linkedinText: 'Evento oficial do ENEEC27',
    soon: 'a publicar',
    soonTikTok: 'brevemente',
    whereLabel: 'Onde acontece',
    maps: 'Abrir no Google Maps →',
    howLabel: 'Como chegar',
    transport: [
      {
        title: 'Comboio',
        text: 'Estação de Aveiro, na linha do Norte, com ligações a Lisboa, Porto e Coimbra. Do centro ao Campus de Santiago há autocarro urbano.',
      },
      {
        title: 'Automóvel',
        text: 'A1 e A25 servem Aveiro. O campus tem estacionamento à superfície.',
      },
      {
        title: 'Avião',
        text: 'Aeroporto Francisco Sá Carneiro (Porto), a cerca de 70 km, com ligação de metro e comboio até Aveiro.',
      },
    ],
    lodgingNote:
      'Alojamento e transportes do evento: informação a anunciar com a abertura das inscrições.',
  },

  descobre: {
    title: 'O teaser está quase pronto.',
    comingSoon: 'Coming Soon',
    intro:
      'O ENEEC27 junta durante quatro dias estudantes de Engenharia Civil de todo o ' +
      'país em Aveiro. O teaser está em fase final de produção — entretanto, deixa o ' +
      'teu email e sabes em primeira mão quando abrirem os Early Birds.',
    videoSoon: 'Teaser em fase final de produção',
    videoSoonSub: 'a publicar em breve',
    formLabel: 'Avisa-me quando abrirem os Early Birds',
    formLabelOpen: 'Inscrições',
  },

  privacidade: {
    label: 'Privacidade',
    title: 'Política de Privacidade.',
    intro: 'O que recolhemos, porquê, e como pedires que apaguemos.',
    updated: 'Última atualização: agosto de 2026.',
    sections: [
      {
        title: 'Que dados recolhemos',
        body: [
          'Endereço de e-mail, quando o submetes num dos formulários deste site: a subscrição de novidades e o aviso de abertura dos Early Birds.',
          'Nos formulários de candidatura à equipa organizadora, os dados que preenches no próprio formulário (nome, contacto, curso e a informação que escreveres nos campos livres).',
          'Não usamos cookies de publicidade nem partilhamos dados com terceiros para fins de marketing.',
        ],
      },
      {
        title: 'Para que servem',
        body: [
          'O e-mail é usado exclusivamente para te enviar novidades do ENEEC27 e para te avisar quando abrirem as inscrições.',
          'Os dados de candidatura são usados apenas para avaliar a candidatura à Comissão Organizadora.',
        ],
      },
      {
        title: 'Onde ficam guardados',
        body: ['Numa base de dados alojada no Supabase, acessível apenas à organização do ENEEC27.'],
      },
      {
        title: 'Durante quanto tempo',
        body: ['Até ao fim do ENEEC27 ou até pedires a remoção, o que acontecer primeiro.'],
      },
      {
        title: 'Os teus direitos',
        body: [
          'Podes pedir a qualquer momento acesso, correção ou eliminação dos teus dados, escrevendo para {email}. Respondemos e eliminamos sem necessidade de justificação.',
        ],
      },
      {
        title: 'Responsável pelo tratamento',
        body: ['{org} — {department}, {venue}. {address}.'],
      },
    ],
  },

  footer: {
    navLabel: 'Navegação',
    contactsLabel: 'Contactos',
    newsletterLabel: 'Novidades',
    newsletterCta: 'Quero receber',
    newsletterHint: 'Só novidades do ENEEC27. Ao subscrever aceitas a nossa',
    earlyLabel: 'Early Birds',
    earlyCta: 'Avisa-me',
    joinTeam: 'Junta-te à equipa',
    support: 'Apoiar o ENEEC’27',
    privacy: 'Política de Privacidade',
    rights: '© 2027 ENEEC27 / NEBEC-AAUAv. Todos os direitos reservados.',
    organizedBy: 'Organizado pelo',
  },

  form: {
    placeholder: 'o.teu@email.pt',
    sending: '…',
    done: 'Ótimo! Vais ser dos primeiros a saber.',
    invalid: 'Email inválido.',
    error: 'Erro ao guardar. Tenta novamente.',
    privacyLink: 'Política de Privacidade',
    hintEarly: 'Guardamos só o teu email, para te avisar. Ver a',
  },
}

export type Dict = typeof pt

const en: Dict = {
  event: {
    edition: '15th Edition',
    dates: '7—10 April',
    datesLong: '7—10 April 2027',
    month: 'April 2027',
    venue: 'University of Aveiro',
    department: 'Department of Civil Engineering',
    fullName: 'National Meeting of Civil Engineering Students',
  },

  nav: {
    inicio: 'Home',
    evento: 'The Event',
    programa: 'Programme',
    equipa: 'Team & Ambassadors',
    equipaShort: 'Team',
    parceiros: 'Partners',
    contactos: 'Contact',
    menu: 'Menu',
    theme: 'Toggle theme',
    language: 'Change language',
  },

  cta: {
    discover: 'Discover ENEEC27',
    discoverShort: 'Discover',
    ticket: 'Get your ticket',
    ticketShort: 'Ticket',
    event: 'The Event',
    scroll: 'scroll',
  },

  countdown: { days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec' },

  home: {
    heroHeadlines: [
      'From north to south, every road leads to Aveiro.',
      'Come and build connections that last far beyond these four days.',
      'Four days. One city. The next generation of Civil Engineering, together in Aveiro.',
    ],
    whatIsLabel: 'What is ENEEC’27?',
    whatIs:
      'Eight years on, ENEEC returns to Aveiro!! For four days, Civil Engineering ' +
      'students from across the country come together to share knowledge, build ' +
      'connections and live an experience that goes well beyond the classroom.',
    historyLink: 'The history of ENEEC and the Aveiro vision →',
    reasonsLabel: 'Why come',
    highlights: {
      estudantes: 'Students expected',
      dias: 'Days of event',
      workshops: 'Workshops',
      visitas: 'Site visits',
      festas: 'Parties & socials',
    },
    partnersLabel: 'Institutional support',
    partnersTitle: 'Who walks with us',
    sponsorsLabel: 'Sponsors',
    allPartners: 'See all partners →',
    supportUs: 'Support ENEEC27',
  },

  evento: {
    label: 'The Event',
    title: 'ENEEC returns to Aveiro.',
    intro: (edition: string, org: string) =>
      `The ${edition} of the National Meeting of Civil Engineering Students, organised by ${org}.`,
    historyLabel: 'The history of ENEEC',
    history:
      'ENEEC is a national meeting that brings together Civil Engineering students ' +
      'from different institutions, promoting the sharing of knowledge, closer contact ' +
      'with the profession and the building of connections within the academic ' +
      'community. Over its editions, the meeting has travelled through several ' +
      'Portuguese cities. Aveiro hosted the 10th edition in 2014, organised by ' +
      'NEBEC-AAUAv, and in 2027 prepares to host it again, in its 15th edition, ' +
      'picking up a national tradition and opening a new chapter of ENEEC.',
    aveiroLabel: 'The Aveiro vision',
    aveiro:
      'Aveiro is the city of canals, of moliceiro boats and of a university that ' +
      'breathes engineering. It is here, beside the Ria, that ENEEC27 will take place — ' +
      'between the Department of Civil Engineering, the campus and the heart of the ' +
      'city. An edition designed for those coming from elsewhere to discover not only ' +
      'Portuguese civil engineering, but this city too.',
    pillarsLabel: 'The 3 Pillars',
    pillars: [
      {
        title: 'Technical knowledge',
        description:
          'Conferences, workshops and site visits that deepen academic training and expose students to the state of the art in civil engineering.',
      },
      {
        title: 'Professional networking',
        description:
          'Direct contact with companies, senior engineers and institutions, building bridges between academia and the job market.',
      },
      {
        title: 'Engineering culture',
        description:
          'Debating ideas, exchanging experiences between students from across the country, and celebrating the collective identity of Portuguese civil engineering.',
      },
    ],
    welcomeLabel: 'Welcome message',
    welcome:
      'It is with enormous enthusiasm that we welcome you to Aveiro for ENEEC27. We ' +
      'want these four days to be made of new ideas, new people and experiences that ' +
      'last beyond the event — from the engineering to the visits, from the campus to ' +
      'the city, from the conversations to the moments together. Make this edition ' +
      'yours too. A very warm welcome to ENEEC27.',
    welcomeSignature: 'The ENEEC’27 Organising Committee',
  },

  programa: {
    label: 'Programme',
    title: 'Four days of engineering.',
    titleSoon: 'Coming soon.',
    intro:
      'Talks, a company fair, site visits and social moments, from Wednesday to ' +
      'Saturday. Topics and speakers still being closed are announced as they are confirmed.',
    introSoon:
      'The four-day programme — conferences, workshops, site visits and social ' +
      'moments — is being finalised. We announce each piece as soon as it is confirmed.',
    followAnnouncements: (handle: string) => `Follow the announcements on ${handle} →`,
    soonCard: 'To be announced',
    soonNote: 'Programme to be confirmed. Follow our social media for announcements.',
    parallel: 'in parallel',
    parallelShort: 'parallel',
    moments: (n: number) => `${n} moments`,
    speakerSoon: 'Speaker to be announced',
    endSoon: ' — end time to be announced',
    disclaimer:
      'The programme is subject to adjustments. Topics and speakers marked “to be announced” are published as soon as they are confirmed.',
    speakersLabel: 'Speakers',
    speakersTitle: 'Voices of engineering',
    speakersSoon: (handle: string) => `Speakers to be confirmed. Follow ${handle} for announcements.`,
    typeLabels: {
      sessao: 'Session',
      palestra: 'Talk',
      feira: 'Company Fair',
      visita: 'Site visit',
      social: 'Social',
      logistica: 'Logistics',
    },
  },

  equipa: {
    label: 'Team & Ambassadors',
    title: 'Who is building ENEEC27.',
    intro: (org: string) =>
      `The ${org} Organising Committee and the ambassadors representing the meeting at each university in the country.`,
    teamLabel: 'Organising Committee',
    teamTitle: 'The home team',
    teamSoon: 'Photographs and roles to be published.',
    ambassadorsLabel: 'Ambassadors',
    ambassadorsTitle: 'The whole country',
    ambassadorsSoon: 'Ambassadors by university to be announced.',
    soon: 'To be announced',
    joinTitle: 'Want to join the team?',
    joinText: 'Applications to the Organising Committee are made through a short form.',
    joinCta: 'Apply →',
    ambassadorTitle: 'Want to represent your university?',
    ambassadorText: 'Talk to us — there is room for ambassadors across the country.',
  },

  parceiros: {
    label: 'Partners',
    title: 'Who makes this possible.',
    intro:
      'ENEEC27 happens with the support of institutions and companies that believe in the training of Portugal’s future civil engineers.',
    institutional: 'Institutional support',
    organization: 'Organisation',
    sponsors: 'Sponsors',
    companiesLabel: 'Companies',
    companiesTitle: 'Put your brand alongside the future of civil engineering.',
    companiesText: (venue: string) =>
      `Four days, ${venue}, hundreds of Civil Engineering students from across the country. If you would like to support ENEEC’27, we will talk through the possible forms of collaboration — and propose what makes sense for your company.`,
  },

  contactos: {
    label: 'Contact',
    title: 'Talk to us.',
    intro: 'For questions, partnership proposals or press — we answer everyone.',
    teamLabel: 'Organising committee',
    teamTitle: 'Want to join the team?',
    teamText:
      'The ENEEC’27 Organising Committee is growing. The application is a short form — tell us who you are and where you would like to help.',
    teamCta: 'Apply →',
    teamDoubts: 'Questions about the application:',
    sponsorLabel: 'Companies',
    sponsorTitle: 'Sponsorship and partnerships',
    sponsorText: (venue: string) =>
      `Four days, ${venue}, hundreds of Civil Engineering students from across the country. We will talk through the forms of collaboration that make sense for your company.`,
    sponsorCta: 'Talk to us →',
    emailsLabel: 'Official e-mails',
    emailGeneral: 'General e-mail',
    emailSponsors: 'Sponsorship / partnerships',
    emailApplications: 'Team applications',
    socialLabel: 'Social media',
    linkedinText: 'Official ENEEC27 event',
    soon: 'to be published',
    soonTikTok: 'coming soon',
    whereLabel: 'Where it happens',
    maps: 'Open in Google Maps →',
    howLabel: 'Getting there',
    transport: [
      {
        title: 'Train',
        text: 'Aveiro station, on the Linha do Norte, with direct services from Lisbon, Porto and Coimbra. City buses run from the centre to the Santiago Campus.',
      },
      {
        title: 'Car',
        text: 'The A1 and A25 motorways serve Aveiro. The campus has surface parking.',
      },
      {
        title: 'Plane',
        text: 'Francisco Sá Carneiro Airport (Porto), around 70 km away, connected to Aveiro by metro and train.',
      },
    ],
    lodgingNote:
      'Event accommodation and transport: details to be announced when registration opens.',
  },

  descobre: {
    title: 'The teaser is almost ready.',
    comingSoon: 'Coming Soon',
    intro:
      'ENEEC27 brings together Civil Engineering students from across the country for ' +
      'four days in Aveiro. The teaser is in final production — in the meantime, leave ' +
      'your email and be the first to know when Early Birds open.',
    videoSoon: 'Teaser in final production',
    videoSoonSub: 'publishing soon',
    formLabel: 'Tell me when Early Birds open',
    formLabelOpen: 'Registration',
  },

  privacidade: {
    label: 'Privacy',
    title: 'Privacy Policy.',
    intro: 'What we collect, why, and how to ask us to delete it.',
    updated: 'Last updated: August 2026.',
    sections: [
      {
        title: 'What data we collect',
        body: [
          'Your e-mail address, when you submit it in one of this site’s forms: the news subscription and the Early Birds opening alert.',
          'In the organising team application form, the data you fill in yourself (name, contact, course and whatever you write in the free-text fields).',
          'We do not use advertising cookies and we do not share data with third parties for marketing purposes.',
        ],
      },
      {
        title: 'What it is used for',
        body: [
          'Your e-mail is used solely to send you ENEEC27 news and to tell you when registration opens.',
          'Application data is used only to assess the application to the Organising Committee.',
        ],
      },
      {
        title: 'Where it is stored',
        body: ['In a database hosted on Supabase, accessible only to the ENEEC27 organisation.'],
      },
      {
        title: 'For how long',
        body: ['Until the end of ENEEC27 or until you ask for removal, whichever comes first.'],
      },
      {
        title: 'Your rights',
        body: [
          'You may request access to, correction of or deletion of your data at any time by writing to {email}. We reply and delete without requiring a justification.',
        ],
      },
      {
        title: 'Data controller',
        body: ['{org} — {department}, {venue}. {address}.'],
      },
    ],
  },

  footer: {
    navLabel: 'Navigation',
    contactsLabel: 'Contact',
    newsletterLabel: 'News',
    newsletterCta: 'Sign me up',
    newsletterHint: 'ENEEC27 news only. By subscribing you accept our',
    earlyLabel: 'Early Birds',
    earlyCta: 'Notify me',
    joinTeam: 'Join the team',
    support: 'Support ENEEC’27',
    privacy: 'Privacy Policy',
    rights: '© 2027 ENEEC27 / NEBEC-AAUAv. All rights reserved.',
    organizedBy: 'Organised by',
  },

  form: {
    placeholder: 'your@email.com',
    sending: '…',
    done: 'Great! You will be among the first to know.',
    invalid: 'Invalid email.',
    error: 'Could not save. Please try again.',
    privacyLink: 'Privacy Policy',
    hintEarly: 'We only keep your email, to let you know. See the',
  },
}

export const DICT: Record<Lang, Dict> = { pt, en }

export const getDict = (lang: Lang): Dict => DICT[lang]
