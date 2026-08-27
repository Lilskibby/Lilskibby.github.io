import computerDrawn from '../assets/computer-drawn.webp'
import ExperienceCarousel from '../components/ExperienceCarousel.jsx'
import FooterLinks from '../components/FooterLinks.jsx'

const SKILLS = ['Java', 'C', 'Python', 'Delphi', 'HTML/CSS/JS', 'SQL', 'Jira', 'Git', 'HTML/CSS']

const COURSEWORK = [
  'CSCI 242- Computer Science for Transfer/AP Students',
  'CSCI 243- Mechanics of Programming',
  'CSCI 250- Concepts of Computer Systems',
  'CSCI 251- Concepts of Parallel and Distributed Systems',
  'CSCI 261- Analysis of Algorithms',
  'CSCI 262- Introduction to Computer Science Theory',
  'CSCI 320- Principles of Data Management',
  'CSCI 331- Introduction to Artifical Intelligence',
  'CSCI 471- Professional Communications',
  'SWEN 261- Introduction to Software Engineering',
  'MATH 181- Calculus I',
  'MATH 182- Calculus II',
  'MATH 190- Discrete Mathematics for Computing',
  'MATH 241- Linear Algebra',
  'MATH 251- Probability and Statistics',
]

export default function ProfessionalSection({ active }) {
  return (
    <section className={`page-section${active ? ' active' : ''}`} id="section-professional">
      <div className="content">
        <div className="pro-intro">
          <div className="pro-intro-text">
            <h2>
              Developer,
              <br />
              <em>tinkerer,</em>
              <br />
              problem-solver.
            </h2>
            <p>
              I'm a fourth year computer science student at the Rochester Institute of Technology.
              I have experience programming in Java, Python, Delphi, C, and JavaScript/TypeScript. I
              also have experience with REST, UNIX, SQL, and Web Development. I'm on schedule to
              complete my B.S. in Computer Science in 2027, and my M.S. in Cybersecurity in 2028!
            </p>
          </div>
          <img
            className="pro-portrait"
            src={computerDrawn}
            width={734}
            height={1100}
            alt="Max with laptop"
            loading={active ? 'eager' : 'lazy'}
            fetchPriority={active ? 'high' : 'auto'}
            decoding="async"
          />
        </div>

        <p className="section-title">Skills &amp; Tools</p>
        <div className="skills-grid mb40">
          {SKILLS.map((s) => (
            <div className="skill-tag" key={s}>
              {s}
            </div>
          ))}
        </div>

        <hr className="accent-divider" />

        <p className="section-title">Projects</p>
        <div className="projects-grid mb40">
          <a className="project-card-wrap" href="https://courtyardtheband.com">
            <div className="project-card">
              <h3>courtyardtheband.com</h3>
              <p>Website I designed for my band, Courtyard.</p>
              <div className="project-tags">
                <span className="ptag">HTML</span>
                <span className="ptag">CSS</span>
                <span className="ptag">Bootstrap</span>
              </div>
            </div>
          </a>
          <a className="project-card-wrap" href="https://pawsnclaws.pages.dev">
            <div className="project-card">
              <h3>U-Fund</h3>
              <p>
                My <span id="SWEN">Introduction to Software Engineering</span> group project, an
                angular-based web application designed for a fictitious animal philanthropy group.
                Won class award for best project.
              </p>
              <div className="project-tags">
                <span className="ptag">Angular</span>
                <span className="ptag">REST</span>
                <span className="ptag">TS</span>
              </div>
            </div>
          </a>
        </div>

        <hr className="accent-divider" />

        <p className="section-title">Experience</p>
        <ExperienceCarousel />

        <hr className="accent-divider" />

        <p className="section-title">Relevant Coursework</p>
        <div className="coursework-list mb40">
          {COURSEWORK.map((c) => (
            <div className="course-item" key={c}>
              {c}
            </div>
          ))}
        </div>

        <p className="section-title">Find Me</p>
        <FooterLinks />
      </div>
    </section>
  )
}
