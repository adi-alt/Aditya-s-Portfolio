import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { leadership, publication } from '../data'
import { useGame } from './Game'
import { PCB_ICON, PixelArt, SERVER_ICON, TURBINE_ICON } from './Sprites'
import { Reveal, SectionTitle } from './UI'

const MiniVoxel = lazy(() => import('./Scene3D').then((m) => ({ default: m.MiniVoxel })))

const LEAD_ICONS = [SERVER_ICON, PCB_ICON, TURBINE_ICON]

export default function Bonus() {
  const { wireframe } = useGame()

  return (
    <section id="bonus" className="section">
      <div className="container">
        <SectionTitle world="05" subtitle="Peer-reviewed conference paper & campus leadership">
          Research & Leadership
        </SectionTitle>

        {/* Peer-Reviewed Publication with Live 3D Voxel Wind Turbine Preview */}
        <Reveal className="tech-card pub-card">
          <div className="pub-3d">
            <Suspense fallback={<div className="skeleton" style={{ width: '100%', height: '100%' }} />}>
              <MiniVoxel mode="turbine" wireframe={wireframe} />
            </Suspense>
            <span
              className="mono"
              style={{
                position: 'absolute',
                bottom: 10,
                left: 12,
                fontSize: 10,
                color: '#a1a1aa',
                background: 'rgba(10,10,12,0.85)',
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid var(--border)',
              }}
            >
              3D Wind Turbine Model
            </span>
          </div>

          <div style={{ padding: '4px 0' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <span className="chip amber">Peer-Reviewed Paper · AIP Publishing</span>
              <span className="chip">Vol. 3297 · Article 090030 (2025)</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 700,
                color: '#f4f4f6',
                lineHeight: 1.35,
              }}
            >
              “{publication.title}”
            </h3>

            <div className="mono" style={{ fontSize: 13, color: '#fda4af', marginTop: 8 }}>
              {publication.authors}
            </div>
            <div style={{ fontSize: 13.5, color: '#71717a', marginTop: 2 }}>
              {publication.venue}
            </div>

            <p style={{ fontSize: 15, color: '#a1a1aa', lineHeight: 1.7, margin: '14px 0 22px' }}>
              {publication.summary}
            </p>

            <a href={publication.url} target="_blank" rel="noreferrer" className="tech-btn primary">
              Read paper on AIP Publishing ↗
            </a>
          </div>
        </Reveal>

        <div className="lead-grid" style={{ marginTop: 28 }}>
          {leadership.map((item, i) => (
            <motion.article
              key={item.title}
              className="tech-card lead-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: i * 0.06 }}
            >
              <div className="lead-top mono">
                <PixelArt map={LEAD_ICONS[i % LEAD_ICONS.length]} size={2} />
                <span style={{ color: '#a1a1aa', fontSize: 11 }}>{item.org}</span>
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#f4f4f6',
                  margin: '14px 0 8px',
                }}
              >
                {item.title}
              </h4>
              <p style={{ fontSize: 14.5, color: '#a1a1aa', lineHeight: 1.65 }}>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .pub-card {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 32px;
          align-items: center;
          padding: 28px;
        }
        .pub-3d {
          position: relative;
          height: 240px;
          border-radius: 8px;
          background: radial-gradient(circle, rgba(225, 29, 72, 0.08) 0%, #0d0d11 75%);
          border: 1px solid var(--border);
        }
        .lead-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .lead-card {
          padding: 24px;
        }
        .lead-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 920px) {
          .pub-card {
            grid-template-columns: 1fr;
          }
          .lead-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
