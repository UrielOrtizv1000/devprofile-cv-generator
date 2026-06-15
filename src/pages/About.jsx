import '../styles/About.css'

function About() {
  return (
    <section className="about">
      <div className="about-header">
        <h2>DevProfile CV Builder</h2>
        <p className="subtitle">
          A React application for creating, editing, previewing, and exporting professional CVs in PDF format.
        </p>
      </div>

      <div className="about-section">
        <h3>Objective</h3>
        <p>
          Allow users to enter professional information, manage CV sections dynamically,
          preview the generated CV, and export the final result as a professional PDF.
        </p>
      </div>

      <div className="about-section">
        <h3>Used Technologies</h3>
        <ul className="about-tags">
          <li>React</li>
          <li>Vite</li>
          <li>JavaScript</li>
          <li>React Router DOM</li>
          <li>LocalStorage</li>
          <li>CSS</li>
          <li>PDF generation library</li>
          <li>Chart library</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Main Functions</h3>
        <ul>
          <li>CV editor with dynamic forms</li>
          <li>Web preview of the generated CV</li>
          <li>PDF export</li>
          <li>Skills chart</li>
          <li>Dark mode</li>
          <li>Local data persistence</li>
          <li>Form validations</li>
          <li>Organized React component structure</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Team Members</h3>
        <ul>
          <li>Oscar Iván Gomez Ruiz</li>
          <li>Azael Fajardo Espino</li>
          <li>Uriel Ezequiel Ortiz Rosales</li>
        </ul>
      </div>
    </section>
  )
}

export default About
