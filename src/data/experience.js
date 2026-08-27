import coop1 from '../assets/coop-1.webp'
import coop2 from '../assets/coop-2.webp'
import coop3 from '../assets/coop-3.webp'
import coop4 from '../assets/coop-4.webp'
import adm1 from '../assets/admissions-1.webp'
import adm2 from '../assets/admissions-2.webp'
import adm3 from '../assets/admissions-3.webp'
import adm4 from '../assets/admissions-4.webp'

export const EXPERIENCE = [
  {
    id: 'alpine',
    company: 'Alpine Software',
    role: 'Software Developer',
    location: 'Fairport, NY',
    date: 'May 2025 – Present',
    badge: 'Co-op',
    description:
      'Alpine Software is a Rochester-based Firehouse Records Management System Software Company. At Alpine, I work closely with our development, support, and implementation teams. I meet with clients and scope requirements for projects within our flagship desktop system, mobile applications and backend services.',
    highlights: [
      'Create, maintain, and document new and existing software application features.',
      'Meet and communicate with clients to scope requirements and ensure customer satisfaction',
      'Train new co-op developers',
      'Create documentation for common or discovered development processes',
    ],
    tags: ['Delphi', 'SQL', 'Jira', 'Bitbucket', 'Zendesk'],
    photos: [
      { src: coop2, alt: 'Co-op photo 1', w: 1280, h: 960 },
      { src: coop1, alt: 'Co-op photo 2', w: 800, h: 1067 },
      { src: coop3, alt: 'Co-op photo 3', w: 1280, h: 960 },
      { src: coop4, alt: 'Co-op photo 4', w: 800, h: 602 },
    ],
  },
  {
    id: 'rit',
    company: 'Rochester Institute of Technology',
    role: 'Student Ambassador Captain',
    location: 'Henrietta, NY',
    date: 'Jan 2023 – Present',
    badge: 'Part-Time',
    description:
      'I work with RIT Admissions as a Student Ambassador, giving tours, participating in panels and webinars, engaging with prospective students, and serving as a representative for the University.',
    highlights: [
      'Conduct informative tours for prospective RIT students and families',
      'Participate in panels, webinars, and other admissions events.',
      'Train, evaluate, and hire new ambassadors',
    ],
    tags: ['Leadership', 'Communication', 'Public Speaking'],
    photos: [
      { src: adm1, alt: 'Admissions Photo 1', w: 1600, h: 1200 },
      { src: adm2, alt: 'Admissions Photo 2', w: 1600, h: 1200 },
      { src: adm3, alt: 'Admissions Photo 3', w: 1280, h: 960 },
      { src: adm4, alt: 'Admissions Photo 4', w: 1600, h: 1200 },
    ],
  },
]
