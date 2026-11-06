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
        <TelemetryDivider accent="#E11D48" secondary="#3F3F46" />
        <Projects />
        <TelemetryDivider accent="#E11D48" secondary="#3F3F46" flip />
        <Experience />
        <TelemetryDivider accent="#E11D48" secondary="#3F3F46" />
        <Skills />
        <Bonus />
        <Contact />
      </main>
    </GameProvider>
  )
}
