import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { F1_ICON, PixelArt } from './Sprites'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // If navigating directly to an anchor hash, skip the boot delay so scrolling works immediately
    if (window.location.hash && window.location.hash !== '#top') {
      onDone()
      return
    }

    const id = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + 25))
    }, 55)

    return () => window.clearInterval(id)
  }, [onDone])

  useEffect(() => {
    if (progress < 100) return
    const timer = window.setTimeout(onDone, 140)
    return () => window.clearTimeout(timer)
  }, [progress, onDone])

  const blocks = 20
  const filled = Math.round((progress / 100) * blocks)

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.28, ease: 'easeOut' } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: '#0B0B0D',
        color: '#F4F4F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div className="tech-card" style={{ width: '100%', maxWidth: 640, padding: '24px 22px', overflow: 'hidden' }}>
        <div
          className="mono"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            color: '#A1A1AA',
            marginBottom: 20,
            borderBottom: '1px solid #27272A',
            paddingBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#F4F4F5' }}>
            <PixelArt map={F1_ICON} size={2} />
            <span>Aditya Verma · Portfolio</span>
          </span>
          <span>RWTH Aachen</span>
        </div>

        {/* Skeleton Wireframe Layout Preview */}
        <div style={{ display: 'grid', gap: 10 }} aria-hidden>
          <div className="skeleton" style={{ height: 14, width: '42%' }} />
          <div className="skeleton" style={{ height: 32, width: '78%' }} />
          <div className="skeleton" style={{ height: 84, width: '100%' }} />
        </div>

        <div style={{ marginTop: 20 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${blocks}, minmax(0, 1fr))`,
              gap: 3,
              padding: 3,
              borderRadius: 6,
              border: '1px solid #27272A',
              background: '#0B0B0D',
            }}
          >
            {Array.from({ length: blocks }, (_, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  borderRadius: 2,
                  background: i < filled ? '#E11D48' : '#27272A',
                }}
              />
            ))}
          </div>
          <div
            className="mono"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 8,
              fontSize: 11,
              color: '#A1A1AA',
              marginTop: 8,
            }}
          >
            <span>Loading 3D models &amp; project visuals…</span>
            <span style={{ color: '#F4F4F5' }}>{Math.floor(progress)}%</span>
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
