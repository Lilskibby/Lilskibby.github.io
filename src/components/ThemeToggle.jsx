import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <div className="knob">{theme === 'dark' ? '🌙' : '☀️'}</div>
    </button>
  )
}
