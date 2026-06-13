import { Link } from 'react-router-dom'

function Navbar() {
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
      </ul>
    </nav>
  )
}

export default Navbar
