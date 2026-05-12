'use client'

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Campus de Santiago building volumes ───────────────────────────
// Approximate footprints based on the Nuno Portas master plan.
// 1 unit ≈ 4 m. Campus spine runs along +Z.
// accent: true  → Biblioteca (Siza) — brighter edges
// accent: false → remaining departments

const BUILDINGS = [
  // ── Biblioteca — Siza Vieira — U shape (three wings)
  { x: -3.2, z:  1.5, w: 2.8, d: 10.0, h: 2.4, accent: true  },
  { x:  3.2, z:  1.5, w: 2.8, d: 10.0, h: 2.4, accent: true  },
  { x:  0.0, z: -3.0, w: 9.2, d:  2.8, h: 2.4, accent: true  },

  // ── Left side departments ─────────────────────────────────────
  { x: -12,  z:  3.0, w: 5.5, d:  8.0, h: 2.0, accent: false },
  { x: -12,  z: 15.0, w: 5.5, d:  8.0, h: 1.8, accent: false },
  { x: -12,  z: 27.5, w: 6.0, d:  9.5, h: 2.5, accent: false },
  { x: -12,  z: 40.0, w: 5.5, d:  8.0, h: 2.0, accent: false },

  // ── Right side — Reitoria (tall) + departments ────────────────
  { x:  12,  z:  3.0, w: 5.5, d:  8.0, h: 2.0, accent: false },
  { x:  12,  z: 14.0, w: 7.0, d:  6.0, h: 3.8, accent: false }, // Reitoria
  { x:  12,  z: 26.0, w: 5.5, d:  8.0, h: 2.2, accent: false },
  { x:  12,  z: 38.0, w: 5.5, d:  9.5, h: 2.0, accent: false },
] as const

const EXTRUDE_DELAY = 0.28  // seconds between each building start
const EXTRUDE_DUR   = 1.1   // seconds to fully extrude

// ── Campus spine walkway (central pedestrian gallery) ─────────────
function buildSpine(): number[] {
  const pts: number[] = []
  // Two parallel lines along Z axis
  for (const sx of [-1.8, 1.8]) {
    pts.push(sx, 0.02, -6, sx, 0.02, 46)
  }
  // Cross ties every 4 units
  for (let z = -4; z <= 44; z += 4) {
    pts.push(-1.8, 0.02, z, 1.8, 0.02, z)
  }
  return pts
}

// ── Ground grid ───────────────────────────────────────────────────
function buildGround(): number[] {
  const pts: number[] = []
  for (let x = -20; x <= 20; x += 4) {
    pts.push(x, 0, -8, x, 0, 50)
  }
  for (let z = -8; z <= 50; z += 4) {
    pts.push(-20, 0, z, 20, 0, z)
  }
  return pts
}

// ── Scene ─────────────────────────────────────────────────────────
function Campus() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#080c14', 0.024)
    return () => { scene.fog = null }
  }, [scene])

  const clock = useRef(0)
  const buildingRefs = useRef<Map<number, THREE.Group>>(new Map())

  const setRef = useCallback(
    (i: number) => (el: THREE.Group | null) => {
      if (el) buildingRefs.current.set(i, el)
    },
    []
  )

  // Materials
  const solidMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#0c1525' }), [])
  const edgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.45 }), [])
  const accentMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.80 }), [])
  const spineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.18 }), [])
  const groundMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.05 }), [])

  // Building geometries — created once per building
  const geos = useMemo(() =>
    BUILDINGS.map(b => {
      const box   = new THREE.BoxGeometry(b.w, b.h, b.d)
      const edges = new THREE.EdgesGeometry(box)
      return { box, edges }
    }), [])

  // Spine + ground geometries
  const spineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(buildSpine(), 3))
    return g
  }, [])

  const groundGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(buildGround(), 3))
    return g
  }, [])

  useFrame((_, delta) => {
    clock.current += delta
    BUILDINGS.forEach((_, i) => {
      const group = buildingRefs.current.get(i)
      if (!group) return
      const start    = i * EXTRUDE_DELAY
      const raw      = (clock.current - start) / EXTRUDE_DUR
      const progress = Math.min(Math.max(raw, 0), 1)
      // Ease out cubic
      group.scale.y  = 1 - Math.pow(1 - progress, 3)
    })
  })

  return (
    <group>
      {/* Ground grid */}
      <lineSegments geometry={groundGeo} material={groundMat} />
      {/* Central spine */}
      <lineSegments geometry={spineGeo} material={spineMat} />

      {/* Building volumes */}
      {BUILDINGS.map((b, i) => (
        <group
          key={i}
          ref={setRef(i)}
          position={[b.x, 0, b.z]}
          scale={[1, 0.001, 1]}
        >
          <mesh
            geometry={geos[i].box}
            material={solidMat}
            position={[0, b.h / 2, 0]}
          />
          <lineSegments
            geometry={geos[i].edges}
            material={b.accent ? accentMat : edgeMat}
            position={[0, b.h / 2, 0]}
          />
        </group>
      ))}
    </group>
  )
}

// ── Camera — orbits slowly around campus centre ───────────────────
function CameraRig() {
  const { camera } = useThree()
  const t = useRef(0.4)   // start slightly off-axis for a better first angle

  useEffect(() => {
    camera.position.set(22, 20, 4)
    ;(camera as THREE.PerspectiveCamera).fov = 32
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame((_, delta) => {
    t.current += delta * 0.055   // very slow rotation
    const radius = 30
    camera.position.set(
      Math.sin(t.current) * radius,
      20,
      Math.cos(t.current) * radius + 16
    )
    camera.lookAt(0, 2, 20)
  })

  return null
}

export default function CampusScene() {
  return (
    <Canvas
      camera={{ position: [22, 20, 4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Campus />
      <CameraRig />
    </Canvas>
  )
}
