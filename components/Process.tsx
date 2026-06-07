import { PROCESS_STEPS } from '@/lib/constants'

export default function Process() {
  return (
    <section id="process" className="bg-white px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-oak text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-4">
          Comment ça marche
        </p>
        <h2
          className="font-playfair text-charcoal font-normal leading-tight mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          De l&apos;idée à la pose,<br />un accompagnement complet
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="border-t border-oak/30 pt-6">
              <div className="font-playfair text-oak text-4xl font-normal mb-4">
                {step.num}
              </div>
              <h3 className="font-playfair text-lg font-normal mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
