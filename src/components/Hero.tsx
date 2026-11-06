import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { profile } from '../data'
import { CurvedBadge } from './Curves'
import { useGame } from './Game'
import { SceneSkeleton } from './Loader'
import type { SceneMode } from './Scene3D'
import { F1_ICON, PCB_ICON, PixelArt, TURBINE_ICON } from './Sprites'

const HeroScene = lazy(() => import('./Scene3D'))

const MODEL_TABS: { id: SceneMode; label: string; metric: string; sub: string; icon: string[] }[] = [
  {
    id: 'f1',
    label: 'Apex F1 Telemetry',
    metric: 'Pole MAE 3.595 → 2.872 (−20%)',
    sub: '175-round backtest · Next.js + Supabase + FastF1',
    icon: F1_ICON,
  },
  {
    id: 'turbine',
    label: 'Wind Power Forecast',
    metric: 'Test MSE 0.1309 (−9.7% vs LSTM)',
    sub: '52,560 hourly records · Published in AIP Proceedings',
    icon: TURBINE_ICON,
  },
  {
    id: 'pcb',
    label: 'Code-Driven PCB & CAD',
    metric: '183 Automated Designs',
    sub: 'Generated in Python · SKiDL + build123d + KiCad',
    icon: PCB_ICON,
  },
]

export default function Hero() {
  const { mode, setMode, wireframe, toggleWireframe, ping } = useGame()
  const activeTab = MODEL_TABS.find((t) => t.id === mode) ?? MODEL_TABS[0]

  const cycleModel = () => {
    const idx = MODEL_TABS.findIndex((t) => t.id === mode)
    const next = MODEL_TABS[(idx + 1) % MODEL_TABS.length]
    setMode(next.id)
    ping(512)
  }

  return (
    <section id="top" className="hero-section">
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '6%',
          right: '6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(225, 29, 72, 0.11) 0%, rgba(245, 158, 11, 0.04) 45%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container hero-grid">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}
          >
            <span className="chip emerald">
              <span className="live-dot" />
              <span className="avail-full">{profile.availability}</span>
              <span className="avail-short">Werkstudent / Internship · 20h/wk</span>
            </span>
            <span className="chip">Aachen, Germany</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="hero-title"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="hero-headline"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            style={{
              fontSize: 16.5,
              color: '#a1a1aa',
              maxWidth: 560,
              lineHeight: 1.75,
              marginTop: 16,
            }}
          >
            M.Sc. student in <strong style={{ color: '#f4f4f6' }}>Data Analytics & Decision Science</strong> at{' '}
            <strong style={{ color: '#f4f4f6' }}>RWTH Aachen</strong> with 2+ years of industry experience across AI
            evaluation, automated ETL pipelines, and full-stack analytics, backed by an electrical engineering degree
            and published deep-learning research.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
            style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}
          >
            <a href="#projects" className="tech-btn primary">
              Explore selected work ↓
            </a>
            <a href="https://www.apexf1hub.com/" target="_blank" rel="noopener noreferrer" className="tech-btn">
              Visit apexf1hub.com ↗
            </a>
            <a href="#contact" className="tech-btn">
              Contact & Details
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="tech-card viewport-card"
        >
          <div className="viewport-header mono">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#e11d48',
                  display: 'inline-block',
                }}
              />
              <span style={{ color: '#e4e4e7', fontWeight: 500 }}>
                Interactive 3D Model · {activeTab.label}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleWireframe}
              aria-pressed={wireframe}
              className="tech-btn mono"
              style={{
                background: wireframe ? 'rgba(245, 158, 11, 0.16)' : 'rgba(255,255,255,0.05)',
                color: wireframe ? '#fcd34d' : '#a1a1aa',
                fontSize: 11.5,
              }}
            >
              {wireframe ? 'Solid View' : 'Wireframe'}
            </button>
          </div>

          <div className="viewport-stage">
            <Suspense fallback={<SceneSkeleton />}>
              <HeroScene mode={mode} wireframe={wireframe} onCycle={cycleModel} />
            </Suspense>

            <div className="viewport-seal">
              <CurvedBadge size={102} />
            </div>

            <div className="viewport-readout mono">
              <div style={{ color: '#f4f4f6', fontWeight: 600 }}>{activeTab.metric}</div>
              <div style={{ color: '#a1a1aa', fontSize: 10.5, marginTop: 2 }}>{activeTab.sub}</div>
            </div>
          </div>

          <div className="viewport-tabs">
            {MODEL_TABS.map((t) => {
              const active = t.id === mode
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setMode(t.id)
                    ping(256)
                  }}
                  className={`viewport-tab mono ${active ? 'active' : ''}`}
                >
                  <PixelArt map={t.icon} size={2} />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: 112px;
          padding-bottom: 48px;
          scroll-margin-top: 90px;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.95fr;
          align-items: center;
          gap: 44px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 5.6vw, 68px);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: #f4f4f6;
        }
        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(18px, 2.1vw, 24px);
          font-weight: 500;
          color: #d4d4d8;
          line-height: 1.38;
          margin-top: 12px;
          max-width: 560px;
          letter-spacing: -0.015em;
        }
        .viewport-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }
        .viewport-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 11.5px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.015);
          flex-wrap: wrap;
        }
        .viewport-stage {
          position: relative;
          height: 360px;
          background:
            radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.08), transparent 70%),
            #0c0c10;
        }
        .viewport-seal {
          position: absolute;
          top: 12px;
          right: 12px;
          pointer-events: none;
        }
        .viewport-readout {
          position: absolute;
          left: 14px;
          right: 14px;
          max-width: fit-content;
          bottom: 14px;
          background: rgba(16, 16, 20, 0.9);
          border: 1px solid var(--border-bright);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 11.5px;
          pointer-events: none;
        }
        .viewport-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border);
          background: #101014;
        }
        .viewport-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 8px;
          background: transparent;
          color: #a1a1aa;
          border: none;
          border-right: 1px solid var(--border);
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .viewport-tab:last-child {
          border-right: none;
        }
        .viewport-tab:hover {
          color: #f4f4f6;
          background: rgba(255, 255, 255, 0.03);
        }
        .viewport-tab.active {
          color: #f4f4f6;
          background: rgba(225, 29, 72, 0.12);
          box-shadow: inset 0 -2px 0 #e11d48;
          font-weight: 600;
        }
        @media (max-width: 960px) {
          .hero-section {
            padding-top: 136px;
            padding-bottom: 40px;
            scroll-margin-top: 120px;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .viewport-stage {
            height: 310px;
          }
          .viewport-tabs {
            grid-template-columns: 1fr;
          }
          .viewport-tab {
            border-right: none;
            border-bottom: 1px solid var(--border);
            justify-content: flex-start;
            padding: 10px 14px;
          }
          .viewport-tab:last-child {
            border-bottom: none;
          }
        }
        .avail-short {
          display: none;
        }
        @media (max-width: 560px) {
          .avail-full {
            display: none;
          }
          .avail-short {
            display: inline;
          }
          .viewport-seal {
            transform: scale(0.76);
            transform-origin: top right;
          }
        }
      `}</style>
    </section>
  )
}
