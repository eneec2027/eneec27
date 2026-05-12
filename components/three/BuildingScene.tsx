'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Grid } from '@react-three/drei'
import * as THREE from 'three'

// 3-bay × 3-story steel frame nodes
const NODES: THREE.Vector3[] = [
  // Floor 0
  new THREE.Vector3(-3, -3, -1.5), new THREE.Vector3(0, -3, -1.5), new THREE.Vector3(3, -3, -1.5),
  new THREE.Vector3(-3, -3,  1.5), new THREE.Vector3(0, -3,  1.5), new THREE.Vector3(3, -3,  1.5),
  // Floor 1
  new THREE.Vector3(-3,  0, -1.5), new THREE.Vector3(0,  0, -1.5), new THREE.Vector3(3,  0, -1.5),
  new THREE.Vector3(-3,  0,  1.5), new THREE.Vector3(0,  0,  1.5), new THREE.Vector3(3,  0,  1.5),
  // Floor 2
  new THREE.Vector3(-3,  3, -1.5), new THREE.Vector3(0,  3, -1.5), new THREE.Vector3(3,  3, -1.5),
  new THREE.Vector3(-3,  3,  1.5), new THREE.Vector3(0,  3,  1.5), new THREE.Vector3(3,  3,  1.5),
]

// [nodeA, nodeB, phase] — phase controls draw order
const EDGES: [number, number, number][] = [
  // Phase 0: foundation beams
  [0,1,0],[1,2,0],[3,4,0],[4,5,0],[0,3,0],[1,4,0],[2,5,0],
  // Phase 1: ground→mid columns
  [0,6,1],[1,7,1],[2,8,1],[3,9,1],[4,10,1],[5,11,1],
  // Phase 2: floor 1 beams
  [6,7,2],[7,8,2],[9,10,2],[10,11,2],[6,9,2],[7,10,2],[8,11,2],
  // Phase 3: mid→top columns
  [6,12,3],[7,13,3],[8,14,3],[9,15,3],[10,16,3],[11,17,3],
  // Phase 4: floor 2 beams
  [12,13,4],[13,14,4],[15,16,4],[16,17,4],[12,15,4],[13,16,4],[14,17,4],
  // Phase 5: diagonal bracing front
  [0,7,5],[1,6,5],[1,8,5],[2,7,5],[6,13,5],[7,12,5],[7,14,5],[8,13,5],
  // Phase 6: diagonal bracing back
  [3,10,6],[4,9,6],[4,11,6],[5,10,6],[9,16,6],[10,15,6],[10,17,6],[11,16,6],
]

const TOTAL_PHASES = 7
const PHASE_DURATION = 0.85
const TOTAL_DURATION = TOTAL_PHASES * PHASE_DURATION

function StructureFrame() {
  const clock = useRef(0)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Build geometry once: 2 vertices per edge (start + animated tip)
  // Degenerate lines (tip = start) are invisible — no conditionals needed
  const positions = useMemo(() => {
    const buf = new Float32Array(EDGES.length * 2 * 3)
    EDGES.forEach(([a], i) => {
      const s = NODES[a]
      buf[i * 6 + 0] = s.x; buf[i * 6 + 1] = s.y; buf[i * 6 + 2] = s.z
      buf[i * 6 + 3] = s.x; buf[i * 6 + 4] = s.y; buf[i * 6 + 5] = s.z
    })
    return buf
  }, [])

  useFrame((_, delta) => {
    clock.current = Math.min(clock.current + delta, TOTAL_DURATION + 2)
    const fp = clock.current / TOTAL_DURATION

    // Slow rotation after structure is complete
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
    }

    // Mutate tip vertex of each beam directly — no React state, no re-renders
    EDGES.forEach(([a, b, phase], i) => {
      const phaseStart = phase / TOTAL_PHASES
      const phaseEnd = (phase + 1) / TOTAL_PHASES
      const t =
        fp >= phaseEnd ? 1 :
        fp > phaseStart ? (fp - phaseStart) / (phaseEnd - phaseStart) :
        0

      const s = NODES[a]
      const e = NODES[b]
      positions[i * 6 + 3] = s.x + (e.x - s.x) * t
      positions[i * 6 + 4] = s.y + (e.y - s.y) * t
      positions[i * 6 + 5] = s.z + (e.z - s.z) * t
    })

    if (geoRef.current) {
      (geoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} rotation={[0.12, 0, 0]}>
      <lineSegments>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#c9a84c" transparent opacity={0.9} />
      </lineSegments>
    </group>
  )
}

function Scene() {
  return (
    <>
      <Stars radius={80} depth={40} count={3000} factor={2} saturation={0} fade speed={0.4} />
      <Grid
        position={[0, -3.02, 0]}
        args={[24, 24]}
        cellColor="rgba(201,168,76,0.06)"
        sectionColor="rgba(201,168,76,0.1)"
        fadeDistance={28}
        fadeStrength={1.2}
        infiniteGrid
      />
      <StructureFrame />
    </>
  )
}

export default function BuildingScene() {
  return (
    <Canvas
      camera={{ position: [9, 4, 13], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI * 0.72}
      />
    </Canvas>
  )
}
