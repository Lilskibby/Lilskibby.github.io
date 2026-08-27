import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>,
)
