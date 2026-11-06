import { motion } from 'framer-motion'
import { counters, education, focusAreas, profile } from '../data'
import { CHIP_ICON, PixelArt } from './Sprites'
import { Reveal, SectionTitle } from './UI'

function DomainTopology() {
  const cx = 135
  const cy = 104
  const rOuter = 66
  const rInner = 38
  const n = focusAreas.length

  const nodes = focusAreas.map((area, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return {
      x: cx + Math.cos(angle) * rOuter,
      y: cy + Math.sin(angle) * rOuter,
      ix: cx + Math.cos(angle) * rInner,
      iy: cy + Math.sin(angle) * rInner,
      lx: cx + Math.cos(angle) * (rOuter + 26),
      ly: cy + Math.sin(angle) * (rOuter + 16),
      label: area.label,
    }
  })

  const outerPoly = nodes.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const innerPoly = nodes.map((p) => `${p.ix.toFixed(1)},${p.iy.toFixed(1)}`).join(' ')

  return (
    <svg
      viewBox="0 0 270 208"
      style={{ width: '100%', maxWidth: 245, margin: '0 auto', display: 'block' }}
      role="img"
      aria-label="Five-domain engineering architecture map covering Data and BI, ML and RLHF, ETL and Databases, Full-Stack, and CAD and PCB"
    >
      {/* Concentric reference rings */}
      {[0.35, 0.68, 1].map((scale, idx) => (
        <polygon
          key={idx}
          points={focusAreas
            .map((_, i) => {
              const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
              return `${(cx + Math.cos(a) * rOuter * scale).toFixed(1)},${(cy + Math.sin(a) * rOuter * scale).toFixed(1)}`
            })
            .join(' ')}
          fill="none"
          stroke="#27272A"
          strokeWidth="1"
          strokeDasharray={idx < 2 ? '3 3' : undefined}
        />
      ))}

      {/* Axis spokes */}
      {nodes.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#27272A" strokeWidth="1" />
      ))}

      {/* Connected 5-domain topology */}
      <motion.polygon
        points={outerPoly}
        fill="rgba(225, 29, 72, 0.12)"
        stroke="#E11D48"
        strokeWidth="1.8"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      <polygon points={innerPoly} fill="rgba(6, 182, 212, 0.08)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" />

      {/* Center hub node */}
      <rect x={cx - 4} y={cy - 4} width="8" height="8" fill="#E11D48" />

      {/* Domain nodes & labels */}
      {nodes.map((p) => (
        <g key={p.label}>
          <rect x={p.x - 3.5} y={p.y - 3.5} width="7" height="7" fill="#F4F4F5" stroke="#E11D48" strokeWidth="1.5" />
          <text
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#F4F4F5"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8.5"
            fontWeight="600"
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
              <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: '#F4F4F5', letterSpacing: '-0.02em' }}>
                {c.value}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#F4F4F5', marginTop: 4 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 12, color: '#A1A1AA', marginTop: 2 }}>{c.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="about-grid">
          {/* Left Column: Core Focus Domains (Evidence-Backed, No Arbitrary Percentages) */}
          <Reveal className="tech-card spec-card">
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: '#A1A1AA',
                marginBottom: 6,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Core Focus Areas</span>
              <span style={{ color: '#A1A1AA' }}>5-Domain Scope</span>
            </div>

            <DomainTopology />

            <div className="focus-pillar-list">
              {focusAreas.map((area) => (
                <div key={area.label} className="focus-pillar-item">
                  <div className="focus-pillar-head">
                    <span className="focus-pillar-dot" />
                    <span className="focus-pillar-title">{area.title}</span>
                  </div>
                  <div className="mono focus-pillar-methods">{area.focus}</div>
                  <div className="focus-pillar-evidence">{area.evidence}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Narrative Story & Education */}
          <div className="about-right-col">
            <Reveal delay={0.06} className="tech-card story-card">
              <p style={{ fontSize: 17.5, color: '#F4F4F5', fontWeight: 500, lineHeight: 1.7 }}>
                {profile.storyLead}
              </p>
              <p style={{ fontSize: 16, color: '#A1A1AA', lineHeight: 1.75, marginTop: 14 }}>
                {profile.storyBody}
              </p>
            </Reveal>

            <div className="edu-stack">
              {education.map((e, i) => (
                <Reveal key={e.school} delay={0.08 * i} className="tech-card edu-card">
                  <div className="edu-badge mono">
                    <PixelArt map={CHIP_ICON} size={2} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 19,
                        fontWeight: 700,
                        color: '#F4F4F5',
                      }}
                    >
                      {e.school} ↗
                    </a>
                    <div style={{ fontSize: 15, color: '#F4F4F5', fontWeight: 500, marginTop: 2 }}>
                      {e.degree}
                    </div>
                    <div style={{ fontSize: 13.5, color: '#A1A1AA', marginTop: 6 }}>{e.note}</div>
                  </div>
                  <div className="mono edu-meta">
                    <div style={{ color: '#E11D48', fontWeight: 600 }}>{e.period}</div>
                    <div style={{ color: '#A1A1AA', marginTop: 3 }}>{e.place}</div>
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
          grid-template-columns: 370px 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .spec-card {
          padding: 22px 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .about-right-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          height: 100%;
        }
        .story-card {
          padding: 28px 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .edu-stack {
          display: grid;
          gap: 14px;
        }
        .focus-pillar-list {
          display: grid;
          gap: 7px;
          margin-top: 8px;
        }
        .focus-pillar-item {
          padding: 8px 11px;
          border-radius: 6px;
          background: #0B0B0D;
          border: 1px solid var(--border);
        }
        .focus-pillar-head {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .focus-pillar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }
        .focus-pillar-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #F4F4F5;
        }
        .focus-pillar-methods {
          font-size: 11px;
          color: #A1A1AA;
          margin-top: 3px;
          line-height: 1.45;
        }
        .focus-pillar-evidence {
          font-size: 11.5px;
          color: #A1A1AA;
          margin-top: 2px;
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
          background: #0B0B0D;
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
          .story-card {
            padding: 20px;
          }
          .spec-card {
            padding: 18px;
          }
          .edu-card {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  )
}
