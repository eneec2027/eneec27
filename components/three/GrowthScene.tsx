'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── UA growth network — 46 founding students → thousands ──────────
// Nodes appear sequentially. When both endpoints of an edge are
// visible, the edge is drawn. Camera pulls back as the network grows.

const MAX_NODES     = 220
const GROWTH_SPEED  = 9     // nodes per second
const CONNECT_DIST  = 3.2
const TOTAL_SECONDS = MAX_NODES / GROWTH_SPEED   // ~24 s, loops gently

// Seeded pseudo-random (deterministic positions, no hydration issues)
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453
  return x - Math.floor(x)
}

function buildNodes(): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < MAX_NODES; i++) {
    // Radius grows as more nodes appear — founding cluster stays tight
    const phase  = i / MAX_NODES
    const radius = i < 46 ? 1.8 + seededRandom(i * 3) * 1.4
                           : 3.5 + phase * 10
    const theta  = seededRandom(i * 7) * Math.PI * 2
    const phi    = Math.acos(2 * seededRandom(i * 11) - 1)
    nodes.push(new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi) * 0.55,  // slightly flattened sphere
      radius * Math.sin(phi) * Math.sin(theta),
    ))
  }
  return nodes
}

function buildEdges(nodes: THREE.Vector3[]): [number, number][] {
  const edges: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
        edges.push([i, j])
      }
    }
  }
  return edges
}

function Network() {
  const { scene, camera } = useThree()
  const clockRef = useRef(0)

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#080c14', 0.028)
    return () => { scene.fog = null }
  }, [scene])

  useEffect(() => {
    camera.position.set(0, 8, 12)
    ;(camera as THREE.PerspectiveCamera).fov = 55
    camera.updateProjectionMatrix()
  }, [camera])

  const nodes = useMemo(buildNodes, [])
  const edges = useMemo(() => buildEdges(nodes), [nodes])

  // Node points geometry — all positions pre-loaded, draw range controls visibility
  const nodeGeo = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      positions[i * 3]     = n.x
      positions[i * 3 + 1] = n.y
      positions[i * 3 + 2] = n.z
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [nodes])

  // Edge geometry — large buffer, partially filled each frame
  const edgeBuf = useRef(new Float32Array(edges.length * 6))
  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(edgeBuf.current, 3))
    return g
  }, [])

  const nodeMat = useMemo(
    () => new THREE.PointsMaterial({ color: '#c9a84c', size: 0.22, transparent: true, opacity: 0.75 }),
    []
  )
  const edgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.2 }),
    []
  )
  // Brighter material for founding cluster edges (first 46 nodes)
  const foundingEdgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.55 }),
    []
  )

  // Separate geometry for founding edges (always bright)
  const foundingEdges = useMemo(
    () => edges.filter(([a, b]) => a < 46 && b < 46),
    [edges]
  )
  const foundingBuf = useMemo(() => {
    const buf = new Float32Array(foundingEdges.length * 6)
    foundingEdges.forEach(([a, b], i) => {
      const pa = nodes[a], pb = nodes[b]
      buf[i * 6]     = pa.x; buf[i * 6 + 1] = pa.y; buf[i * 6 + 2] = pa.z
      buf[i * 6 + 3] = pb.x; buf[i * 6 + 4] = pb.y; buf[i * 6 + 5] = pb.z
    })
    return buf
  }, [foundingEdges, nodes])
  const foundingGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(foundingBuf, 3))
    return g
  }, [foundingBuf])

  useFrame((_, delta) => {
    clockRef.current = (clockRef.current + delta) % (TOTAL_SECONDS + 3)
    const visible = Math.min(Math.floor(clockRef.current * GROWTH_SPEED), MAX_NODES)

    // Update node draw range
    nodeGeo.setDrawRange(0, visible)

    // Fill edge buffer with active edges
    let edgeCount = 0
    const buf = edgeBuf.current
    for (const [a, b] of edges) {
      if (a >= visible || b >= visible) continue
      if (a < 46 && b < 46) continue  // handled by foundingGeo
      const pa = nodes[a], pb = nodes[b]
      buf[edgeCount * 6]     = pa.x; buf[edgeCount * 6 + 1] = pa.y; buf[edgeCount * 6 + 2] = pa.z
      buf[edgeCount * 6 + 3] = pb.x; buf[edgeCount * 6 + 4] = pb.y; buf[edgeCount * 6 + 5] = pb.z
      edgeCount++
    }
    edgeGeo.setDrawRange(0, edgeCount * 2)
    ;(edgeGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true

    // Camera pulls back as network grows
    const progress = Math.min(clockRef.current / TOTAL_SECONDS, 1)
    const radius   = 12 + progress * 18
    const angle    = clockRef.current * 0.07
    camera.position.set(
      Math.sin(angle) * radius,
      radius * 0.38,
      Math.cos(angle) * radius
    )
    camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <points geometry={nodeGeo} material={nodeMat} />
      <lineSegments geometry={edgeGeo} material={edgeMat} />
      <lineSegments geometry={foundingGeo} material={foundingEdgeMat} />
    </group>
  )
}

export default function GrowthScene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Network />
    </Canvas>
  )
}
