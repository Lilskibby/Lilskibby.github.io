import PeekPortrait from './PeekPortrait.jsx'
import { ROUTES, NAV_ORDER } from '../data/routes.js'

export default function NavBanner({ section, onSelectKey, onPrev, onNext }) {
  return (
    <div className="nav-banner-wrap">
      <PeekPortrait section={section} />

      <div className="nav-banner">
        <div className="banner-edge-bars">
          <span></span><span></span><span></span>
        </div>
        <div className="banner-bottom-bars">
          <span></span><span></span><span></span>
        </div>
        <nav className="banner-nav" aria-label="Section navigation">
          <button className="banner-arrow" onClick={onPrev} aria-label="Previous section">
            &#8592;
          </button>
          {NAV_ORDER.map((key) => {
            const route = ROUTES.find((r) => r.key === key)
            return (
              <button
                key={key}
                className={`banner-btn${key === section ? ' active' : ''}${
                  key === 'professional' ? ' banner-btn--primary' : ''
                }${key === 'adventure' ? ' banner-btn--adventure' : ''}`}
                onClick={() => onSelectKey(key)}
                aria-current={key === section ? 'page' : undefined}
              >
                {route.label}
              </button>
            )
          })}
          <button className="banner-arrow" onClick={onNext} aria-label="Next section">
            &#8594;
          </button>
        </nav>
      </div>
    </div>
  )
}
