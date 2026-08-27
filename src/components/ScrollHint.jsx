import { useEffect, useState } from 'react'

export default function ScrollHint() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
      setHidden(atBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="scroll-hint" className={`scroll-hint${hidden ? ' hidden' : ''}`}>
      scroll to explore ↓
    </div>
  )
}
