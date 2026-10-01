import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // A /descobre saiu de produção a 2026-10-01 (o código ficou em
  // app/[lang]/_descobre). Os links que já circulam vão para O Evento, que abre
  // com o teaser. Temporário (307), para a página poder voltar.
  async redirects() {
    return [
      { source: '/:lang(pt|en)/descobre', destination: '/:lang/evento', permanent: false },
    ];
  },
};

export default nextConfig;
