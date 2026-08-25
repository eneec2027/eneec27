import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // O painel é privado e o formulário não ganha nada em ser indexado.
      disallow: ['/admin'],
    },
    sitemap: 'https://eneec.pt/sitemap.xml',
  }
}
