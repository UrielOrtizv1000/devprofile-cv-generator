import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>DevProfile</h1>
      </div>
      <button
        className="navbar-toggle"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        {/* Client side navigation */}
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/editor" onClick={closeMenu}>Editor</Link></li>
        <li><Link to="/preview" onClick={closeMenu}>Preview</Link></li>
        <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
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
