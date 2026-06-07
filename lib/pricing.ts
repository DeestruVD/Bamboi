import type { DressingConfig, PriceBreakdown } from '@/types'
import { MATERIALS } from './constants'

export function calcPrix(config: DressingConfig): PriceBreakdown {
  const surface = (config.largeur * config.hauteur) / 10000
  const vol = surface * (config.profondeur / 100)
  const base = surface * 180 + vol * 120 + config.colonnes * 45

  const matMult = MATERIALS[config.materiau].mult
  const pStructure = Math.round(base * 0.6)
  const pMateriau = Math.round(base * 0.4 * matMult)

  let pOptions = 0
  if (config.optPortes)  pOptions += 380
  if (config.optMiroir)  pOptions += 220
  if (config.optLumiere) pOptions += 150
  if (config.optTiroirs) pOptions += 280

  return { pStructure, pMateriau, pOptions, total: pStructure + pMateriau + pOptions }
}

export function formatPrice(value: number): string {
  return value.toLocaleString('fr-BE') + ' €'
}
