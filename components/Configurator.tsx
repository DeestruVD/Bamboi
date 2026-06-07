'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { DressingConfig, MaterialKey } from '@/types'
import { DEFAULT_CONFIG, MATERIALS } from '@/lib/constants'
import { calcPrix, formatPrice } from '@/lib/pricing'

const MATERIAL_KEYS = Object.keys(MATERIALS) as MaterialKey[]

const OPTIONS: { key: keyof DressingConfig; label: string; price: number }[] = [
  { key: 'optPortes', label: 'Portes coulissantes', price: 380 },
  { key: 'optMiroir', label: 'Miroir intégré', price: 220 },
  { key: 'optLumiere', label: 'Éclairage LED', price: 150 },
  { key: 'optTiroirs', label: 'Tiroirs intérieurs', price: 280 },
]

/** Construit un meuble paramétrique en fonction de la config. */
function buildDressing(config: DressingConfig): THREE.Group {
  const group = new THREE.Group()

  const w = config.largeur / 100
  const h = config.hauteur / 100
  const d = config.profondeur / 100
  const t = 0.02 // épaisseur des panneaux (m)

  const mat = new THREE.MeshStandardMaterial({
    color: MATERIALS[config.materiau].color,
    roughness: 0.6,
    metalness: 0.05,
  })

  const addPanel = (
    sx: number,
    sy: number,
    sz: number,
    px: number,
    py: number,
    pz: number,
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat)
    mesh.position.set(px, py, pz)
    group.add(mesh)
  }

  // Côtés
  addPanel(t, h, d, -w / 2 + t / 2, 0, 0)
  addPanel(t, h, d, w / 2 - t / 2, 0, 0)
  // Haut & bas
  addPanel(w, t, d, 0, h / 2 - t / 2, 0)
  addPanel(w, t, d, 0, -h / 2 + t / 2, 0)
  // Fond
  addPanel(w, h, t, 0, 0, -d / 2 + t / 2)

  // Séparations verticales -> colonnes
  const innerW = w - 2 * t
  for (let i = 1; i < config.colonnes; i++) {
    const x = -w / 2 + t + (innerW / config.colonnes) * i
    addPanel(t, h - 2 * t, d - t, x, 0, t / 2)
  }

  // Une étagère par colonne
  const colW = innerW / config.colonnes
  for (let c = 0; c < config.colonnes; c++) {
    const cx = -w / 2 + t + colW * (c + 0.5)
    addPanel(colW - t, t, d - t, cx, 0, t / 2)
  }

  group.position.y = 0
  return group
}

export default function Configurator() {
  const [config, setConfig] = useState<DressingConfig>(DEFAULT_CONFIG)

  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const dressingRef = useRef<THREE.Group>()
  const rotationRef = useRef({ y: -0.5, x: 0.1 })

  // Init de la scène (une seule fois)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f1ea)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dir = new THREE.DirectionalLight(0xffffff, 0.9)
    dir.position.set(3, 5, 4)
    scene.add(dir)
    const fill = new THREE.DirectionalLight(0xffffff, 0.3)
    fill.position.set(-4, 2, -3)
    scene.add(fill)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // Rotation à la souris
    let dragging = false
    let lastX = 0
    let lastY = 0
    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      dragging = false
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      rotationRef.current.y += (e.clientX - lastX) * 0.01
      rotationRef.current.x = Math.max(
        -0.6,
        Math.min(0.6, rotationRef.current.x + (e.clientY - lastY) * 0.01),
      )
      lastX = e.clientX
      lastY = e.clientY
    }
    const el = renderer.domElement
    el.style.cursor = 'grab'
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointermove', onMove)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (dressingRef.current) {
        dressingRef.current.rotation.y = rotationRef.current.y
        dressingRef.current.rotation.x = rotationRef.current.x
        if (!dragging) rotationRef.current.y += 0.002
      }
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      renderer.dispose()
      if (el.parentNode) el.parentNode.removeChild(el)
    }
  }, [])

  // Reconstruit le meuble à chaque changement de config
  useEffect(() => {
    const scene = sceneRef.current
    const camera = cameraRef.current
    if (!scene || !camera) return

    if (dressingRef.current) {
      scene.remove(dressingRef.current)
      dressingRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          ;(obj.material as THREE.Material).dispose()
        }
      })
    }

    const dressing = buildDressing(config)
    dressingRef.current = dressing
    scene.add(dressing)

    // Cadre la caméra sur la plus grande dimension
    const maxDim = Math.max(config.largeur, config.hauteur) / 100
    camera.position.z = maxDim * 2.2 + 1
  }, [config])

  const update = <K extends keyof DressingConfig>(key: K, value: DressingConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }))

  const prix = calcPrix(config)

  return (
    <section id="configurateur" className="bg-cream px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-oak text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-4">
          Configurateur
        </p>
        <h2
          className="font-playfair text-charcoal font-normal leading-tight mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Composez votre dressing<br />et obtenez un prix instantané
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Aperçu 3D */}
          <div className="flex flex-col gap-3">
            <div
              ref={mountRef}
              className="w-full aspect-square lg:aspect-auto lg:h-[460px] bg-cream border border-oak/20 rounded-sm overflow-hidden"
            />
            <p className="text-muted text-xs text-center">
              Cliquez-glissez pour faire pivoter le meuble
            </p>
          </div>

          {/* Contrôles */}
          <div className="flex flex-col gap-8">
            {/* Dimensions */}
            <div className="flex flex-col gap-5">
              <SliderRow
                label="Largeur"
                value={config.largeur}
                min={120}
                max={400}
                step={10}
                onChange={(v) => update('largeur', v)}
              />
              <SliderRow
                label="Hauteur"
                value={config.hauteur}
                min={180}
                max={280}
                step={10}
                onChange={(v) => update('hauteur', v)}
              />
              <SliderRow
                label="Profondeur"
                value={config.profondeur}
                min={40}
                max={80}
                step={5}
                onChange={(v) => update('profondeur', v)}
              />
              <SliderRow
                label="Colonnes"
                value={config.colonnes}
                min={1}
                max={6}
                step={1}
                unit=""
                onChange={(v) => update('colonnes', v)}
              />
            </div>

            {/* Matériaux */}
            <div>
              <div className="text-charcoal text-xs uppercase tracking-widest mb-3">
                Matériau
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MATERIAL_KEYS.map((key) => {
                  const m = MATERIALS[key]
                  const active = config.materiau === key
                  return (
                    <button
                      key={key}
                      onClick={() => update('materiau', key)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-sm border transition-colors ${
                        active ? 'border-oak bg-white' : 'border-oak/20 hover:border-oak/50'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-black/10"
                        style={{ backgroundColor: m.hex }}
                      />
                      <span className="text-charcoal text-[0.7rem] text-center leading-tight">
                        {m.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Options */}
            <div>
              <div className="text-charcoal text-xs uppercase tracking-widest mb-3">
                Options
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPTIONS.map((opt) => {
                  const active = config[opt.key] as boolean
                  return (
                    <label
                      key={opt.key}
                      className={`flex items-center justify-between gap-3 p-3 rounded-sm border cursor-pointer transition-colors ${
                        active ? 'border-oak bg-white' : 'border-oak/20 hover:border-oak/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={(e) => update(opt.key, e.target.checked)}
                          className="accent-oak"
                        />
                        <span className="text-charcoal text-sm">{opt.label}</span>
                      </span>
                      <span className="text-muted text-xs">+{opt.price} €</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Prix */}
            <div className="bg-charcoal rounded-sm p-6 text-white">
              <div className="flex flex-col gap-2 text-sm">
                <Row label="Structure" value={formatPrice(prix.pStructure)} />
                <Row label="Matériau" value={formatPrice(prix.pMateriau)} />
                <Row label="Options" value={formatPrice(prix.pOptions)} />
              </div>
              <div className="h-px bg-white/15 my-4" />
              <div className="flex items-end justify-between">
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  Estimation totale
                </span>
                <span className="font-playfair text-oak text-3xl">
                  {formatPrice(prix.total)}
                </span>
              </div>
              <a
                href="#contact"
                className="mt-5 block text-center bg-oak text-white text-sm font-medium px-8 py-3.5 rounded-sm hover:bg-oak-dark transition-colors"
              >
                Demander ce devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit = ' cm',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-charcoal text-xs uppercase tracking-widest">{label}</span>
        <span className="text-oak text-sm font-medium">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        className="range-oak w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{label}</span>
      <span className="text-white/90">{value}</span>
    </div>
  )
}
