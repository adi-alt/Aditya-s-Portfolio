import { useEffect, useRef, useState } from 'react'
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  DirectionalLight,
  Group,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  MathUtils,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

// Crisp low-DPR pass upscaled with nearest-neighbour for tactile voxel/CAD aesthetic
const PIXEL_DPR = 0.55

export type SceneMode = 'f1' | 'turbine' | 'pcb'

type Voxel = { x: number; y: number; z: number; color: string }

function buildVoxelGroup(
  voxels: Voxel[],
  unit: number,
  wireframe: boolean,
  materialsOut: MeshStandardMaterial[],
  geometriesOut: BufferGeometry[],
): Group {
  const group = new Group()
  const byColor: Record<string, Vector3[]> = {}
  for (const v of voxels) {
    ;(byColor[v.color] ||= []).push(new Vector3(v.x * unit, v.y * unit, v.z * unit))
  }

  const geom = new BoxGeometry(unit * 0.94, unit * 0.94, unit * 0.94)
  geometriesOut.push(geom)
  const mat4 = new Matrix4()

  for (const [color, pts] of Object.entries(byColor)) {
    const mat = new MeshStandardMaterial({
      color: wireframe ? '#f43f5e' : color,
      roughness: 0.35,
      metalness: 0.45,
      flatShading: true,
      wireframe,
    })
    materialsOut.push(mat)
    const mesh = new InstancedMesh(geom, mat, pts.length)
    mesh.userData.baseColor = color
    for (let i = 0; i < pts.length; i++) {
      mat4.makeTranslation(pts[i].x, pts[i].y, pts[i].z)
      mesh.setMatrixAt(i, mat4)
    }
    mesh.instanceMatrix.needsUpdate = true
    group.add(mesh)
  }

  return group
}

function createCurveLine(
  points: Vector3[],
  color: string,
  dashed: boolean,
  geometriesOut: BufferGeometry[],
  materialsOut: (LineBasicMaterial | LineDashedMaterial)[],
): Line {
  const geometry = new BufferGeometry().setFromPoints(points)
  geometriesOut.push(geometry)
  const material = dashed
    ? new LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.09 })
    : new LineBasicMaterial({ color })
  materialsOut.push(material)
  const line = new Line(geometry, material)
  if (dashed) line.computeLineDistances()
  return line
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

const F1_VOXELS = buildF1Voxels()
const TURBINE_TOWER = buildTurbineTower()
const TURBINE_BLADE = buildSingleBlade()
const PCB_VOXELS = buildPCBVoxels()

function VoxelCanvas({
  mode,
  wireframe,
  cameraPos,
  showRing,
  onCycle,
}: {
  mode: SceneMode
  wireframe: boolean
  cameraPos: [number, number, number]
  showRing: boolean
  onCycle?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const wireframeRef = useRef(wireframe)
  wireframeRef.current = wireframe

  const applyWireframeRef = useRef<((wf: boolean) => void) | null>(null)
  const renderOnceRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new Scene()
    const camera = new PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2])
    camera.lookAt(0, 0, 0)

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(PIXEL_DPR)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.imageRendering = 'pixelated'
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    // Lighting matching the original scene
    const ambient = new AmbientLight('#ffffff', 1.18)
    const dirMain = new DirectionalLight('#ffffff', 2.2)
    dirMain.position.set(4, 6, 5)
    const dirCyan = new DirectionalLight('#00f0ff', 0.9)
    dirCyan.position.set(-5, -2, -3)
    const dirRed = new DirectionalLight('#ff2a54', 0.5)
    dirRed.position.set(0, -4, 2)
    scene.add(ambient, dirMain, dirCyan, dirRed)

    const geometries: BufferGeometry[] = []
    const voxelMaterials: MeshStandardMaterial[] = []
    const lineMaterials: (LineBasicMaterial | LineDashedMaterial)[] = []

    const rig = new Group()
    const floatGroup = new Group()
    rig.add(floatGroup)
    scene.add(rig)

    let modelGroup = new Group()
    let rotorGroup: Group | null = null

    if (mode === 'f1') {
      modelGroup.rotation.set(0.18, -0.65, 0)
      modelGroup.add(buildVoxelGroup(F1_VOXELS, 0.145, wireframeRef.current, voxelMaterials, geometries))

      const aeroTop = new CatmullRomCurve3([
        new Vector3(-2.3, -0.1, 0),
        new Vector3(-1.2, 0.25, 0),
        new Vector3(0.1, 0.58, 0),
        new Vector3(1.4, 0.72, 0),
        new Vector3(2.3, 0.9, 0),
      ]).getPoints(32)
      const aeroLeft = new CatmullRomCurve3([
        new Vector3(-2.2, -0.15, 0.85),
        new Vector3(-0.7, 0.08, 0.95),
        new Vector3(0.8, 0.18, 0.75),
        new Vector3(2.1, 0.55, 0.65),
      ]).getPoints(28)
      const aeroRight = new CatmullRomCurve3([
        new Vector3(-2.2, -0.15, -0.85),
        new Vector3(-0.7, 0.08, -0.95),
        new Vector3(0.8, 0.18, -0.75),
        new Vector3(2.1, 0.55, -0.65),
      ]).getPoints(28)

      modelGroup.add(
        createCurveLine(aeroTop, '#00f0ff', true, geometries, lineMaterials),
        createCurveLine(aeroLeft, '#ff2a54', false, geometries, lineMaterials),
        createCurveLine(aeroRight, '#ff2a54', false, geometries, lineMaterials),
      )
    } else if (mode === 'turbine') {
      modelGroup.position.set(0, -0.2, 0)
      modelGroup.rotation.set(0.1, -0.6, 0)
      modelGroup.add(buildVoxelGroup(TURBINE_TOWER, 0.14, wireframeRef.current, voxelMaterials, geometries))

      rotorGroup = new Group()
      rotorGroup.position.set(-0.42, 0.98, 0)
      for (const ang of [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3]) {
        const arm = new Group()
        arm.rotation.set(ang, 0, 0)
        arm.add(buildVoxelGroup(TURBINE_BLADE, 0.13, wireframeRef.current, voxelMaterials, geometries))
        rotorGroup.add(arm)
      }
      modelGroup.add(rotorGroup)
    } else {
      modelGroup.rotation.set(0.45, 0.5, 0)
      modelGroup.add(buildVoxelGroup(PCB_VOXELS, 0.15, wireframeRef.current, voxelMaterials, geometries))
    }

    floatGroup.add(modelGroup)

    let ringGroup: Group | null = null
    if (showRing) {
      ringGroup = new Group()
      const pts: Vector3[] = []
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        pts.push(new Vector3(Math.cos(a) * 2.35, -1.25, Math.sin(a) * 2.35))
      }
      ringGroup.add(createCurveLine(pts, '#1e293b', true, geometries, lineMaterials))
      rig.add(ringGroup)
    }

    // Wireframe updater without rebuilding scene
    applyWireframeRef.current = (wf: boolean) => {
      modelGroup.traverse((obj: Object3D) => {
        if ((obj as InstancedMesh).isInstancedMesh) {
          const mesh = obj as InstancedMesh
          const mat = mesh.material as MeshStandardMaterial
          mat.wireframe = wf
          mat.color.set(wf ? '#f43f5e' : (mesh.userData.baseColor as string))
          mat.needsUpdate = true
        }
      })
    }

    // Pointer parallax state
    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      }
    }
    container.addEventListener('pointermove', onPointerMove, { passive: true })

    // Sizing
    const updateSize = () => {
      const w = Math.max(1, container.clientWidth)
      const h = Math.max(1, container.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      renderer.render(scene, camera)
    }
    updateSize()

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSize) : null
    ro?.observe(container)

    const hasIO = typeof IntersectionObserver !== 'undefined'
    let inView = !hasIO
    let reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId = 0
    let lastTime = performance.now()
    let elapsed = 0

    const renderOnce = () => {
      renderer.render(scene, camera)
    }
    renderOnceRef.current = renderOnce

    const tick = (now: number) => {
      rafId = 0
      if (!inView || reducedMotion) return

      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      elapsed += dt

      // Model rotation & float
      if (mode === 'f1') {
        modelGroup.rotation.y += dt * 0.45
        modelGroup.position.y = Math.sin(elapsed * 2) * 0.08
      } else if (mode === 'turbine') {
        modelGroup.rotation.y += dt * 0.35
        if (rotorGroup) rotorGroup.rotation.x += dt * 2.2
      } else {
        modelGroup.rotation.y += dt * 0.45
      }

      floatGroup.position.y = Math.sin(elapsed * 1.8) * 0.05
      if (ringGroup) ringGroup.rotation.y -= dt * 0.25

      rig.rotation.y = MathUtils.lerp(rig.rotation.y, pointer.x * 0.4, 0.06)
      rig.rotation.x = MathUtils.lerp(rig.rotation.x, -pointer.y * 0.22, 0.06)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (rafId === 0 && inView && !reducedMotion) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    // Render initial static frame immediately
    renderOnce()

    // IntersectionObserver starts continuous animation only when visible; fallback starts immediately if IO is unsupported
    const io = hasIO
      ? new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting
            if (inView) {
              renderOnce()
              startLoop()
            } else {
              stopLoop()
            }
          },
          { rootMargin: '60px 0px', threshold: 0.01 },
        )
      : null

    if (io) {
      io.observe(container)
    } else {
      startLoop()
    }

    const mq =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches
      if (reducedMotion) {
        stopLoop()
        renderOnce()
      } else {
        startLoop()
      }
    }
    mq?.addEventListener('change', onMotionChange)

    return () => {
      stopLoop()
      io?.disconnect()
      ro?.disconnect()
      mq?.removeEventListener('change', onMotionChange)
      container.removeEventListener('pointermove', onPointerMove)
      geometries.forEach((g) => g.dispose())
      voxelMaterials.forEach((m) => m.dispose())
      lineMaterials.forEach((m) => m.dispose())
      renderer.dispose()
    }
  }, [mode, cameraPos[0], cameraPos[1], cameraPos[2], showRing])

  useEffect(() => {
    applyWireframeRef.current?.(wireframe)
    renderOnceRef.current?.()
  }, [wireframe])

  return (
    <div
      ref={containerRef}
      onClick={onCycle}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      role={onCycle ? 'button' : 'img'}
      tabIndex={onCycle ? 0 : undefined}
      aria-label={
        onCycle
          ? `Interactive 3D ${mode.toUpperCase()} model. Click or press Enter to cycle models.`
          : `3D ${mode.toUpperCase()} model preview`
      }
      onKeyDown={
        onCycle
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onCycle()
              }
            }
          : undefined
      }
      style={{
        width: '100%',
        height: '100%',
        cursor: onCycle ? (hovered ? 'pointer' : 'grab') : 'default',
        outlineOffset: -2,
      }}
    />
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
  return (
    <VoxelCanvas
      mode={mode}
      wireframe={wireframe}
      cameraPos={[0, 1.1, 5.4]}
      showRing
      onCycle={onCycle}
    />
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
    <VoxelCanvas
      mode={mode}
      wireframe={wireframe}
      cameraPos={[0, 0.35, 6.1]}
      showRing={false}
    />
  )
}
