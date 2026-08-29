import { useEffect, useState } from 'react'

// Tracks the user's "reduce motion" OS setting. Starts `false` so it
// matches server-rendered output, then corrects after mount and follows
// later changes.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
