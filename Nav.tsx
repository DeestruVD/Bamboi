'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#savoir-faire', label: 'Savoir-faire' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#configurateur', label: 'Configurateur' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-cream/90 backdrop-blur-md border-b border-oak/20 transition-all">
        <Link href="#" className="font-playfair text-2xl text-charcoal tracking-tight">
          L&apos;atelier <span className="text-oak italic">Bomboi</span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden md:flex gap-10 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted text-sm font-normal uppercase tracking-widest hover:text-oak transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#configurateur"
          className="hidden md:block bg-charcoal text-white text-sm font-medium px-6 py-2.5 rounded-sm hover:bg-oak transition-colors"
        >
          Obtenir un devis
        </a>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] p-1 z-[110] bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal rounded transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-charcoal rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-charcoal rounded transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="font-playfair text-4xl text-charcoal hover:text-oak transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#configurateur"
          onClick={closeMenu}
          className="mt-4 bg-charcoal text-white text-base font-medium px-10 py-3.5 rounded-sm hover:bg-oak transition-colors"
        >
          Obtenir un devis
        </a>
      </div>
    </>
  )
}
