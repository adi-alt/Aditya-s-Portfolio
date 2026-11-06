import { animate, AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data'
import { useGame } from './Game'
import { F1_ICON, PixelArt, TURBINE_ICON } from './Sprites'
import { SectionTitle } from './UI'

type Project = (typeof projects)[number]

function AnimatedNumber({ from, to, decimals = 3 }: { from: number; to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(from, to, {
      duration: 1.4,
      delay: 0.3,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => c.stop()
  }, [inView, from, to, decimals])
  return <span ref={ref}>{from.toFixed(decimals)}</span>
}

function TelemetryBenchmark({ p, isF1 }: { p: Project; isF1: boolean }) {
  const { wireframe } = useGame()
  const [inspectSkeleton, setInspectSkeleton] = useState(false)
  const ratio = p.metric.to / p.metric.from
  const improvement = ((1 - ratio) * 100).toFixed(1)
  const showSkeleton = inspectSkeleton || wireframe

  return (
    <div className="benchmark-panel">
      <div
        className="mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: '#a1a1aa',
          marginBottom: 12,
        }}
      >
        <span>{p.metric.label}</span>
        <button
          type="button"
          onClick={() => setInspectSkeleton((s) => !s)}
          className="tech-btn mono"
          style={{
            color: showSkeleton ? '#fcd34d' : '#a1a1aa',
            fontSize: 11.5,
          }}
        >
          {showSkeleton ? 'Show Curve' : 'Skeleton View'}
        </button>
      </div>

      {showSkeleton ? (
        <div style={{ display: 'grid', gap: 10, padding: '6px 0' }} aria-label="Telemetry skeleton structure">
          <div className="skeleton" style={{ height: 14, width: '55%' }} />
          <div className="skeleton" style={{ height: 76, width: '100%' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div className="skeleton" style={{ height: 24 }} />
            <div className="skeleton" style={{ height: 24 }} />
          </div>
        </div>
      ) : (
        <div>
          <svg
            viewBox="0 0 280 76"
            style={{
              width: '100%',
              height: 76,
              background: '#0d0d11',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'block',
            }}
          >
            <line x1="0" y1="25" x2="280" y2="25" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="0" y1="50" x2="280" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {/* Baseline curve */}
            <path
              d={
                isF1
                  ? 'M 10 24 C 65 14, 105 36, 155 20 C 205 10, 240 32, 270 18'
                  : 'M 10 28 C 65 12, 115 38, 170 18 C 215 10, 245 32, 270 22'
              }
              fill="none"
              stroke="#71717a"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Production model curve */}
            <motion.path
              d={
                isF1
                  ? 'M 10 56 C 65 46, 105 62, 155 50 C 205 42, 240 58, 270 48'
                  : 'M 10 58 C 65 44, 115 64, 170 48 C 215 42, 245 56, 270 50'
              }
              fill="none"
              stroke={isF1 ? '#f43f5e' : '#10b981'}
              strokeWidth="2.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          </svg>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#71717a' }}>{p.metric.base}</div>
              <div className="mono" style={{ fontSize: 15, color: '#a1a1aa', fontWeight: 600, marginTop: 2 }}>
                {p.metric.from}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#71717a' }}>My Model</div>
              <div className="mono" style={{ fontSize: 15, color: '#f4f4f6', fontWeight: 700, marginTop: 2 }}>
                <AnimatedNumber from={p.metric.from} to={p.metric.to} decimals={p.metric.to < 1 ? 4 : 3} />
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#71717a' }}>Error Reduction</div>
              <div className="mono" style={{ fontSize: 15, color: '#10b981', fontWeight: 700, marginTop: 2 }}>
                −{improvement}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectShowcase({ p, i }: { p: Project; i: number }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const isF1 = i === 0
  const activeImg = p.images[imgIdx] ?? p.images[0]

  return (
    <motion.article
      className="tech-card project-showcase"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 130, damping: 22 }}
    >
      {/* Top Bar */}
      <div className="project-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PixelArt map={isF1 ? F1_ICON : TURBINE_ICON} size={2} />
          <div>
            <h3 className="project-name">{p.name}</h3>
            <div style={{ fontSize: 13, color: '#a1a1aa' }}>{p.subtitle}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span className="chip">{p.period}</span>
          <a href={p.url} target="_blank" rel="noreferrer" className="tech-btn primary">
            {p.linkLabel} ↗
          </a>
        </div>
      </div>

      {/* Main Two-Column Case Study Layout: Real Project Visuals Left, Engineering Narrative Right */}
      <div className="project-main-grid">
        {/* Left: Real Project Photography / Screenshot Gallery */}
        <div className="project-gallery">
          <div className="browser-frame">
            <div className="browser-chrome">
              <div className="browser-dots">
                <span style={{ background: '#ef4444' }} />
                <span style={{ background: '#f59e0b' }} />
                <span style={{ background: '#10b981' }} />
              </div>
              <div className="browser-url mono">
                {isF1 ? 'https://www.apexf1hub.com' : 'github.com/adi-alt/Short-Term-Wind-Power-Forecasting'}
              </div>
            </div>

            <div className="browser-viewport">
              {!imgLoaded && (
                <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />
              )}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg.src}
                  src={activeImg.src}
                  alt={activeImg.caption}
                  onLoad={() => setImgLoaded(true)}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="project-photo"
                  style={{
                    background: activeImg.src.includes('wind-') && !activeImg.src.includes('repo') ? '#ffffff' : '#0a0a0c',
                    objectFit: activeImg.src.includes('wind-rose') ? 'contain' : 'cover',
                  }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Caption + Image Switcher Pills */}
          <div className="gallery-controls">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.images.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImgIdx(idx)}
                  className={`gallery-tab mono ${idx === imgIdx ? 'active' : ''}`}
                >
                  0{idx + 1} · {img.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#71717a', marginTop: 8 }}>{activeImg.caption}</p>
          </div>

          <TelemetryBenchmark p={p} isF1={isF1} />
        </div>

        {/* Right: First-Person Engineering Story & Deep-Dive Decisions */}
        <div className="project-narrative">
          <div className="mono" style={{ fontSize: 11, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Why & How I Built It
          </div>
          <p style={{ fontSize: 16.5, color: '#e4e4e7', lineHeight: 1.7, marginBottom: 24 }}>
            {p.story}
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            {p.engineeringHighlights.map((h) => (
              <div key={h.title} className="highlight-item">
                <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f6', marginBottom: 4 }}>
                  {h.title}
                </div>
                <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.65 }}>
                  {h.detail}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            {p.stack.map((s) => (
              <span key={s} className="mono stack-pill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle
          world="02"
          subtitle="Real screenshots, architecture decisions, and quantitative benchmarks"
        >
          Selected Engineering Work
        </SectionTitle>

        <div style={{ display: 'grid', gap: 44 }}>
          {projects.map((p, i) => (
            <ProjectShowcase key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        .project-showcase {
          overflow: hidden;
        }
        .project-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 22px 28px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.015);
          flex-wrap: wrap;
        }
        .project-name {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.4vw, 28px);
          font-weight: 700;
          color: #f4f4f6;
          letter-spacing: -0.02em;
        }
        .project-main-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 32px;
          padding: 28px;
          align-items: start;
        }
        .browser-frame {
          border-radius: 8px;
          border: 1px solid var(--border-bright);
          overflow: hidden;
          background: #0a0a0c;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
        }
        .browser-chrome {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 14px;
          background: #141419;
          border-bottom: 1px solid var(--border);
        }
        .browser-dots {
          display: flex;
          gap: 6px;
        }
        .browser-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.8;
        }
        .browser-url {
          font-size: 11px;
          color: #71717a;
          background: rgba(0, 0, 0, 0.35);
          padding: 3px 10px;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .browser-viewport {
          position: relative;
          aspect-ratio: 16 / 10;
          width: 100%;
          overflow: hidden;
          background: #0d0d11;
        }
        .project-photo {
          width: 100%;
          height: 100%;
          object-position: top center;
          display: block;
        }
        .gallery-controls {
          margin: 14px 0 18px;
        }
        .gallery-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--ctrl-h);
          min-height: var(--ctrl-h);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          color: #a1a1aa;
          padding: 0 14px;
          border-radius: var(--ctrl-r);
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .gallery-tab:hover {
          color: #f4f4f6;
          border-color: var(--border-bright);
        }
        .gallery-tab.active {
          background: rgba(225, 29, 72, 0.14);
          border-color: rgba(244, 63, 94, 0.5);
          color: #fda4af;
          font-weight: 600;
        }
        .benchmark-panel {
          background: #101014;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
        }
        .highlight-item {
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent-bright);
          border-radius: 6px;
        }
        .stack-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--ctrl-h);
          min-height: var(--ctrl-h);
          font-size: 11.5px;
          padding: 0 14px;
          border-radius: var(--ctrl-r);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-bright);
          color: #d4d4d8;
        }
        @media (max-width: 1020px) {
          .project-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
