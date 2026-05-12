'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Álvaro Siza Vieira — UA Library column grid ───────────────────
// Slender rectangular RC columns on a regular orthogonal grid,
// two storeys tall, with horizontal slab bands at each level.
// Salt-pan ground grid (salinas geometry) fills the base plane.

const COLS        = 9     // column lines across (x)
const ROWS        = 22    // column lines deep (z, extends into fog)
const SX          = 5.4   // bay width  (m) — Siza's ~5.4 m spans
const SZ          = 5.4   // bay depth  (m)
const CW          = 0.38  // column face width
const CD          = 0.38  // column face depth
const FH          = 4.2   // floor-to-floor height
const N_FLOORS    = 2     // ground + 1st floor visible
const COL_H       = FH * N_FLOORS
const OX          = -((COLS - 1) * SX) / 2  // centre grid on x

const EYE_Y       = 1.75
const DRIFT_SPEED = 0.6          // units / second
const DRIFT_RANGE = (ROWS - 3) * SZ
const LOOK_AHEAD  = 16

// ── Geometry builder (runs once) ─────────────────────────────────
function buildGeometry() {
  const hW = CW / 2, hD = CD / 2, hH = COL_H / 2

  // Column box edge template (12 edges → 24 ordered vertices)
  const tmpl: [number, number, number][] = [
    // bottom ring
    [-hW, -hH, -hD], [hW, -hH, -hD],
    [hW,  -hH, -hD], [hW,  -hH,  hD],
    [hW,  -hH,  hD], [-hW, -hH,  hD],
    [-hW, -hH,  hD], [-hW, -hH, -hD],
    // top ring
    [-hW,  hH, -hD], [hW,  hH, -hD],
    [hW,   hH, -hD], [hW,  hH,  hD],
    [hW,   hH,  hD], [-hW, hH,  hD],
    [-hW,  hH,  hD], [-hW, hH, -hD],
    // verticals
    [-hW, -hH, -hD], [-hW,  hH, -hD],
    [hW,  -hH, -hD], [hW,   hH, -hD],
    [hW,  -hH,  hD], [hW,   hH,  hD],
    [-hW, -hH,  hD], [-hW,  hH,  hD],
  ]

  // Shelf levels within each floor (every ~0.46 m from 0.35 to 3.75)
  const SHELF_Y = [0.35, 0.81, 1.27, 1.73, 2.19, 2.65, 3.11, 3.57]
  // Shelf depth (how far they protrude from the column face along Z)
  const SHELF_D = SZ - CD - 0.15

  const matrices:  THREE.Matrix4[] = []
  const colEdges:  number[]        = []
  const beamLines: number[]        = []
  const groundPts: number[]        = []
  const shelfPts:  number[]        = []

  // Columns
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const x = OX + c * SX
      const z = r * SZ
      const cy = COL_H / 2

      matrices.push(new THREE.Matrix4().setPosition(x, cy, z))

      // Column edges (offset from local template to world pos)
      for (let i = 0; i < tmpl.length; i += 2) {
        colEdges.push(
          tmpl[i][0] + x,   tmpl[i][1] + cy,   tmpl[i][2] + z,
          tmpl[i+1][0] + x, tmpl[i+1][1] + cy, tmpl[i+1][2] + z,
        )
      }
    }
  }

  // Slab beams at each floor level (x-direction + z-direction)
  for (let f = 0; f <= N_FLOORS; f++) {
    const y = f * FH
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 1; c++) {
        beamLines.push(OX + c * SX, y, r * SZ, OX + (c + 1) * SX, y, r * SZ)
      }
    }
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS - 1; r++) {
        beamLines.push(OX + c * SX, y, r * SZ, OX + c * SX, y, (r + 1) * SZ)
      }
    }
  }

  // Ground grid — salinas (salt pan) reference
  const gx0 = OX - SX, gx1 = OX + (COLS - 1) * SX + SX
  const gz1 = (ROWS - 1) * SZ + SZ
  for (let c = -1; c <= COLS; c++) {
    const x = OX + c * SX
    groundPts.push(x, 0, -SZ, x, 0, gz1)
  }
  for (let r = -1; r <= ROWS; r++) {
    const z = r * SZ
    groundPts.push(gx0, 0, z, gx1, 0, z)
  }

  // Bookshelves — horizontal rails between column pairs, alternating bays
  // Even-indexed gaps (0-1, 2-3, 4-5, 6-7) are stack bays; odd gaps are open aisles
  for (let c = 0; c < COLS - 1; c++) {
    if (c !== 0 && c !== COLS - 2) continue  // only lateral (outermost) bays
    const x0 = OX + c * SX + CW / 2
    const x1 = OX + (c + 1) * SX - CW / 2
    for (let r = 0; r < ROWS - 1; r++) {
      const z0 = r * SZ + CD / 2
      const z1 = r * SZ + SHELF_D
      for (let f = 0; f < N_FLOORS; f++) {
        for (const dy of SHELF_Y) {
          const y = f * FH + dy
          // Front shelf rail (at column face)
          shelfPts.push(x0, y, z0, x1, y, z0)
          // Back shelf rail
          shelfPts.push(x0, y, z1, x1, y, z1)
          // Side rail left
          shelfPts.push(x0, y, z0, x0, y, z1)
          // Side rail right
          shelfPts.push(x1, y, z0, x1, y, z1)
        }
        // Vertical shelf dividers (every ~0.9 m along X)
        const nDividers = Math.floor((x1 - x0) / 0.9)
        for (let d = 1; d < nDividers; d++) {
          const xd = x0 + (d / nDividers) * (x1 - x0)
          for (let s = 0; s < SHELF_Y.length - 1; s++) {
            const ya = f * FH + SHELF_Y[s]
            const yb = f * FH + SHELF_Y[s + 1]
            shelfPts.push(xd, ya, z0, xd, yb, z0)
          }
        }
      }
    }
  }

  return { matrices, colEdges, beamLines, groundPts, shelfPts }
}

// ── Scene components ─────────────────────────────────────────────
function Colonnade() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#080c14', 0.044)
    return () => { scene.fog = null }
  }, [scene])

  const { matrices, colEdges, beamLines, groundPts, shelfPts } = useMemo(buildGeometry, [])

  const colGeo = useMemo(() => new THREE.BoxGeometry(CW, COL_H, CD), [])

  const solidMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#0d1525' }), [])

  const colEdgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.55 }), [])

  const beamMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.28 }), [])

  const groundMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.07 }), [])

  const shelfMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.20 }), [])

  const colEdgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(colEdges, 3))
    return g
  }, [colEdges])

  const beamGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(beamLines, 3))
    return g
  }, [beamLines])

  const groundGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(groundPts, 3))
    return g
  }, [groundPts])

  const shelfGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(shelfPts, 3))
    return g
  }, [shelfPts])

  const instRef = useRef<THREE.InstancedMesh>(null)
  useEffect(() => {
    if (!instRef.current) return
    matrices.forEach((m, i) => instRef.current!.setMatrixAt(i, m))
    instRef.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  return (
    <group>
      {/* Solid column bodies — dark mass against the background */}
      <instancedMesh ref={instRef} args={[colGeo, solidMat, matrices.length]} />
      {/* Column wireframe edges */}
      <lineSegments geometry={colEdgeGeo} material={colEdgeMat} />
      {/* Horizontal slab / beam grid */}
      <lineSegments geometry={beamGeo} material={beamMat} />
      {/* Salt-pan ground grid */}
      <lineSegments geometry={groundGeo} material={groundMat} />
      {/* Bookshelves */}
      <lineSegments geometry={shelfGeo} material={shelfMat} />
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const t = useRef(0)

  useEffect(() => {
    camera.position.set(0, EYE_Y, -1)
  }, [camera])

  useFrame((_, delta) => {
    t.current += delta * DRIFT_SPEED
    const z = t.current % DRIFT_RANGE
    // Gentle lateral drift — walks between column bays
    const x = Math.sin(t.current * 0.032) * SX * 0.28

    camera.position.set(x, EYE_Y + Math.sin(t.current * 0.09) * 0.04, z)
    camera.lookAt(x * 0.6, EYE_Y + 0.35, z + LOOK_AHEAD)
  })

  return null
}

export default function LibraryScene() {
  return (
    <Canvas
      camera={{ position: [0, EYE_Y, -1], fov: 62 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Colonnade />
      <CameraRig />
    </Canvas>
  )
}
