'use client'

import { CONTACT_DETAILS } from '@/lib/constants'

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Texte */}
        <div>
          <p className="text-oak text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-4">
            Contact
          </p>
          <h2
            className="font-playfair text-white font-normal leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Parlons de<br />votre projet
          </h2>
          <p className="text-white/55 text-base font-light leading-relaxed max-w-md">
            Une idée, un espace à aménager&nbsp;? Contactez-nous pour une visite technique
            gratuite et un devis personnalisé sans engagement.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <span className="text-2xl leading-none">{detail.icon}</span>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest">
                    {detail.label}
                  </div>
                  <div className="text-white/85 text-sm mt-0.5">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <form
          className="bg-white/5 border border-white/10 rounded-sm p-8 flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-white/60 text-xs uppercase tracking-widest">
              Nom
              <input
                type="text"
                className="bg-transparent border-b border-white/20 py-2 text-white text-sm font-sans focus:border-oak outline-none transition-colors"
              />
            </label>
            <label className="flex flex-col gap-2 text-white/60 text-xs uppercase tracking-widest">
              Téléphone
              <input
                type="tel"
                className="bg-transparent border-b border-white/20 py-2 text-white text-sm font-sans focus:border-oak outline-none transition-colors"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-white/60 text-xs uppercase tracking-widest">
            Email
            <input
              type="email"
              className="bg-transparent border-b border-white/20 py-2 text-white text-sm font-sans focus:border-oak outline-none transition-colors"
            />
          </label>
          <label className="flex flex-col gap-2 text-white/60 text-xs uppercase tracking-widest">
            Votre projet
            <textarea
              rows={4}
              className="bg-transparent border-b border-white/20 py-2 text-white text-sm font-sans focus:border-oak outline-none transition-colors resize-none"
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-oak text-white text-sm font-medium px-8 py-3.5 rounded-sm hover:bg-oak-dark transition-colors"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  )
}
