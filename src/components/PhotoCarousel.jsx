import { useEffect, useRef, useState } from 'react'

export default function PhotoCarousel({ photos }) {
  const total = photos.length
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)

  const goTo = (idx) => setCurrent(((idx % total) + total) % total)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 3500)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  return (
    <div
      className="coop-carousel"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={resetTimer}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
        e.stopPropagation()
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        e.stopPropagation()
        if (Math.abs(dx) > 40) {
          dx < 0 ? next() : prev()
          resetTimer()
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
      <button
        className="carousel-arrow prev"
        aria-label="Previous photo"
        onClick={() => {
          prev()
          resetTimer()
        }}
      >
        &#8592;
      </button>
      <button
        className="carousel-arrow next"
        aria-label="Next photo"
        onClick={() => {
          next()
          resetTimer()
        }}
      >
        &#8594;
      </button>
      <div className="carousel-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => {
              goTo(i)
              resetTimer()
            }}
          />
        ))}
      </div>
    </div>
  )
}
