import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { F1_ICON, PixelArt } from './Sprites'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 12 + Math.random() * 18)
        if (n >= 100) {
          clearInterval(id)
          setTimeout(onDone, 220)
        }
        return n
      })
    }, 70)
    return () => clearInterval(id)
  }, [onDone])

  const blocks = 20
  const filled = Math.round((progress / 100) * blocks)

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: '#0a0a0c',
        color: '#f4f4f6',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <div className="tech-card" style={{ width: 'min(680px, 100%)', padding: '28px 30px' }}>
        <div
          className="mono"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            color: '#a1a1aa',
            marginBottom: 22,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 14,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f4f4f6' }}>
            <PixelArt map={F1_ICON} size={2} />
            <span>Aditya Verma · Portfolio</span>
          </span>
          <span>RWTH Aachen</span>
        </div>

        {/* Skeleton Wireframe Layout Preview */}
        <div style={{ display: 'grid', gap: 12 }} aria-hidden>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 14 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <div className="skeleton" style={{ height: 16, width: '40%' }} />
              <div className="skeleton" style={{ height: 38, width: '86%' }} />
              <div className="skeleton" style={{ height: 14, width: '92%' }} />
              <div className="skeleton" style={{ height: 14, width: '74%' }} />
            </div>
            <div className="skeleton" style={{ height: 140 }} />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${blocks}, 1fr)`,
              gap: 3,
              padding: 3,
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.12)',
              background: '#0a0a0c',
            }}
          >
            {Array.from({ length: blocks }, (_, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  borderRadius: 2,
                  background: i < filled ? '#e11d48' : 'rgba(255,255,255,0.04)',
                }}
              />
            ))}
          </div>
          <div
            className="mono"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              color: '#71717a',
              marginTop: 8,
            }}
          >
            <span>Loading 3D models & project screenshots…</span>
            <span style={{ color: '#f4f4f6' }}>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SceneSkeleton() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        padding: 20,
      }}
      aria-label="Loading 3D engineering model"
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }} className="skeleton" />
    </div>
  )
}
