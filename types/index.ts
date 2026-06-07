export type MaterialKey = 'chene' | 'noyer' | 'blanc' | 'anthracite'

export interface DressingConfig {
  largeur: number
  hauteur: number
  profondeur: number
  colonnes: number
  materiau: MaterialKey
  optPortes: boolean
  optMiroir: boolean
  optLumiere: boolean
  optTiroirs: boolean
}

export interface MaterialInfo {
  color: number
  name: string
  mult: number
  hex: string
}

export interface PriceBreakdown {
  pStructure: number
  pMateriau: number
  pOptions: number
  total: number
}

export interface GalleryItem {
  id: number
  title: string
  subtitle: string
  desc: string
  gradientClass: string
}
