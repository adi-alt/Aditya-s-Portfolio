import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

export function SectionTitle({
  world,
  subtitle,
  children,
}: {
  world: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 170, damping: 22 }}
    >
      <div className="section-title-left">
        <span className="section-eyebrow">
          <span>0{Number(world)}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{subtitle}</span>
        </span>
        <h2>{children}</h2>
      </div>
    </motion.div>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}
