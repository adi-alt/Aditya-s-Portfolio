import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { experience, type Job } from '../data'
import { PixelArt, SERVER_ICON } from './Sprites'
import { SectionTitle } from './UI'

function ExperienceRow({ job, last }: { job: Job; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })
  const d = 'M 29 0 C 48 30, 10 70, 29 100'

  return (
    <div ref={ref} className="exp-item">
      {/* Left rail with scroll-driven S-curve connector + role metadata */}
      <div className="exp-meta-col">
        <div className="exp-rail">
          {!last && (
            <svg className="exp-curve" viewBox="0 0 58 100" preserveAspectRatio="none" aria-hidden>
              <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                strokeDasharray="4 6"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={d}
                fill="none"
                stroke="#e11d48"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: draw }}
              />
            </svg>
          )}
          <div className="exp-node mono">
            <PixelArt map={SERVER_ICON} size={2} />
            <span>{job.level}</span>
          </div>
        </div>

        <div className="exp-meta-text">
          <div className="mono" style={{ fontSize: 12, color: '#fda4af', fontWeight: 600 }}>
            {job.period}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: '#f4f4f6',
              marginTop: 4,
            }}
          >
            {job.company}
          </h3>
          <div style={{ fontSize: 14, color: '#d4d4d8', marginTop: 2 }}>{job.role}</div>
          <div className="mono" style={{ fontSize: 11.5, color: '#71717a', marginTop: 6 }}>
            {job.place}
          </div>
        </div>
      </div>

      {/* Right column: full-width narrative and impact card */}
      <motion.article
        className="tech-card exp-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      >
        <p style={{ fontSize: 15.5, color: '#e4e4e7', lineHeight: 1.68, marginBottom: 18 }}>
          {job.context}
        </p>

        <ul style={{ listStyle: 'none', display: 'grid', gap: 10 }}>
          {job.points.map((p, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 1fr',
                gap: 10,
                fontSize: 14.5,
                color: '#a1a1aa',
                lineHeight: 1.65,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#e11d48',
                  marginTop: 9,
                }}
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border)',
          }}
        >
          {job.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle world="03" subtitle="2+ years across AI evaluation, data engineering & full-stack analytics">
          Work Experience
        </SectionTitle>

        <div className="exp-list">
          {experience.map((job, i) => (
            <ExperienceRow
              key={job.company}
              job={job}
              last={i === experience.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        .exp-list {
          display: grid;
          gap: 28px;
        }
        .exp-item {
          display: grid;
          grid-template-columns: 310px 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .exp-meta-col {
          display: grid;
          grid-template-columns: 58px 1fr;
          gap: 16px;
        }
        .exp-rail {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .exp-curve {
          position: absolute;
          top: 58px;
          left: 0;
          width: 58px;
          height: calc(100% + 28px);
          overflow: visible;
        }
        .exp-node {
          position: relative;
          z-index: 2;
          width: 58px;
          height: 58px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          font-size: 10px;
          color: #f4f4f6;
          background: #141419;
          border: 1px solid var(--border-bright);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
        }
        .exp-meta-text {
          padding-top: 2px;
        }
        .exp-card {
          padding: 24px 28px;
        }
        @media (max-width: 900px) {
          .exp-item {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .exp-curve {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .exp-card {
            padding: 18px 20px;
          }
        }
      `}</style>
    </section>
  )
}
