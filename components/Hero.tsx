export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-end bg-charcoal overflow-hidden px-6 md:px-12 pb-16 md:pb-20 pt-20 md:pt-0"
    >
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#2E2A24] to-charcoal" />

      {/* Grille subtile */}
      <div className="absolute inset-0 hero-pattern opacity-100" />

      {/* Accent doré */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-oak/10 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-block bg-oak/15 border border-oak/30 text-oak text-xs font-medium tracking-[0.12em] uppercase px-4 py-1.5 rounded-sm mb-6">
          ✦ Artisan Menuisier — Depuis 2023
        </div>

        <h1 className="font-playfair text-white font-normal leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}>
          L&apos;art du bois,<br />
          <em className="text-oak not-italic italic">façonné pour vous</em>
        </h1>

        <p className="text-white/55 text-base font-light leading-relaxed max-w-md mb-10">
          Chaque pièce est unique. Nous créons des meubles sur mesure qui s&apos;adaptent
          parfaitement à votre espace et à votre style de vie.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#configurateur"
            className="bg-oak text-white text-sm font-medium px-8 py-3.5 rounded-sm hover:bg-oak-dark transition-colors text-center"
          >
            Configurer mon meuble
          </a>
          <a
            href="#realisations"
            className="border border-white/25 text-white/70 text-sm px-8 py-3.5 rounded-sm hover:border-oak hover:text-oak transition-colors text-center"
          >
            Voir les réalisations
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 right-12 flex-col items-center gap-2 text-white/30 text-[0.65rem] tracking-[0.12em] uppercase animate-bounce-slow">
        Défiler
        <span className="block w-px h-10 bg-gradient-to-b from-oak/50 to-transparent" />
      </div>
    </section>
  )
}
