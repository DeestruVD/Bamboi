const CARDS = [
  {
    title: 'Dressings & Placards',
    desc: 'Optimisez chaque centimètre de votre espace de rangement avec élégance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-oak mb-5">
        <rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/><rect x="14" y="17" width="7" height="4" rx="1"/>
      </svg>
    ),
  },
  {
    title: 'Cuisines & Salles de bain',
    desc: 'Des intérieurs fonctionnels et raffinés, pensés pour votre quotidien.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-oak mb-5">
        <rect x="2" y="7" width="20" height="13" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v3"/>
      </svg>
    ),
  },
  {
    title: 'Bibliothèques & Bureaux',
    desc: 'Des espaces de travail et de lecture qui allient esthétique et praticité.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-oak mb-5">
        <path d="M4 19V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13"/><path d="M2 19h20"/><rect x="9" y="10" width="6" height="9"/>
      </svg>
    ),
  },
  {
    title: 'Agencements sur mesure',
    desc: 'Escaliers, habillages muraux, menuiseries intérieures — chaque détail compte.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-oak mb-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

const STATS = [
  { value: '35+', label: "Années d'expérience" },
  { value: '1 200+', label: 'Projets réalisés' },
  { value: '100%', label: 'Sur mesure' },
]

export default function Expertise() {
  return (
    <section id="savoir-faire" className="bg-white grid grid-cols-1 md:grid-cols-2">
      {/* Texte gauche */}
      <div className="px-6 md:px-16 py-20 md:py-28">
        <p className="text-oak text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-4">
          Notre expertise
        </p>
        <h2 className="font-playfair text-charcoal font-normal leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Menuiserie d&apos;exception,<br />artisanat authentique
        </h2>
        <p className="text-muted text-base font-light leading-relaxed max-w-sm mt-4">
          Chaque réalisation est le fruit d&apos;un savoir-faire transmis de génération en génération,
          alliant techniques traditionnelles et outils contemporains.
        </p>

        <div className="flex gap-8 mt-10 flex-wrap">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-playfair text-oak text-4xl font-normal">{s.value}</div>
              <div className="text-muted text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grille de cartes droite */}
      <div className="grid grid-cols-2 border-t md:border-t-0 md:border-l border-oak/20">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`p-8 md:p-10 hover:bg-cream transition-colors
              ${i % 2 === 0 ? 'border-r border-oak/20' : ''}
              ${i < 2 ? 'border-b border-oak/20' : ''}
            `}
          >
            {card.icon}
            <h3 className="font-playfair text-lg font-normal mb-2">{card.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
