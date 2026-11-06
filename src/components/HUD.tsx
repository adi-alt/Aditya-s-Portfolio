import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'
import { useGame } from './Game'
import { F1_ICON, PixelArt } from './Sprites'

export const NAV = [
  { id: 'about', label: 'Background' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'bonus', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

export default function HUD() {
  const { wireframe, toggleWireframe, ping } = useGame()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [solid, setSolid] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 24))

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: solid ? 'rgba(10, 10, 12, 0.92)' : 'rgba(10, 10, 12, 0.72)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
      }}
    >
      <div className="container hud-bar">
        <a href="#top" className="hud-brand">
          <PixelArt map={F1_ICON} size={2} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#f4f4f6', letterSpacing: '-0.01em' }}>
              Aditya Verma
            </div>
            <div className="mono hud-sub" style={{ fontSize: 10.5, color: '#71717a' }}>
              Aachen, DE · RWTH M.Sc.
            </div>
          </div>
        </a>

        <nav className="hud-nav" aria-label="Primary section navigation">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hud-link">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hud-actions">
          <button
            type="button"
            onClick={() => {
              toggleWireframe()
              ping(64)
            }}
            className={`wire-toggle mono ${wireframe ? 'is-on' : ''}`}
            aria-pressed={wireframe}
            title="Toggle 3D & chart skeleton wireframe inspection"
          >
            <span className="wire-label-full">{wireframe ? '● Skeleton Mode On' : '○ Skeleton Mode'}</span>
            <span className="wire-label-short">{wireframe ? '● Skeleton' : '○ Skeleton'}</span>
          </button>
          <a href="#contact" className="tech-btn primary hud-cta">
            Get in touch
          </a>
        </div>
      </div>

      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: '0 50%',
          height: 2,
          background: 'linear-gradient(90deg, #e11d48, #f59e0b, #10b981)',
        }}
      />

      <style>{`
        .hud-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 0;
          flex-wrap: wrap;
        }
        .hud-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .hud-nav {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hud-nav::-webkit-scrollbar {
          display: none;
        }
        .hud-link {
          display: inline-flex;
          align-items: center;
          height: var(--ctrl-h);
          font-size: 13px;
          color: #a1a1aa;
          padding: 0 11px;
          border-radius: var(--ctrl-r);
          white-space: nowrap;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .hud-link:hover {
          color: #f4f4f6;
          background: rgba(255, 255, 255, 0.05);
        }
        .hud-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .wire-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--ctrl-h);
          min-height: var(--ctrl-h);
          background: rgba(255, 255, 255, 0.04);
          color: #a1a1aa;
          border: 1px solid var(--border-bright);
          border-radius: var(--ctrl-r);
          padding: 0 12px;
          font-size: 11.5px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .wire-toggle:hover {
          color: #f4f4f6;
        }
        .wire-toggle.is-on {
          background: rgba(245, 158, 11, 0.15);
          border-color: #f59e0b;
          color: #fcd34d;
        }
        .wire-label-short {
          display: none;
        }
        @media (max-width: 960px) {
          .hud-bar {
            gap: 8px;
            padding: 10px 0 8px;
          }
          .hud-nav {
            order: 3;
            width: 100%;
            padding-top: 6px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }
          .hud-link {
            height: 32px;
            padding: 0 10px;
            font-size: 12.5px;
          }
        }
        @media (max-width: 520px) {
          .wire-label-full {
            display: none;
          }
          .wire-label-short {
            display: inline;
          }
          .wire-toggle {
            padding: 0 10px;
            font-size: 11px;
          }
          .hud-cta {
            padding: 0 10px;
            font-size: 12px;
          }
          .hud-sub {
            display: none;
          }
        }
        @media (max-width: 380px) {
          .hud-bar {
            gap: 6px;
          }
          .hud-brand {
            gap: 8px;
          }
          .hud-actions {
            gap: 6px;
          }
          .wire-toggle {
            padding: 0 8px;
            font-size: 10.5px;
          }
          .hud-cta {
            padding: 0 8px;
            font-size: 11px;
          }
        }
      `}</style>
    </motion.header>
  )
}
