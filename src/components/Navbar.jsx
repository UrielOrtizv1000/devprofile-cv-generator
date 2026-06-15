import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './Navbar.css'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>DevProfile</h1>
      </div>
      <ul className="navbar-links">
        {/* Client side navigation */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/editor">Editor</Link></li>
        <li><Link to="/preview">Preview</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDark ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
