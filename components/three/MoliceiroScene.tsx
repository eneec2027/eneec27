'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Moliceiro — traditional Aveiro lagoon boat wireframe ──────────
// Naval lines plan: sheer curves (port + starboard), keel centreline,
// station cross-sections, bow/stern espelho panels.
// 1 unit ≈ 1 m. Boat length ≈ 18 m → 18 units.

const HALF_LEN   = 9    // half boat length
const MAX_BEAM   = 1.6  // max half-beam at midship
const BOW_HEIGHT = 4.8  // height of bow tip above keel
const STERN_H    = 3.8  // height of stern tip above keel

// ── Hull form functions ───────────────────────────────────────────
function sheerY(x: number): number {
  const t = x / HALF_LEN  // -1 (stern) → +1 (bow)
  if (t >  0.82) return 1.0 + (t - 0.82) / 0.18 * (BOW_HEIGHT  - 1.0)
  if (t < -0.82) return 1.0 + (-t - 0.82) / 0.18 * (STERN_H    - 1.0)
  return 0.90 + Math.cos(t * Math.PI * 0.5) * 0.12
}

function keelY(x: number): number {
  const t = Math.abs(x) / HALF_LEN
  if (t > 0.88) return 0.35 * ((t - 0.88) / 0.12) ** 2
  return 0
}

function halfBeam(x: number): number {
  const t = Math.abs(x) / HALF_LEN
  return MAX_BEAM * Math.max(0, 1 - Math.pow(t, 1.25))
}

// ── Geometry builder ─────────────────────────────────────────────
function buildHull(): number[] {
  const pts: number[] = []
  const N  = 40  // curve resolution

  const portPts: THREE.Vector3[]      = []
  const stbdPts: THREE.Vector3[]      = []
  const keelPts: THREE.Vector3[]      = []

  for (let i = 0; i <= N; i++) {
    const x = -HALF_LEN + i * (HALF_LEN * 2) / N
    portPts.push(new THREE.Vector3(x, sheerY(x), -halfBeam(x)))
    stbdPts.push(new THREE.Vector3(x, sheerY(x),  halfBeam(x)))
    keelPts.push(new THREE.Vector3(x, keelY(x),   0))
  }

  // Sheer curves (top edges)
  for (let i = 0; i < N; i++) {
    pts.push(portPts[i].x, portPts[i].y, portPts[i].z,
             portPts[i+1].x, portPts[i+1].y, portPts[i+1].z)
    pts.push(stbdPts[i].x, stbdPts[i].y, stbdPts[i].z,
             stbdPts[i+1].x, stbdPts[i+1].y, stbdPts[i+1].z)
  }
  // Keel centreline
  for (let i = 0; i < N; i++) {
    pts.push(keelPts[i].x, keelPts[i].y, keelPts[i].z,
             keelPts[i+1].x, keelPts[i+1].y, keelPts[i+1].z)
  }

  // Station cross-sections — denser for better hull definition
  const STATIONS = [-8.5, -7, -5.5, -4, -2.5, -1, 0, 1, 2.5, 4, 5.5, 7, 8.5]
  for (const x of STATIONS) {
    const sy  = sheerY(x)
    const ky  = keelY(x)
    const b   = halfBeam(x)
    const bk  = b * 0.22

    pts.push(x, ky, -bk,  x, ky, -b)
    pts.push(x, ky, -b,   x, sy, -b)
    pts.push(x, ky,  bk,  x, ky,  b)
    pts.push(x, ky,  b,   x, sy,  b)
    pts.push(x, sy, -b,   x, sy,  b)
    pts.push(x, ky, -bk,  x, ky,  bk)
    // Mid-bilge horizontal stringer line (quarter height)
    const my = ky + (sy - ky) * 0.38
    const mb = halfBeam(x) * (0.22 + 0.38 * 0.78)
    pts.push(x, my, -mb,  x, my,  mb)
  }

  // Longitudinal mid-hull stringer — runs fore-aft at bilge height
  const stringerPts: THREE.Vector3[] = []
  for (let i = 0; i <= N; i++) {
    const x   = -HALF_LEN + i * (HALF_LEN * 2) / N
    const sy2 = sheerY(x)
    const ky2 = keelY(x)
    const t   = 0.38
    const y   = ky2 + (sy2 - ky2) * t
    const b2  = halfBeam(x) * (0.22 + t * 0.78)
    stringerPts.push(new THREE.Vector3(x, y, -b2))
  }
  for (let i = 0; i < stringerPts.length - 1; i++) {
    pts.push(stringerPts[i].x, stringerPts[i].y, stringerPts[i].z,
             stringerPts[i+1].x, stringerPts[i+1].y, stringerPts[i+1].z)
    pts.push(stringerPts[i].x, stringerPts[i].y, -stringerPts[i].z,
             stringerPts[i+1].x, stringerPts[i+1].y, -stringerPts[i+1].z)
  }

  // Deck centreline (runs along top between bow and stern panels)
  for (let i = 0; i < N; i++) {
    const xa = -HALF_LEN + i * (HALF_LEN * 2) / N
    const xb = -HALF_LEN + (i + 1) * (HALF_LEN * 2) / N
    if (xa > -8.2 && xb < 8.2) {
      pts.push(xa, sheerY(xa), 0, xb, sheerY(xb), 0)
    }
  }

  // Mast — single spar at x=3.5 (forward of midship), rising ~5 units
  const mastX  = 3.5
  const mastY0 = sheerY(mastX)
  const mastY1 = mastY0 + 5.2
  pts.push(mastX, mastY0, 0, mastX, mastY1, 0)
  // Masthead spreader (tiny crossbar)
  pts.push(mastX, mastY1 - 0.3, -0.4, mastX, mastY1 - 0.3, 0.4)
  // Stay lines from masthead to bow tip and to stern area
  pts.push(mastX, mastY1, 0, HALF_LEN, sheerY(HALF_LEN), 0)   // forestay
  pts.push(mastX, mastY1, 0, -5, sheerY(-5), -halfBeam(-5))    // port backstay
  pts.push(mastX, mastY1, 0, -5, sheerY(-5),  halfBeam(-5))    // stbd backstay

  // Rudder — extends below keel at stern, distinctive tall profile
  const rx  = -HALF_LEN + 0.6
  const rky = keelY(rx) - 0.15
  pts.push(rx,      rky,         0,  rx,      rky - 1.0,  0)   // rudder blade down
  pts.push(rx,      rky - 1.0,   0,  rx - 0.6, rky - 0.6, 0)  // trailing edge
  pts.push(rx,      rky,         0,  rx - 0.6, rky,        0)  // top edge
  pts.push(rx - 0.6, rky,        0,  rx - 0.6, rky - 0.6,  0) // leading edge
  // Tiller (long arm extending over the stern deck, characteristic of moliceiros)
  const tillerY = sheerY(-HALF_LEN + 0.4)
  pts.push(-HALF_LEN + 0.4, tillerY, 0, -HALF_LEN + 3.5, tillerY + 0.15, 0)

  // Bow espelho panel (painted decorative panel at bow)
  const bx = HALF_LEN
  const btop  = sheerY(bx)
  const bkeel = keelY(bx)
  const bw    = 0.25
  pts.push(bx, btop,  0,  bx - 0.8, btop  - 0.5,  bw)
  pts.push(bx, btop,  0,  bx - 0.8, btop  - 0.5, -bw)
  pts.push(bx, bkeel, 0,  bx - 0.8, bkeel + 0.4,  bw)
  pts.push(bx, bkeel, 0,  bx - 0.8, bkeel + 0.4, -bw)
  pts.push(bx - 0.8, btop - 0.5, -bw, bx - 0.8, bkeel + 0.4, -bw)
  pts.push(bx - 0.8, btop - 0.5,  bw, bx - 0.8, bkeel + 0.4,  bw)
  pts.push(bx - 0.8, btop - 0.5, -bw, bx - 0.8, btop  - 0.5,  bw)
  pts.push(bx - 0.8, bkeel + 0.4,-bw, bx - 0.8, bkeel + 0.4,  bw)

  // Stern espelho panel
  const sx     = -HALF_LEN
  const stop   = sheerY(sx)
  const skeel  = keelY(sx)
  pts.push(sx, stop,  0,  sx + 0.8, stop  - 0.4,  bw)
  pts.push(sx, stop,  0,  sx + 0.8, stop  - 0.4, -bw)
  pts.push(sx, skeel, 0,  sx + 0.8, skeel + 0.3,  bw)
  pts.push(sx, skeel, 0,  sx + 0.8, skeel + 0.3, -bw)
  pts.push(sx + 0.8, stop - 0.4, -bw, sx + 0.8, skeel + 0.3, -bw)
  pts.push(sx + 0.8, stop - 0.4,  bw, sx + 0.8, skeel + 0.3,  bw)
  pts.push(sx + 0.8, stop - 0.4, -bw, sx + 0.8, stop  - 0.4,  bw)
  pts.push(sx + 0.8, skeel + 0.3,-bw, sx + 0.8, skeel + 0.3,  bw)

  // Waterline (horizontal cut at y=0.55)
  const WL = 0.55
  const wlPts: THREE.Vector3[] = []
  for (let i = 0; i <= N; i++) {
    const x  = -HALF_LEN + i * (HALF_LEN * 2) / N
    const sy2 = sheerY(x)
    const ky2 = keelY(x)
    if (WL >= ky2 && WL <= sy2) {
      const t    = (WL - ky2) / (sy2 - ky2)
      const beam = halfBeam(x) * (0.22 + t * 0.78)
      wlPts.push(new THREE.Vector3(x, WL, -beam))
    }
  }
  for (let i = 0; i < wlPts.length - 1; i++) {
    pts.push(wlPts[i].x, wlPts[i].y, wlPts[i].z,
             wlPts[i+1].x, wlPts[i+1].y, wlPts[i+1].z)
  }
  // Mirror waterline to starboard
  for (let i = 0; i < wlPts.length - 1; i++) {
    pts.push(wlPts[i].x, wlPts[i].y, -wlPts[i].z,
             wlPts[i+1].x, wlPts[i+1].y, -wlPts[i+1].z)
  }

  return pts
}

function Boat() {
  const { scene, camera } = useThree()
  const t = useRef(0)

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#080c14', 0.045)
    return () => { scene.fog = null }
  }, [scene])

  useEffect(() => {
    camera.position.set(8, 6, 14)
    ;(camera as THREE.PerspectiveCamera).fov = 40
    camera.updateProjectionMatrix()
  }, [camera])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(buildHull(), 3))
    return g
  }, [])

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.65 }),
    []
  )

  // Ground reference grid (estaleiro — boatyard)
  const groundGeo = useMemo(() => {
    const pts: number[] = []
    for (let x = -10; x <= 10; x += 2) pts.push(x, -0.02, -4, x, -0.02, 4)
    for (let z = -4; z <= 4; z += 2) pts.push(-10, -0.02, z, 10, -0.02, z)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [])
  const groundMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.06 }),
    []
  )

  useFrame((_, delta) => {
    t.current += delta * 0.06
    const radius = 16
    camera.position.set(
      Math.sin(t.current) * radius * 0.9,
      5 + Math.sin(t.current * 0.4) * 1.5,
      Math.cos(t.current) * radius
    )
    camera.lookAt(0, 1.2, 0)
  })

  return (
    <group>
      <lineSegments geometry={geo} material={mat} />
      <lineSegments geometry={groundGeo} material={groundMat} />
    </group>
  )
}

export default function MoliceiroScene() {
  return (
    <Canvas
      camera={{ position: [8, 6, 14], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Boat />
    </Canvas>
  )
}
