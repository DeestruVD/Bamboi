export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-white/10 px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-playfair text-xl text-white tracking-tight">
          L&apos;atelier <span className="text-oak italic">Bomboi</span>
        </div>
        <p className="text-white/40 text-xs text-center">
          © {year} L&apos;Atelier Bomboi — Menuiserie sur mesure à Charleroi. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
