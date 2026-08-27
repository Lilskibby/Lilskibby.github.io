import { useEffect, useRef } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useRouter } from './hooks/useRouter.js'
import { ROUTES, NAV_ORDER, sectionIndexForPath } from './data/routes.js'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero from './components/Hero.jsx'
import NavBanner from './components/NavBanner.jsx'
import ScrollHint from './components/ScrollHint.jsx'
import MiniCredits from './components/MiniCredits.jsx'
import ProfessionalSection from './sections/ProfessionalSection.jsx'
import MusicSection from './sections/MusicSection.jsx'
import AdventureSection from './sections/AdventureSection.jsx'

function AppShell({ initialPath }) {
  const { path, navigate } = useRouter(initialPath)
  const activeIndex = sectionIndexForPath(path)
  const section = ROUTES[activeIndex].key

  useEffect(() => {
    document.documentElement.setAttribute('data-section', section)
  }, [section])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // Only scroll on section changes after the initial render, matching
    // the original site (it never auto-scrolled on first load).
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [section])

  // Prev/next arrows and click-to-select follow the banner's visual
  // (NAV_ORDER) order, not the ROUTES array order, so they match what's
  // actually drawn on screen.
  const navPos = NAV_ORDER.indexOf(section)
  const goToNavPos = (pos) => {
    const wrapped = (pos + NAV_ORDER.length) % NAV_ORDER.length
    const key = NAV_ORDER[wrapped]
    const route = ROUTES.find((r) => r.key === key)
    navigate(route.path)
  }
  const goToKey = (key) => {
    const route = ROUTES.find((r) => r.key === key)
    navigate(route.path)
  }

  return (
    <>
      <ThemeToggle />
      <Hero />
      <NavBanner
        section={section}
        onSelectKey={goToKey}
        onPrev={() => goToNavPos(navPos - 1)}
        onNext={() => goToNavPos(navPos + 1)}
      />
      <ProfessionalSection active={section === 'professional'} />
      <MusicSection active={section === 'music'} />
      <AdventureSection active={section === 'adventure'} />
      <ScrollHint />
      <MiniCredits />
    </>
  )
}

export default function App({ initialPath = '/' }) {
  return (
    <ThemeProvider>
      <AppShell initialPath={initialPath} />
    </ThemeProvider>
  )
}
