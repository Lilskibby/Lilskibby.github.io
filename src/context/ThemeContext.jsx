import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  // Start 'light' so the first client render matches the light-mode SSR
  // snapshot (no hydration mismatch). The inline <head> script has already
  // put the *real* theme on <html data-theme> for the first paint; the
  // effects below then bring React state in line without a flash.
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    let saved
    try {
      saved = window.localStorage.getItem('theme')
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved)
      return
    }
    // No explicit choice — follow the OS setting, including later changes.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mq.matches ? 'dark' : 'light')
    const onChange = () => setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const firstSync = useRef(true)
  useEffect(() => {
    if (firstSync.current) {
      // The pre-paint script already set data-theme for this first commit;
      // don't overwrite it with the initial 'light' placeholder.
      firstSync.current = false
      return
    }
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem('theme', next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
