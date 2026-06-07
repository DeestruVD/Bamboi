import type { MaterialInfo, GalleryItem, DressingConfig } from '@/types'

export const MATERIALS: Record<string, MaterialInfo> = {
  chene:      { color: 0xC4935A, hex: '#C4935A', name: 'Chêne naturel',  mult: 1.0 },
  noyer:      { color: 0x5C3D1E, hex: '#5C3D1E', name: 'Noyer massif',   mult: 1.4 },
  blanc:      { color: 0xF0EDE8, hex: '#F0EDE8', name: 'Blanc mat',      mult: 0.85 },
  anthracite: { color: 0x3A3835, hex: '#3A3835', name: 'Anthracite',     mult: 0.9 },
}

export const DEFAULT_CONFIG: DressingConfig = {
  largeur: 200,
  hauteur: 220,
  profondeur: 60,
  colonnes: 3,
  materiau: 'chene',
  optPortes: false,
  optMiroir: false,
  optLumiere: false,
  optTiroirs: false,
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'Dressing panoramique', subtitle: 'Noyer massif',   desc: 'Noyer massif, finition huile naturelle',         gradientClass: 'gallery-img-1' },
  { id: 2, title: 'Cuisine contemporaine', subtitle: 'Chêne blanchi', desc: 'Chêne blanchi, plan de travail marbre',           gradientClass: 'gallery-img-2' },
  { id: 3, title: 'Bibliothèque',          subtitle: 'Frêne laqué',   desc: 'Frêne, finition laque mate',                     gradientClass: 'gallery-img-3' },
  { id: 4, title: 'Salle de bain',         subtitle: 'Teck naturel',  desc: 'Teck, finition hydrofuge',                       gradientClass: 'gallery-img-4' },
  { id: 5, title: 'Meuble TV intégré',     subtitle: 'Chêne fumé',   desc: 'Chêne fumé, métal noir mat',                     gradientClass: 'gallery-img-5' },
  { id: 6, title: 'Bureau architecte',     subtitle: 'Noyer & cuir',  desc: 'Noyer, cuir naturel',                            gradientClass: 'gallery-img-6' },
]

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Configuration en ligne',
    desc: 'Entrez vos dimensions, choisissez vos matériaux et obtenez une estimation de prix instantanée.',
  },
  {
    num: '02',
    title: 'Visite technique gratuite',
    desc: 'Notre artisan se déplace chez vous pour valider les mesures et affiner le projet avec vous.',
  },
  {
    num: '03',
    title: 'Fabrication artisanale',
    desc: 'Votre meuble est fabriqué à la main dans notre atelier local, avec les matériaux que vous avez choisis.',
  },
  {
    num: '04',
    title: 'Pose & finitions',
    desc: 'Installation soignée par notre équipe, avec tous les réglages nécessaires pour un résultat parfait.',
  },
]

export const CONTACT_DETAILS = [
  { icon: '📍', label: 'Atelier',   value: 'Rue du test, 6000 Charleroi' },
  { icon: '📞', label: 'Téléphone', value: '+32 (0)12 34 56 78' },
  { icon: '✉',  label: 'Email',     value: 'contact@test.be' },
  { icon: '🕐', label: 'Horaires',  value: 'Lun–Ven 8h–18h · Sam 9h–13h' },
]
