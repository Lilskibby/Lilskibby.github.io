import adventureDrawn from '../assets/adventure-drawn.webp'

const ROUTES_WALKED = [
  { id: 3315911 },
  { id: 2863858 },
  { id: 2868116 },
]

const PLACES = ['New York, NY', 'Westchester, NY', 'Rochester, NY']

export default function AdventureSection({ active }) {
  return (
    <section className={`page-section${active ? ' active' : ''}`} id="section-adventure">
      <div className="content">
        <div className="adv-intro">
          <img
            className="adv-portrait"
            src={adventureDrawn}
            width={734}
            height={1100}
            alt="Max with backpack"
            loading={active ? 'eager' : 'lazy'}
            fetchPriority={active ? 'high' : 'auto'}
            decoding="async"
          />
          <div className="adv-intro-text">
            <h2>
              Wanderer,
              <br />
              <em>Walker,</em>
              <br />
              Explorer.
            </h2>
            <p>
              When COVID hit in 2020, I was in my sophomore year of high school. My best friend Sam
              and I started walking- as far as our legs could take us. We started small, walking
              from where we lived in Park Slope, to Downtown Brooklyn. Once we made it across the
              Brooklyn Bridge, there was no stopping us. We walked 36 miles in a day, going from our
              neighborhood to Washington Heights, and <span style={{ fontWeight: 'bold' }}>back</span>.
              <br />
              <br />
              Now, I still walk wherever and whenever I can.
            </p>
          </div>
        </div>

        <hr className="accent-divider" />

        <blockquote className="adv-story">"My legs hurt"</blockquote>

        <p className="section-title">Some Favorites</p>
        <div className="journey-grid mb40">
          {ROUTES_WALKED.map((route) => (
            <div key={route.id} style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'visible' }} />
              <iframe
                title={`Walking route ${route.id}`}
                name={`plotaroute_map_${route.id}`}
                src={`https://www.plotaroute.com/embedmap/${route.id}?units=miles`}
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        <p className="section-title">Where I've walked</p>
        <div className="skills-grid mb40" style={{ '--accent': 'var(--accent-adv)' }}>
          {PLACES.map((p) => (
            <div className="skill-tag" key={p}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
