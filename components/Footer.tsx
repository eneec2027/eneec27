export default function Footer() {
  return (
    <footer className="border-t border-gold-subtle bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="mono text-gold font-bold text-sm tracking-widest uppercase mb-3">
            ENEEC'27
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Encontro Nacional de Estudantes<br />de Engenharia Civil.<br />
            Aveiro, março de 2027.
          </p>
          <p className="mt-4 text-xs text-muted-foreground mono">
            Construção em Movimento.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="section-label mb-4">Navegação</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {['O Evento', 'Programa', 'Oradores & Workshops', 'Localização', 'Feira de Empresas', 'Patrocinadores', 'Inscrições'].map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/[^a-z]/g, '').slice(0,10)}`}
                  className="hover:text-foreground transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="section-label mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:geral@eneec27.pt" className="hover:text-gold transition-colors">
                geral@eneec27.pt
              </a>
            </li>
            <li>
              <a href="https://instagram.com/eneec27" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                @eneec27
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/eneec27" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
          <div className="mt-6 pt-6 border-t border-gold-subtle">
            <p className="text-xs text-muted-foreground">
              Organizado pelo{' '}
              <a
                href="https://nebec.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                NEBEC
              </a>
              {' '}— Núcleo de Estudantes<br />de Engenharia Civil da UA.
            </p>
          </div>
        </div>
      </div>

      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-muted-foreground mono">
        <span>© 2027 NEBEC / ENEEC'27</span>
        <span>UA — Universidade de Aveiro</span>
      </div>
    </footer>
  )
}
