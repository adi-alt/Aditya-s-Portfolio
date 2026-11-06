import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

// Crisp low-DPR pass upscaled with nearest-neighbour for tactile voxel/CAD aesthetic
const PIXEL_DPR = 0.55

export type SceneMode = 'f1' | 'turbine' | 'pcb'

type Voxel = { x: number; y: number; z: number; color: string }

function VoxelCluster({
  voxels,
  unit = 0.14,
  wireframe = false,
}: {
  voxels: Voxel[]
  unit?: number
  wireframe?: boolean
}) {
  const byColor = useMemo(() => {
    const map: Record<string, THREE.Vector3[]> = {}
    voxels.forEach((v) => {
      ;(map[v.color] ||= []).push(new THREE.Vector3(v.x * unit, v.y * unit, v.z * unit))
    })
    return Object.entries(map)
  }, [voxels, unit])

  return (
    <group>
      {byColor.map(([color, pts]) => (
        <InstancedVoxels key={color} color={color} points={pts} size={unit} wireframe={wireframe} />
      ))}
    </group>
  )
}

function InstancedVoxels({
  color,
  points,
  size,
  wireframe,
}: {
  color: string
  points: THREE.Vector3[]
  size: number
  wireframe: boolean
}) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    points.forEach((p, i) => {
      m.makeTranslation(p.x, p.y, p.z)
      ref.current.setMatrixAt(i, m)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [points])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, points.length]}>
      <boxGeometry args={[size * 0.94, size * 0.94, size * 0.94]} />
      <meshStandardMaterial
        color={wireframe ? '#f43f5e' : color}
        roughness={0.35}
        metalness={0.45}
        flatShading
        wireframe={wireframe}
      />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Real-Life Voxel Formula 1 Telemetry Car + Aero Flow Curves      */
/* ------------------------------------------------------------------ */
function buildF1Voxels(): Voxel[] {
  const out: Voxel[] = []
  const addBox = (
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    z0: number,
    z1: number,
    color: string,
  ) => {
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++) out.push({ x, y, z, color })
  }

  // Carbon floor & diffuser
  addBox(-11, 10, -2, -2, -3, 3, '#141923')
  // Nose cone & central monocoque
  addBox(-12, -5, -1, 0, -1, 1, '#ff2a54')
  addBox(-5, 6, -1, 1, -2, 2, '#ff2a54')
  // Sidepods with cyan telemetry stripe
  addBox(-3, 5, -1, 0, -4, -3, '#c81e45')
  addBox(-3, 5, -1, 0, 3, 4, '#c81e45')
  addBox(-2, 4, 0, 0, -4, -4, '#00f0ff')
  addBox(-2, 4, 0, 0, 4, 4, '#00f0ff')
  // Cockpit & driver helmet + airbox
  addBox(-2, 1, 1, 2, -1, 1, '#0b0e14')
  addBox(-1, 0, 2, 2, 0, 0, '#ffb800')
  addBox(2, 6, 1, 3, -1, 1, '#ff2a54')
  // Front wing
  addBox(-13, -11, -2, -1, -6, 6, '#e2e8f0')
  addBox(-13, -11, -2, 0, -6, -6, '#00f0ff')
  addBox(-13, -11, -2, 0, 6, 6, '#00f0ff')
  // Rear wing (DRS assembly)
  addBox(9, 11, -1, 4, -5, -5, '#1e293b')
  addBox(9, 11, -1, 4, 5, 5, '#1e293b')
  addBox(9, 11, 3, 4, -5, 5, '#ff2a54')
  addBox(10, 11, 4, 4, -4, 4, '#00f0ff')

  // 4 Pirelli slick wheels
  const wheelCenters = [
    [-8, -1, -6],
    [-8, -1, 6],
    [7, -1, -6],
    [7, -1, 6],
  ]
  for (const [wx, wy, wz] of wheelCenters) {
    addBox(wx - 2, wx + 2, wy - 1, wy + 2, wz - 1, wz + 1, '#0f141c')
    out.push({ x: wx, y: wy + 1, z: wz + (wz > 0 ? 1 : -1), color: '#ffb800' })
  }
  return out
}

function F1CarModel({ wireframe }: { wireframe: boolean }) {
  const voxels = useMemo(() => buildF1Voxels(), [])
  const ref = useRef<THREE.Group>(null!)
  useFrame((state, dt) => {
    ref.current.rotation.y += dt * 0.45
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08
  })

  // Aerodynamic CFD flow curves over the chassis
  const aeroTop = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.3, -0.1, 0),
        new THREE.Vector3(-1.2, 0.25, 0),
        new THREE.Vector3(0.1, 0.58, 0),
        new THREE.Vector3(1.4, 0.72, 0),
        new THREE.Vector3(2.3, 0.9, 0),
      ]).getPoints(32),
    [],
  )
  const aeroLeft = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -0.15, 0.85),
        new THREE.Vector3(-0.7, 0.08, 0.95),
        new THREE.Vector3(0.8, 0.18, 0.75),
        new THREE.Vector3(2.1, 0.55, 0.65),
      ]).getPoints(28),
    [],
  )
  const aeroRight = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -0.15, -0.85),
        new THREE.Vector3(-0.7, 0.08, -0.95),
        new THREE.Vector3(0.8, 0.18, -0.75),
        new THREE.Vector3(2.1, 0.55, -0.65),
      ]).getPoints(28),
    [],
  )

  return (
    <group ref={ref} rotation={[0.18, -0.65, 0]}>
      <VoxelCluster voxels={voxels} unit={0.145} wireframe={wireframe} />
      <Line points={aeroTop} color="#00f0ff" lineWidth={1.6} dashed dashSize={0.15} gapSize={0.08} />
      <Line points={aeroLeft} color="#ff2a54" lineWidth={1.3} />
      <Line points={aeroRight} color="#ff2a54" lineWidth={1.3} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Real-Life Voxel Wind Turbine + Wind Forecast Curves             */
/* ------------------------------------------------------------------ */
function buildTurbineTower(): Voxel[] {
  const out: Voxel[] = []
  const addBox = (
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    z0: number,
    z1: number,
    color: string,
  ) => {
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++) out.push({ x, y, z, color })
  }
  // Offshore foundation pad
  addBox(-4, 4, -12, -11, -4, 4, '#1e293b')
  addBox(-3, 3, -10, -10, -3, 3, '#10b981')
  // Tapered tower
  addBox(-2, 2, -9, -3, -2, 2, '#cbd5e1')
  addBox(-1, 1, -2, 6, -1, 1, '#e2e8f0')
  // Nacelle housing + telemetry beacon
  addBox(-2, 4, 6, 8, -2, 2, '#f8fafc')
  addBox(1, 3, 9, 9, -1, 1, '#00f0ff')
  return out
}

function buildSingleBlade(): Voxel[] {
  const out: Voxel[] = []
  for (let y = 1; y <= 11; y++) {
    out.push({ x: 0, y, z: 0, color: y > 9 ? '#ff2a54' : '#f8fafc' })
    if (y < 9) out.push({ x: 1, y, z: 0, color: '#cbd5e1' })
  }
  return out
}

function WindTurbineModel({ wireframe }: { wireframe: boolean }) {
  const tower = useMemo(() => buildTurbineTower(), [])
  const blade = useMemo(() => buildSingleBlade(), [])
  const groupRef = useRef<THREE.Group>(null!)
  const rotorRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    groupRef.current.rotation.y += dt * 0.35
    rotorRef.current.rotation.x += dt * 2.2
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.1, -0.6, 0]}>
      <VoxelCluster voxels={tower} unit={0.14} wireframe={wireframe} />
      <group ref={rotorRef} position={[-0.42, 0.98, 0]}>
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((ang, i) => (
          <group key={i} rotation={[ang, 0, 0]}>
            <VoxelCluster voxels={blade} unit={0.13} wireframe={wireframe} />
          </group>
        ))}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Real-Life Voxel PCB / CAD Hardware Module (SKiDL / build123d)   */
/* ------------------------------------------------------------------ */
function buildPCBVoxels(): Voxel[] {
  const out: Voxel[] = []
  const addBox = (
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    z0: number,
    z1: number,
    color: string,
  ) => {
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++) out.push({ x, y, z, color })
  }
  // FR-4 emerald PCB substrate
  addBox(-9, 9, -1, 0, -9, 9, '#065f46')
  // Gold edge connectors
  for (let i = -7; i <= 7; i += 2) {
    addBox(i, i, 0, 0, -10, -9, '#ffb800')
    addBox(i, i, 0, 0, 9, 10, '#ffb800')
    addBox(-10, -9, 0, 0, i, i, '#ffb800')
    addBox(9, 10, 0, 0, i, i, '#ffb800')
  }
  // Central BGA AI Processor Die
  addBox(-4, 4, 1, 2, -4, 4, '#1e293b')
  addBox(-2, 2, 3, 3, -2, 2, '#00f0ff')
  // SMD capacitors & VRM blocks
  addBox(-7, -6, 1, 2, -6, -3, '#141923')
  addBox(-7, -6, 1, 2, 2, 5, '#141923')
  addBox(6, 7, 1, 2, -5, 5, '#ff2a54')
  // Copper traces
  for (let x = -8; x <= 8; x++) {
    out.push({ x, y: 1, z: -7, color: '#ffb800' })
    out.push({ x, y: 1, z: 7, color: '#ffb800' })
  }
  return out
}

function PCBModel({ wireframe }: { wireframe: boolean }) {
  const voxels = useMemo(() => buildPCBVoxels(), [])
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.45
  })
  return (
    <group ref={ref} rotation={[0.45, 0.5, 0]}>
      <VoxelCluster voxels={voxels} unit={0.15} wireframe={wireframe} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Interactive Telemetry Rig + CAD Reference Grid                     */
/* ------------------------------------------------------------------ */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.4, 0.06)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.22, 0.06)
  })
  return <group ref={ref}>{children}</group>
}

function TelemetryRing() {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, dt) => (ref.current.rotation.y -= dt * 0.25))
  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      arr.push(new THREE.Vector3(Math.cos(a) * 2.35, -1.25, Math.sin(a) * 2.35))
    }
    return arr
  }, [])
  return (
    <group ref={ref}>
      <Line points={pts} color="#1e293b" lineWidth={1.2} dashed dashSize={0.14} gapSize={0.1} />
    </group>
  )
}

export default function HeroScene({
  mode = 'f1',
  wireframe = false,
  onCycle,
}: {
  mode?: SceneMode
  wireframe?: boolean
  onCycle?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Canvas
      dpr={PIXEL_DPR}
      camera={{ position: [0, 1.1, 5.4], fov: 40 }}
      gl={{ antialias: false, alpha: true }}
      style={{ imageRendering: 'pixelated', cursor: hovered ? 'pointer' : 'grab' }}
      onClick={onCycle}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.9} color="#00f0ff" />
      <directionalLight position={[0, -4, 2]} intensity={0.5} color="#ff2a54" />
      <Rig>
        <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.35}>
          {mode === 'f1' && <F1CarModel wireframe={wireframe} />}
          {mode === 'turbine' && <WindTurbineModel wireframe={wireframe} />}
          {mode === 'pcb' && <PCBModel wireframe={wireframe} />}
        </Float>
        <TelemetryRing />
      </Rig>
    </Canvas>
  )
}

/** Compact 3D Voxel PCB/Wind/F1 preview for section headers or cards */
export function MiniVoxel({
  mode = 'pcb',
  wireframe = false,
}: {
  mode?: SceneMode
  wireframe?: boolean
}) {
  return (
    <Canvas
      dpr={PIXEL_DPR}
      camera={{ position: [0, 0.35, 6.1], fov: 40 }}
      gl={{ antialias: false, alpha: true }}
      style={{ imageRendering: 'pixelated' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <directionalLight position={[-3, -2, 2]} intensity={0.8} color="#00f0ff" />
      <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
        {mode === 'pcb' && <PCBModel wireframe={wireframe} />}
        {mode === 'turbine' && <WindTurbineModel wireframe={wireframe} />}
        {mode === 'f1' && <F1CarModel wireframe={wireframe} />}
      </Float>
    </Canvas>
  )
}
