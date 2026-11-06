import { motion } from 'framer-motion'
import { skills } from '../data'
import { CHIP_ICON, PCB_ICON, PixelArt } from './Sprites'
import { SectionTitle } from './UI'

// Pair compact and dense categories in 3 balanced columns so every card hugs its content without empty space
const COLUMNS = [
  [0, 3], // Programming (5) + Machine Learning & AI (10)
  [1, 5], // Data Analytics & Visualization (10) + CAD & PCB Automation (3)
  [2, 4], // Data Engineering & Databases (5) + Web Development & DevOps (9)
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle world="04" subtitle="Tools I use in production across data, ML, web & hardware">
          Technical Stack
        </SectionTitle>

        <div className="skills-grid">
          {COLUMNS.map((colIndices, colIdx) => (
            <div key={colIdx} className="skills-col">
              {colIndices.map((gi) => {
                const g = skills[gi]
                if (!g) return null
                return (
                  <motion.div
                    key={g.group}
                    className="tech-card skill-card"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20, delay: gi * 0.04 }}
                  >
                    <div className="skill-card-head">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <PixelArt map={gi === 5 ? PCB_ICON : CHIP_ICON} size={2} />
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17.5, fontWeight: 700, color: '#F4F4F5' }}>
                          {g.group}
                        </h3>
                      </div>
                      <p style={{ fontSize: 12.5, color: '#A1A1AA', marginTop: 4, lineHeight: 1.45 }}>{g.note}</p>
                    </div>

                    <div className="skill-modules">
                      {g.items.map((s) => (
                        <span key={s} className="skill-mod mono">
                          <span className="skill-pin" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: start;
        }
        .skills-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }
        .skill-card {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 14px;
          height: auto;
        }
        .skill-modules {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .skill-mod {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: 32px;
          min-height: 32px;
          padding: 0 12px;
          border-radius: var(--ctrl-r);
          background: #0B0B0D;
          border: 1px solid var(--border);
          color: #F4F4F5;
          font-size: 11.5px;
        }
        .skill-pin {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
        }
        @media (max-width: 980px) {
          .skills-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .skills-col:last-child {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
            align-items: start;
          }
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .skills-col:last-child {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
