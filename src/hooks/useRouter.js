import { useCallback, useEffect, useState } from 'react'

// Tiny client-side router — no dependency needed for three static routes.
// Keeps the URL bar in sync with the visible section without ever
// triggering a full page reload, so the existing fade/scroll animations
// keep working exactly as before.
export function useRouter(initialPath) {
  const getPath = () =>
    typeof window !== 'undefined' ? window.location.pathname : initialPath

  const [path, setPath] = useState(initialPath ?? getPath())

  useEffect(() => {
    setPath(getPath())
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
    }
    setPath(to)
  }, [])

  return { path, navigate }
}
