import { motion } from 'framer-motion'
import { profile } from '../data'
import { F1_ICON, PixelArt } from './Sprites'
import { SectionTitle } from './UI'

const CHANNELS = [
  {
    label: 'Email',
    value: profile.email,
    action: 'Send Email ↗',
    href: `mailto:${profile.email}`,
    primary: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/av2331',
    action: 'Open Profile ↗',
    href: profile.linkedin,
    primary: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/adi-alt',
    action: 'View Repos ↗',
    href: profile.github,
    primary: false,
  },
  {
    label: 'Phone (DE)',
    value: profile.phone,
    action: 'Call Direct ↗',
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    primary: false,
  },
]

function CircuitTelemetryMap() {
  const trackPath =
    'M 60 190 C 30 140, 45 65, 115 55 C 175 45, 205 95, 260 80 C 320 65, 365 25, 425 55 C 480 82, 470 165, 410 195 C 350 225, 285 170, 220 195 C 155 220, 95 235, 60 190 Z'

  return (
    <div className="tech-card circuit-box">
      <div className="circuit-head mono">
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e4e4e7' }}>
          <PixelArt map={F1_ICON} size={2} />
          <span>Live Circuit Telemetry · Apex F1 Hub</span>
        </span>
        <span style={{ color: '#10b981' }}>● 15-min ETL Sync</span>
      </div>

      <div style={{ padding: '22px 24px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#f4f4f6' }}>
            Real-Time Race Telemetry & Forecasting Pipeline
          </div>
          <p style={{ fontSize: 14, color: '#a1a1aa', marginTop: 4, marginBottom: 14, lineHeight: 1.6 }}>
            Automated Python and GitHub Actions workers ingest Jolpica, OpenF1, and FastF1 telemetry every 15 minutes into Supabase PostgreSQL.
          </p>
        </div>

        <svg viewBox="0 0 510 230" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <line x1="170" y1="0" x2="170" y2="230" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="340" y1="0" x2="340" y2="230" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <text x="20" y="20" fill="#71717a" fontFamily="'JetBrains Mono', monospace" fontSize="9">
            Sector 1 · Data Ingest
          </text>
          <text x="185" y="20" fill="#71717a" fontFamily="'JetBrains Mono', monospace" fontSize="9">
            Sector 2 · Feature Eng
          </text>
          <text x="355" y="20" fill="#71717a" fontFamily="'JetBrains Mono', monospace" fontSize="9">
            Sector 3 · Monte Carlo
          </text>

          <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" strokeLinejoin="round" />
          <path d={trackPath} fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="2" />

          <motion.path
            d={trackPath}
            fill="none"
            stroke="#e11d48"
            strokeWidth="3"
            initial={{ pathLength: 0.22, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          />

          {[
            { x: 115, y: 55, label: 'Elo + RF', color: '#f4f4f6' },
            { x: 260, y: 80, label: 'MAE 2.872', color: '#f59e0b' },
            { x: 410, y: 195, label: 'Groq 1.7s', color: '#10b981' },
          ].map((pt) => (
            <g key={pt.label}>
              <rect x={pt.x - 4} y={pt.y - 4} width="8" height="8" fill={pt.color} stroke="#0a0a0c" strokeWidth="1.5" />
              <text
                x={pt.x + 10}
                y={pt.y + 3}
                fill={pt.color}
                fontFamily="'JetBrains Mono', monospace"
                fontSize="9.5"
                fontWeight="600"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="circuit-metrics mono">
          <div className="circuit-stat-item">
            <span className="circuit-stat-label">Summary Latency</span>
            <span style={{ color: '#f4f4f6', fontWeight: 600 }}>1.7 s median</span>
          </div>
          <div className="circuit-stat-item">
            <span className="circuit-stat-label">Automated Tests</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>156 test files</span>
          </div>
          <div className="circuit-stat-item">
            <span className="circuit-stat-label">Spearman Rank</span>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>0.762</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section contact-sec">
      <div className="container">
        <SectionTitle world="06" subtitle="Based in Aachen, Germany · Open to Werkstudent & Internship roles">
          Get in Touch
        </SectionTitle>

        <div className="contact-grid">
          <div className="tech-card contact-directory">
            <div className="contact-tags-row">
              <span className="chip emerald contact-tag">
                <span className="live-dot" /> Available up to 20h/week
              </span>
              <span className="chip contact-tag">Aachen & Remote</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.3vw, 28px)',
                fontWeight: 700,
                color: '#f4f4f6',
                lineHeight: 1.3,
              }}
            >
              Open for Werkstudent and internship roles in Data Analytics, BI, and AI Engineering.
            </h3>

            <p style={{ fontSize: 15, color: '#a1a1aa', marginTop: 10, lineHeight: 1.65 }}>
              Reach out directly by email, LinkedIn, or phone. I usually reply within a few hours.
            </p>

            <div className="channel-list">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="channel-row"
                >
                  <div style={{ minWidth: 0 }}>
                    <div className="mono" style={{ fontSize: 11, color: '#71717a' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: '#f4f4f6', marginTop: 2, overflowWrap: 'anywhere' }}>
                      {c.value}
                    </div>
                  </div>
                  <span className={`tech-btn contact-action-btn ${c.primary ? 'primary' : ''}`}>{c.action}</span>
                </a>
              ))}
            </div>
          </div>

          <CircuitTelemetryMap />
        </div>
      </div>

      <footer className="mono footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Aditya Verma · Aachen, Germany</span>
        </div>
      </footer>

      <style>{`
        .contact-sec {
          padding-bottom: 0;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.95fr;
          gap: 28px;
          align-items: stretch;
          padding-bottom: 72px;
        }
        .contact-directory {
          padding: 28px 30px;
          display: flex;
          flex-direction: column;
        }
        .contact-tags-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .contact-tag {
          width: 100%;
        }
        .contact-action-btn {
          width: 148px;
          min-width: 148px;
          justify-content: center;
          flex-shrink: 0;
        }
        .channel-list {
          display: grid;
          gap: 10px;
          margin-top: 22px;
        }
        .channel-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid var(--border);
          transition: border-color 0.16s ease, background 0.16s ease;
          flex-wrap: wrap;
        }
        .channel-row:hover {
          background: rgba(255, 255, 255, 0.045);
          border-color: var(--border-bright);
        }
        .circuit-box {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .circuit-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px;
          font-size: 11px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.015);
        }
        .circuit-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          font-size: 11.5px;
        }
        .circuit-stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid var(--border);
        }
        .circuit-stat-label {
          font-size: 10.5px;
          color: #71717a;
        }
        .footer {
          border-top: 1px solid var(--border);
          background: #08080a;
          color: #71717a;
          font-size: 11.5px;
          padding: 22px 0;
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .circuit-metrics {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 560px) {
          .contact-directory {
            padding: 20px;
          }
          .contact-tags-row {
            grid-template-columns: 1fr;
          }
          .channel-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .contact-action-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
