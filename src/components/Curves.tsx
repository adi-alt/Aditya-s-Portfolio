import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Subtle telemetry spline divider with scroll-linked phase shift.
 */
export function TelemetryDivider({
  accent = '#E11D48',
  secondary = '#27272A',
  flip = false,
}: {
  accent?: string
  secondary?: string
  flip?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const waveA = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%'])
  const waveB = useTransform(scrollYProgress, [0, 1], ['2.5%', '-2.5%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: 84,
        overflow: 'hidden',
        transform: flip ? 'scaleY(-1)' : undefined,
        borderTop: '1px solid #27272A',
        borderBottom: '1px solid #27272A',
        background: '#0B0B0D',
      }}
      aria-hidden
    >
      <motion.svg
        style={{ x: waveA, position: 'absolute', inset: 0, width: '106%', left: '-3%', height: '100%' }}
        viewBox="0 0 1200 84"
        preserveAspectRatio="none"
      >
        <path
          d="M0 44 C 160 12, 300 72, 460 40 C 620 8, 760 72, 920 38 C 1040 14, 1120 62, 1200 40"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          strokeOpacity="0.55"
        />
        {[
          [160, 27],
          [460, 40],
          [760, 56],
          [920, 38],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" fill={accent} opacity="0.8" />
        ))}
      </motion.svg>

      <motion.svg
        style={{ x: waveB, position: 'absolute', inset: 0, width: '106%', left: '-3%', height: '100%' }}
        viewBox="0 0 1200 84"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="42" x2="1200" y2="42" stroke="#27272A" strokeWidth="1" strokeDasharray="2 6" />
        <path
          d="M0 54 C 190 74, 340 16, 510 48 C 680 78, 830 18, 1000 50 C 1100 68, 1150 30, 1200 44"
          fill="none"
          stroke={secondary}
          strokeWidth="1.2"
          strokeDasharray="5 5"
          strokeOpacity="0.6"
        />
      </motion.svg>
    </div>
  )
}

export function CurvedBadge({
  text = 'RWTH AACHEN · DATA & DECISION SCIENCE · ',
  size = 112,
}: {
  text?: string
  size?: number
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      animate={{ rotate: 360 }}
      transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      aria-hidden
    >
      <defs>
        <path id="eng-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="rgba(21, 21, 25, 0.92)" stroke="#27272A" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="#27272A" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="95" y="95" width="10" height="10" fill="#E11D48" />
      <text
        fontFamily="'JetBrains Mono', monospace"
        fontSize="11"
        fontWeight="500"
        fill="#A1A1AA"
        letterSpacing="2.4"
      >
        <textPath href="#eng-ring">{text}</textPath>
      </text>
    </motion.svg>
  )
}
