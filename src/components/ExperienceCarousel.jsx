import { useRef, useState } from 'react'
import { EXPERIENCE } from '../data/experience.js'
import PhotoCarousel from './PhotoCarousel.jsx'

function CoopCard({ exp }) {
  return (
    <div className="coop-card">
      <div className="coop-header">
        <div className="coop-company">
          <span className="coop-company-name">{exp.company}</span>
          <span className="coop-role">{exp.role}</span>
          <span className="coop-location">{exp.location}</span>
        </div>
        <div className="coop-meta">
          <span className="coop-date">{exp.date}</span>
          <span className="coop-badge">{exp.badge}</span>
        </div>
      </div>

      <div className="coop-body">
        <div className="coop-desc">
          <p>{exp.description}</p>
          <ul className="coop-highlights">
            {exp.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div
            className="project-tags"
            style={{ marginTop: 16, gap: 6, display: 'flex', flexWrap: 'wrap' }}
          >
            {exp.tags.map((t) => (
              <span className="ptag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <PhotoCarousel photos={exp.photos} />
      </div>
    </div>
  )
}

export default function ExperienceCarousel() {
  const total = EXPERIENCE.length
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const goTo = (idx) => setCurrent(((idx % total) + total) % total)

  return (
    <>
      <div
        className="exp-carousel"
        id="expCarousel"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > 40) {
            goTo(current + (dx < 0 ? 1 : -1))
          }
        }}
      >
        <div className="exp-track" id="expTrack" style={{ transform: `translateX(-${current * 100}%)` }}>
          {EXPERIENCE.map((exp) => (
            <div className="exp-slide" key={exp.id}>
              <CoopCard exp={exp} />
            </div>
          ))}
        </div>
      </div>

      <div className="exp-carousel-nav">
        <button className="exp-arrow" aria-label="Previous experience" onClick={() => goTo(current - 1)}>
          &#8592;
        </button>
        <div className="exp-dots" id="expDots">
          {EXPERIENCE.map((exp, i) => (
            <button
              key={exp.id}
              className={`exp-dot${i === current ? ' active' : ''}`}
              aria-label={`Go to experience ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="exp-arrow" aria-label="Next experience" onClick={() => goTo(current + 1)}>
          &#8594;
        </button>
      </div>
    </>
  )
}
