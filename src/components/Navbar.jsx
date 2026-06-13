function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>DevProfile</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/editor">Editor</a></li>
        <li><a href="/preview">Preview</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
