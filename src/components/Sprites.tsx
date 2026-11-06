import { memo, useMemo, type CSSProperties, type ReactElement } from 'react'

export type Palette = Record<string, string>

export const PALETTE: Palette = {
  K: '#0B0B0D', // Near-black obsidian
  D: '#151519', // Charcoal surface
  M: '#27272A', // Subtle structural grey
  S: '#52525B', // Brushed steel
  L: '#A1A1AA', // Muted metallic grey
  W: '#F4F4F5', // Off-white highlight
  C: '#06B6D4', // Technical visualisation cyan
  c: '#0891B2', // Deep technical cyan
  R: '#E11D48', // Motorsport red
  r: '#9F1239', // Deep crimson
  Y: '#A1A1AA', // Metallic silver contact pin
  O: '#0891B2', // Technical trace routing
  G: '#27272A', // Matte graphite substrate
  g: '#151519', // Deep charcoal board
}

/** Pads rows so hand-typed maps always form a clean rectangle. */
export function normalise(map: string[]) {
  const w = Math.max(...map.map((r) => r.length))
  return map.map((r) => r.padEnd(w, '.'))
}

type Props = {
  map: string[]
  size?: number
  palette?: Palette
  className?: string
  style?: CSSProperties
  title?: string
}

export const PixelArt = memo(function PixelArt({
  map,
  size = 3,
  palette = PALETTE,
  className,
  style,
  title,
}: Props) {
  const rows = useMemo(() => normalise(map), [map])
  const w = rows[0].length
  const h = rows.length
  const rects = useMemo(() => {
    const out: ReactElement[] = []
    rows.forEach((row, y) => {
      let x = 0
      while (x < w) {
        const c = row[x]
        if (c === '.' || !palette[c]) {
          x++
          continue
        }
        let run = 1
        while (x + run < w && row[x + run] === c) run++
        out.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[c]} />)
        x += run
      }
    })
    return out
  }, [rows, w, palette])

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/* Real-Life Engineering Pixel Art Maps                               */
/* ------------------------------------------------------------------ */

// Microprocessor / PCB IC Chip with gold pins and silicon die
export const CHIP_ICON = [
  '...Y..Y..Y..Y...',
  '...L..L..L..L...',
  '.KKKKKKKKKKKKKK.',
  'YLKDDDDDDDDDDKLY',
  '.LKDCcDDDDcCDK..',
  'YLKDCcCCCCcCDKLY',
  '.LKDCCCCCCCCDK..',
  'YLKDCCWWWWCCDKLY',
  '.LKDCCWWWWCCDK..',
  'YLKDCCCCCCCCDKLY',
  '.LKDCcCCCCcCDK..',
  'YLKDCcDDDDcCDKLY',
  '.LKDDDDDDDDDDK..',
  '.KKKKKKKKKKKKKK.',
  '...L..L..L..L...',
  '...Y..Y..Y..Y...',
]

// Top-down Formula 1 Telemetry Race Car
export const F1_ICON = [
  '....RRRRRRRR....',
  '..ccRRRRRRRRcc..',
  '....TTT..TTT....',
  '..KKK..RR..KKK..',
  '.KKKKKRRRRKKKKK.',
  '.KKKKKRRRRKKKKK.',
  '....ccRRRRcc....',
  '...rRRRRRRRRr...',
  '..rRRRRWWWRRRr..',
  '..RRRRRKKKRRRR..',
  '..RRRRRCCCRRRR..',
  '...RRRRRRRRRR...',
  '.KKKKKRRRRKKKKK.',
  '.KKKKKRRRRKKKKK.',
  '..KKK..RR..KKK..',
  '....CCCCCCCC....',
]

// Server Rack / Database Cluster
export const SERVER_ICON = [
  '.KKKKKKKKKKKKKK.',
  'KDDDDDDDDDDDDDDK',
  'KDGGDDCCCCCCDDDK',
  'KDDDDDDDDDDDDDDK',
  'KKKKKKKKKKKKKKKK',
  'KDDDDDDDDDDDDDDK',
  'KDGGDDCCCCCCDDDK',
  'KDDDDDDDDDDDDDDK',
  'KKKKKKKKKKKKKKKK',
  'KDDDDDDDDDDDDDDK',
  'KDGGDDYYYYYYDDDK',
  'KDDDDDDDDDDDDDDK',
  'KKKKKKKKKKKKKKKK',
  'KDDDDDDDDDDDDDDK',
  'KDRRDDCCCCCCDDDK',
  '.KKKKKKKKKKKKKK.',
]

// Wind Turbine / Renewable Forecasting Icon
export const TURBINE_ICON = [
  '.......WW.......',
  '.......WW.......',
  '......WWWW......',
  '......WWWW......',
  '.......CC.......',
  '.....CCCCCC.....',
  '...WWWWCCWWWW...',
  '.WWWW..LL..WWWW.',
  'WW.....LL.....WW',
  '.......LL.......',
  '.......LL.......',
  '......LLLL......',
  '......LLLL......',
  '.....LLLLLL.....',
  '...KKKKKKKKKK...',
  '..GGGGGGGGGGGG..',
]

// PCB Circuit Board Module
export const PCB_ICON = [
  'KKKKKKKKKKKKKKKK',
  'KgGGGGGGGGGGGGgK',
  'KGYOOGGGGGGOOYGK',
  'KGOYgKKKKKKgYOGK',
  'KGGgKDDDDDDKgGGK',
  'KGGgKDCCCCDKgGGK',
  'KGGgKDCCCCDKgGGK',
  'KGGgKDDDDDDKgGGK',
  'KGGGgKKKKKKgGGGK',
  'KGGGGGOOOOGGGGGK',
  'KGGYYGOOOOGYYGGK',
  'KGGYYGggggGYYGGK',
  'KgGGGGGGGGGGGGgK',
  'KKKKKKKKKKKKKKKK',
  '..YY..YY..YY..YY',
]

// Oscilloscope / Telemetry Signal Icon
export const SIGNAL_ICON = [
  'KKKKKKKKKKKKKKKK',
  'KDDDDDDDDDDDDDDK',
  'KDDDDDDCCDDDDDDK',
  'KDDDDDCCCDDDDDDK',
  'KDDDDDCDCDDDDDDK',
  'KDDDCDC.CDCDDDDK',
  'KCCCCD...DCCCCCK',
  'KDDDDD...DDDDDDK',
  'KDDDDDD.DDDDDDDK',
  'KDDDDDDDDDDDDDDK',
  'KKKKKKKKKKKKKKKK',
]
