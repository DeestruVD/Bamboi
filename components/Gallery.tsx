import { GALLERY_ITEMS } from '@/lib/constants'

export default function Gallery() {
  return (
    <section id="realisations" className="bg-cream px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-oak text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-4">
          Réalisations
        </p>
        <h2
          className="font-playfair text-charcoal font-normal leading-tight mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Quelques projets<br />signés de notre atelier
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div
                className={`${item.gradientClass} relative aspect-[4/5] rounded-sm overflow-hidden`}
              >
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                <span className="absolute top-4 left-4 bg-cream/90 text-charcoal text-[0.65rem] font-medium tracking-widest uppercase px-3 py-1 rounded-sm">
                  {item.subtitle}
                </span>
              </div>
              <h3 className="font-playfair text-lg font-normal mt-4 group-hover:text-oak transition-colors">
                {item.title}
              </h3>
              <p className="text-muted text-sm mt-1">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
