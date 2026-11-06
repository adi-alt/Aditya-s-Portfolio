import About from './components/About'
import Bonus from './components/Bonus'
import Contact from './components/Contact'
import { TelemetryDivider } from './components/Curves'
import Experience from './components/Experience'
import { GameProvider } from './components/Game'
import Hero from './components/Hero'
import HUD from './components/HUD'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  return (
    <GameProvider>
      <HUD />
      <main>
        <Hero />
        <About />
        <TelemetryDivider accent="#e11d48" secondary="#71717a" />
        <Projects />
        <TelemetryDivider accent="#f59e0b" secondary="#71717a" flip />
        <Experience />
        <TelemetryDivider accent="#10b981" secondary="#71717a" />
        <Skills />
        <Bonus />
        <Contact />
      </main>
    </GameProvider>
  )
}
