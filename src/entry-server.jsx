import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import './styles/global.css'
import App from './App.jsx'
import { sectionIndexForPath, ROUTES } from './data/routes.js'

export function render(path) {
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  )
  const section = ROUTES[sectionIndexForPath(path)].key
  return { html, section }
}
