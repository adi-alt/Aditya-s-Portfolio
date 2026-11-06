import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { SceneMode } from './Scene3D'

type TelemetryState = {
  samples: number
  wireframe: boolean
  mode: SceneMode
  ping: (delta?: number) => void
  toggleWireframe: () => void
  setMode: (m: SceneMode) => void
}

const Ctx = createContext<TelemetryState>({
  samples: 52560,
  wireframe: false,
  mode: 'f1',
  ping: () => {},
  toggleWireframe: () => {},
  setMode: () => {},
})

export function GameProvider({ children }: { children: ReactNode }) {
  const [samples, setSamples] = useState(52560)
  const [wireframe, setWireframe] = useState(false)
  const [mode, setMode] = useState<SceneMode>('f1')

  const ping = useCallback((delta = 128) => {
    setSamples((s) => s + delta)
  }, [])

  const toggleWireframe = useCallback(() => {
    setWireframe((w) => !w)
  }, [])

  return (
    <Ctx.Provider value={{ samples, wireframe, mode, ping, toggleWireframe, setMode }}>
      {children}
    </Ctx.Provider>
  )
}

export const useGame = () => useContext(Ctx)
