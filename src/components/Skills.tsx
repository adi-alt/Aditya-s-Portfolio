import { motion } from 'framer-motion'
import { skills } from '../data'
import { CHIP_ICON, PCB_ICON, PixelArt } from './Sprites'
import { SectionTitle } from './UI'

const ACCENTS = ['#e11d48', '#f59e0b', '#10b981', '#38bdf8', '#a855f7', '#f43f5e']

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle world="04" subtitle="Tools I use in production across data, ML, web & hardware">
          Technical Stack
        </SectionTitle>

        <div className="skills-grid">
          {skills.map((g, gi) => {
            const accent = ACCENTS[gi % ACCENTS.length]
            return (
              <motion.div
                key={g.group}
                className="tech-card skill-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, delay: gi * 0.05 }}
              >
                <div className="skill-card-head">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PixelArt map={gi === 5 ? PCB_ICON : CHIP_ICON} size={2} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#f4f4f6' }}>
                      {g.group}
                    </h3>
                  </div>
                  <p style={{ fontSize: 13, color: '#71717a', marginTop: 6 }}>{g.note}</p>
                </div>

                <div className="skill-modules">
                  {g.items.map((s) => (
                    <span key={s} className="skill-mod mono">
                      <span className="skill-pin" style={{ background: accent }} />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skill-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 18px;
        }
        .skill-modules {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-mod {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: var(--ctrl-h);
          min-height: var(--ctrl-h);
          padding: 0 14px;
          border-radius: var(--ctrl-r);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-bright);
          color: #d4d4d8;
          font-size: 11.5px;
        }
        .skill-pin {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: inline-block;
        }
        @media (max-width: 980px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
