import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

export default function PhotoCarousel({ photos }) {
  const total = photos.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const hoverRef = useRef(false)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)

  const goTo = (idx) => setCurrent(((idx % total) + total) % total)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // Auto-advance only when the user hasn't paused it and hasn't asked the
  // OS to reduce motion (WCAG 2.2.2 — the slideshow must be stoppable).
  const autoplay = !paused && !prefersReducedMotion

  useEffect(() => {
    if (!autoplay || total <= 1) return
    // Re-armed whenever `current` changes, so a manual tap/click gives a
    // fresh 3.5s before the next auto-advance.
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) setCurrent((c) => (c + 1) % total)
    }, 3500)
    return () => clearInterval(timerRef.current)
  }, [autoplay, total, current])

  return (
    <div
      className="coop-carousel"
      onMouseEnter={() => {
        hoverRef.current = true
      }}
      onMouseLeave={() => {
        hoverRef.current = false
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
        e.stopPropagation()
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        e.stopPropagation()
        if (Math.abs(dx) > 40) {
          if (dx < 0) next()
          else prev()
        }
      }}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {photos.map((p, i) => (
          <div className="carousel-slide" key={i}>
            <img
              src={p.src}
              width={p.w}
              height={p.h}
              alt={p.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
      <button className="carousel-arrow prev" aria-label="Previous photo" onClick={prev}>
        &#8592;
      </button>
      <button className="carousel-arrow next" aria-label="Next photo" onClick={next}>
        &#8594;
      </button>
      {!prefersReducedMotion && total > 1 && (
        <button
          className="carousel-pause"
          aria-label={paused ? 'Play photo slideshow' : 'Pause photo slideshow'}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? '▶' : '❚❚'}
        </button>
      )}
      <div className="carousel-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
