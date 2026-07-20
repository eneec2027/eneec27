'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// ── Ria de Aveiro — tidal mesh ────────────────────────────────────
// Displaced water surface viewed obliquely, like a hydraulic survey
// model. Canal branches radiate from the lagoon in gold.
// No extra dependencies — displacement via sin/cos in useFrame.

const SEGS  = 52
const SIZE  = 36

// Ria canal arms — approximate branching paths from the lagoon centre
const CANAL_ARMS: [number, number, number][][] = [
  // Main inlet (north / Barra)
  [[0,0,0],[0,0,6],[1,0,10],[2,0,15]],
  // South Aveiro branch (SW)
  [[0,0,0],[-3,0,3],[-6,0,5],[-10,0,4],[-13,0,2]],
  // Ílhavo / Vagos branch (SE)
  [[0,0,0],[3,0,3],[7,0,5],[11,0,7],[14,0,5]],
  // Murtosa branch (NW)
  [[0,0,0],[-2,0,-3],[-5,0,-7],[-8,0,-10]],
  // Estarreja branch (NE)
  [[0,0,0],[3,0,-2],[6,0,-6],[9,0,-11]],
]

function buildCanals(): number[] {
  const pts: number[] = []
  for (const arm of CANAL_ARMS) {
    for (let i = 0; i < arm.length - 1; i++) {
      pts.push(...arm[i], ...arm[i + 1])
    }
  }
  return pts
}

function WaterSurface({ isDark }: { isDark: boolean }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.45
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y =
        0.38 * Math.sin(x * 0.32 + t * 1.2) * Math.cos(z * 0.26 + t * 0.85) +
        0.14 * Math.sin(x * 0.68 - t * 0.9) * Math.sin(z * 0.52 + t * 1.05) +
        0.07 * Math.cos(x * 0.95 + t * 0.6) * Math.cos(z * 0.85 - t * 0.75)
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color={isDark ? '#c9a84c' : '#1a2444'} wireframe transparent opacity={isDark ? 0.18 : 0.09} />
    </mesh>
  )
}

function Scene() {
  const { scene, camera } = useThree()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const t = useRef(0)

  useEffect(() => {
    scene.fog = new THREE.FogExp2(isDark ? '#080c14' : '#f5f7fc', 0.034)
    scene.background = new THREE.Color(isDark ? '#080c14' : '#f5f7fc')
    return () => { scene.fog = null }
  }, [scene, isDark])

  // Canal line geometry
  const canalGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(buildCanals(), 3))
    return g
  }, [])

  const canalMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: isDark ? '#c9a84c' : '#1a2444', transparent: true, opacity: isDark ? 0.55 : 0.30 }),
    [isDark]
  )

  useEffect(() => {
    camera.position.set(6, 18, 14)
    ;(camera as THREE.PerspectiveCamera).fov = 48
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame((_, delta) => {
    t.current += delta * 0.09
    camera.position.set(
      5 + Math.sin(t.current) * 4,
      18,
      14 + Math.cos(t.current) * 2
    )
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <WaterSurface isDark={isDark} />
      <lineSegments geometry={canalGeo} material={canalMat} position={[0, 0.05, 0]} />
    </>
  )
}

export default function TidalScene() {
  return (
    <Canvas
      camera={{ position: [6, 18, 14], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
