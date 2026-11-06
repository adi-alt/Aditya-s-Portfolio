import { motion } from 'framer-motion'
import { counters, education, profile, stats } from '../data'
import { CHIP_ICON, PixelArt } from './Sprites'
import { Reveal, SectionTitle } from './UI'

function CompetencyRadar() {
  const cx = 130
  const cy = 130
  const rMax = 84
  const n = stats.length

  const points = stats.map((s, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
    const r = (s.value / 100) * rMax
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (rMax + 28),
      ly: cy + Math.sin(angle) * (rMax + 18),
      gx: cx + Math.cos(angle) * rMax,
      gy: cy + Math.sin(angle) * rMax,
      label: s.label,
      value: s.value,
    }
  })

  const polyPoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  return (
    <svg viewBox="0 0 260 260" style={{ width: '100%', maxWidth: 270, margin: '0 auto', display: 'block' }}>
      {[0.33, 0.66, 1].map((scale, idx) => (
        <polygon
          key={idx}
          points={stats
            .map((_, i) => {
              const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
              return `${(cx + Math.cos(a) * rMax * scale).toFixed(1)},${(cy + Math.sin(a) * rMax * scale).toFixed(1)}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray={idx < 2 ? '3 3' : undefined}
        />
      ))}

      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gx} y2={p.gy} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}

      <motion.polygon
        points={polyPoints}
        fill="rgba(225, 29, 72, 0.16)"
        stroke="#f43f5e"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ transformOrigin: '130px 130px' }}
      />

      {points.map((p) => (
        <g key={p.label}>
          <rect x={p.x - 3} y={p.y - 3} width="6" height="6" fill="#f4f4f6" stroke="#e11d48" strokeWidth="1.5" />
          <text
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#a1a1aa"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8.5"
            fontWeight="500"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle world="01" subtitle="From Electrical Engineering & CAD to AI & Decision Science">
          Background & Story
        </SectionTitle>

        {/* Key Numbers Strip */}
        <div className="counter-grid" style={{ marginBottom: 32 }}>
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              className="tech-card counter-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 }}
            >
              <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: '#f4f4f6', letterSpacing: '-0.02em' }}>
                {c.value}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#e4e4e7', marginTop: 4 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{c.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="about-grid">
          {/* Left Column: Competency Radar */}
          <Reveal className="tech-card spec-card">
            <div className="mono" style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Focus Areas</span>
              <span style={{ color: '#71717a' }}>5-Axis Profile</span>
            </div>

            <CompetencyRadar />

            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div
                    className="mono"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11.5,
                      marginBottom: 5,
                      color: '#d4d4d8',
                    }}
                  >
                    <span>{s.label}</span>
                    <span style={{ color: '#a1a1aa' }}>{s.value}%</span>
                  </div>
                  <div className="quant-track">
                    <motion.div
                      className="quant-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Narrative Story & Education */}
          <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
            <Reveal delay={0.06} className="tech-card" style={{ padding: '28px 30px' }}>
              <p style={{ fontSize: 17.5, color: '#f4f4f6', fontWeight: 500, lineHeight: 1.7 }}>
                {profile.storyLead}
              </p>
              <p style={{ fontSize: 16, color: '#a1a1aa', lineHeight: 1.75, marginTop: 14 }}>
                {profile.storyBody}
              </p>
            </Reveal>

            <div style={{ display: 'grid', gap: 14 }}>
              {education.map((e, i) => (
                <Reveal key={e.school} delay={0.08 * i} className="tech-card edu-card">
                  <div className="edu-badge mono">
                    <PixelArt map={CHIP_ICON} size={2} />
                  </div>
                  <div>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 19,
                        fontWeight: 700,
                        color: '#f4f4f6',
                      }}
                    >
                      {e.school} ↗
                    </a>
                    <div style={{ fontSize: 15, color: '#fda4af', fontWeight: 500, marginTop: 2 }}>
                      {e.degree}
                    </div>
                    <div style={{ fontSize: 13.5, color: '#a1a1aa', marginTop: 6 }}>{e.note}</div>
                  </div>
                  <div className="mono edu-meta">
                    <div style={{ color: '#e4e4e7', fontWeight: 600 }}>{e.period}</div>
                    <div style={{ color: '#71717a', marginTop: 3 }}>{e.place}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 28px;
          align-items: start;
        }
        .spec-card {
          padding: 24px;
        }
        .quant-track {
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }
        .quant-fill {
          height: 100%;
          background: linear-gradient(90deg, #e11d48, #f59e0b);
        }
        .counter-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .counter-box {
          padding: 20px 22px;
        }
        .edu-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 18px;
          align-items: center;
          padding: 20px 24px;
        }
        .edu-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
        }
        .edu-meta {
          font-size: 12px;
          text-align: right;
          white-space: nowrap;
        }
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .counter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .edu-card {
            grid-template-columns: 1fr;
          }
          .edu-badge {
            justify-self: start;
          }
          .edu-meta {
            text-align: left;
          }
        }
        @media (max-width: 560px) {
          .counter-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
