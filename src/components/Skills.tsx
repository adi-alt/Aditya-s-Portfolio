import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { skills } from '../data'
import { CHIP_ICON, F1_ICON, PCB_ICON, PixelArt, SERVER_ICON, SIGNAL_ICON, TURBINE_ICON } from './Sprites'
import { SectionTitle } from './UI'

const CATEGORY_ICONS = [CHIP_ICON, SIGNAL_ICON, SERVER_ICON, TURBINE_ICON, F1_ICON, PCB_ICON]

// Layout coordinates & independent float-bob rhythms for the 6 floating windows on the desktop 3D stage
const WINDOW_LAYOUTS: {
  posClass: string
  depth: number
  float: { x: number; y: number; dur: number; delay: number }
}[] = [
  { posClass: 'win-pos-0', depth: 0.9, float: { x: 3, y: 10, dur: 8.5, delay: 0 } },
  { posClass: 'win-pos-1', depth: 0.55, float: { x: 5, y: 13, dur: 10, delay: 1.8 } },
  { posClass: 'win-pos-2', depth: 1.15, float: { x: 4, y: 11, dur: 9.2, delay: 3.4 } },
  { posClass: 'win-pos-3', depth: 0.75, float: { x: 4, y: 14, dur: 10.8, delay: 0.9 } },
  { posClass: 'win-pos-4', depth: 0.5, float: { x: 3, y: 10, dur: 9.6, delay: 2.6 } },
  { posClass: 'win-pos-5', depth: 1.05, float: { x: 5, y: 12, dur: 10.2, delay: 4.2 } },
]

function MiniSkillWindow({
  title,
  count,
  active,
  float,
  onEnter,
  onLeave,
  children,
}: {
  title: string
  count: number
  active: boolean
  float: { x: number; y: number; dur: number; delay: number }
  onEnter: () => void
  onLeave: () => void
  children: ReactNode
}) {
  const style = {
    '--float-x': `${float.x}px`,
    '--float-y': `${float.y}px`,
    '--float-dur': `${float.dur}s`,
    '--float-delay': `-${float.delay}s`,
  } as CSSProperties

  return (
    <div
      className="float-bob"
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`mini-win ${active ? 'is-active' : ''}`}>
        <div className="mini-win-bar mono">
          <span aria-hidden className="mini-win-dots">
            <span style={{ background: '#E11D48' }} />
            <span style={{ background: '#3F3F46' }} />
            <span style={{ background: '#27272A' }} />
          </span>
          <span className="mini-win-title">{title}</span>
          <span className="mini-win-count">{count}</span>
        </div>
        <div className="mini-win-body">{children}</div>
      </div>
    </div>
  )
}

function FloatingLayer({
  px,
  py,
  depth,
  order,
  rich,
  active,
  className,
  children,
}: {
  px: MotionValue<number>
  py: MotionValue<number>
  depth: number
  order: number
  rich: boolean
  active: boolean
  className: string
  children: ReactNode
}) {
  const x = useTransform(px, (v) => v * depth * 22)
  const y = useTransform(py, (v) => v * depth * 15)

  if (!rich) {
    return <div className={`win-layer ${className} ${active ? 'layer-active' : ''}`}>{children}</div>
  }

  return (
    <motion.div
      className={`win-layer ${className} ${active ? 'layer-active' : ''}`}
      style={{ x, y }}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: 0.07 * order, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Skills() {
  const [active, setActive] = useState<number | null>(null)
  const [rich, setRich] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(min-width: 1060px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setRich(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.6 })
  const rotateY = useTransform(sx, (v) => v * 4.5)
  const rotateX = useTransform(sy, (v) => v * -3.5)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle world="04" subtitle="Interactive floating modules · Point at any domain to inspect">
          Technical Stack
        </SectionTitle>

        <div className="stack-showcase-grid">
          {/* Left Column: Interactive Domain Selector List (like FeatureShowcase in Apex F1 Hub / Nexus) */}
          <div className="stack-selector-col" onMouseLeave={() => setActive(null)}>
            <ul className="stack-feature-list">
              {skills.map((g, gi) => {
                const isActive = active === gi
                return (
                  <li key={g.group}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(gi)}
                      onFocus={() => setActive(gi)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive((cur) => (cur === gi ? null : gi))}
                      aria-pressed={isActive}
                      className={`stack-feature-btn ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="stack-feature-icon">
                        <PixelArt map={CATEGORY_ICONS[gi % CATEGORY_ICONS.length]} size={2} />
                      </span>
                      <span className="stack-feature-copy">
                        <span className="stack-feature-head">
                          <span className="stack-feature-title">{g.group}</span>
                          <span className="mono stack-feature-badge">{g.items.length} tools</span>
                        </span>
                        <span className="stack-feature-note">{g.note}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right Column: Floating MiniWindows Stage with 3D Pointer Tilt & Independent Bobbing */}
          <motion.div
            onPointerMove={rich ? onMove : undefined}
            onPointerLeave={
              rich
                ? () => {
                    px.set(0)
                    py.set(0)
                  }
                : undefined
            }
            style={rich ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
            className="stack-windows-stage"
          >
            {skills.map((g, gi) => {
              const layout = WINDOW_LAYOUTS[gi % WINDOW_LAYOUTS.length]
              const isActive = active === gi
              return (
                <FloatingLayer
                  key={g.group}
                  px={sx}
                  py={sy}
                  depth={layout.depth}
                  order={gi}
                  rich={rich}
                  active={isActive}
                  className={layout.posClass}
                >
                  <MiniSkillWindow
                    title={g.group}
                    count={g.items.length}
                    active={isActive}
                    float={layout.float}
                    onEnter={() => setActive(gi)}
                    onLeave={() => setActive(null)}
                  >
                    <div className="skill-modules">
                      {g.items.map((s) => (
                        <span key={s} className="skill-mod mono">
                          <span className="skill-pin" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </MiniSkillWindow>
                </FloatingLayer>
              )
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float-bob {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          35% {
            transform: translate3d(calc(var(--float-x, 4px) * -1), calc(var(--float-y, 12px) * -1), 0);
          }
          70% {
            transform: translate3d(var(--float-x, 4px), calc(var(--float-y, 12px) * 0.4), 0);
          }
        }

        .stack-showcase-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: 36px;
          align-items: center;
        }
        .stack-selector-col {
          min-width: 0;
        }
        .stack-feature-list {
          list-style: none;
          display: grid;
          gap: 6px;
        }
        .stack-feature-btn {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 13px 16px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
        }
        .stack-feature-btn:hover,
        .stack-feature-btn.is-active {
          background: #151519;
          border-color: #27272A;
        }
        .stack-feature-btn.is-active {
          border-color: #E11D48;
          box-shadow: inset 3px 0 0 #E11D48;
        }
        .stack-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 6px;
          background: #0B0B0D;
          border: 1px solid #27272A;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .stack-feature-copy {
          min-width: 0;
          flex: 1;
          display: block;
        }
        .stack-feature-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .stack-feature-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: #F4F4F5;
        }
        .stack-feature-badge {
          font-size: 10.5px;
          color: #A1A1AA;
          background: #0B0B0D;
          border: 1px solid #27272A;
          padding: 2px 8px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .stack-feature-btn.is-active .stack-feature-badge {
          color: #F4F4F5;
          border-color: #E11D48;
          background: rgba(225, 29, 72, 0.12);
        }
        .stack-feature-note {
          display: block;
          font-size: 13px;
          color: #A1A1AA;
          margin-top: 3px;
          line-height: 1.45;
        }

        /* Floating MiniWindow Card */
        .mini-win {
          background: rgba(21, 21, 25, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid #27272A;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 18px 42px -12px rgba(0, 0, 0, 0.65);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .mini-win.is-active {
          transform: scale(1.035);
          border-color: #E11D48;
          box-shadow: 0 24px 60px -18px rgba(225, 29, 72, 0.42), 0 18px 42px -12px rgba(0, 0, 0, 0.75);
        }
        .mini-win-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #0B0B0D;
          border-bottom: 1px solid #27272A;
          font-size: 11px;
        }
        .mini-win-dots {
          display: flex;
          gap: 5px;
          flex-shrink: 0;
        }
        .mini-win-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }
        .mini-win-title {
          color: #F4F4F5;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
        .mini-win-count {
          color: #A1A1AA;
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 4px;
          background: #151519;
          border: 1px solid #27272A;
        }
        .mini-win-body {
          padding: 12px 14px;
        }
        .skill-modules {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-mod {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 28px;
          min-height: 28px;
          padding: 0 10px;
          border-radius: 5px;
          background: #0B0B0D;
          border: 1px solid #27272A;
          color: #F4F4F5;
          font-size: 11px;
        }
        .skill-pin {
          width: 4.5px;
          height: 4.5px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
          flex-shrink: 0;
        }

        /* Desktop Floating Stage vs Mobile/Tablet Grid */
        .stack-windows-stage {
          position: relative;
          min-width: 0;
        }
        @media (min-width: 1060px) {
          .stack-windows-stage {
            height: 610px;
          }
          .float-bob {
            animation: float-bob var(--float-dur, 9s) ease-in-out var(--float-delay, 0s) infinite;
            will-change: transform;
          }
          .win-layer {
            position: absolute;
            transition: z-index 0s;
          }
          .win-layer.layer-active {
            z-index: 40 !important;
          }
          /* Programming (5 items) — Top Left */
          .win-pos-0 {
            top: 8px;
            left: 0;
            width: 46%;
            z-index: 22;
          }
          /* Data Analytics & Visualization (10 items) — Top Right */
          .win-pos-1 {
            top: 0;
            right: 0;
            width: 56%;
            z-index: 16;
          }
          /* Data Engineering & Databases (5 items) — Mid Left */
          .win-pos-2 {
            top: 178px;
            left: 3%;
            width: 48%;
            z-index: 26;
          }
          /* Machine Learning & AI (10 items) — Mid Right */
          .win-pos-3 {
            top: 214px;
            right: 0;
            width: 55%;
            z-index: 24;
          }
          /* Web Development & DevOps (9 items) — Bottom Left */
          .win-pos-4 {
            bottom: 6px;
            left: 0;
            width: 54%;
            z-index: 18;
          }
          /* CAD & PCB Automation (3 items) — Bottom Right */
          .win-pos-5 {
            bottom: 14px;
            right: 2%;
            width: 45%;
            z-index: 28;
          }
        }

        @media (max-width: 1059px) {
          .stack-showcase-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .stack-feature-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .stack-windows-stage {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            align-items: start;
          }
        }

        @media (max-width: 640px) {
          .stack-feature-list {
            grid-template-columns: 1fr;
          }
          .stack-windows-stage {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
