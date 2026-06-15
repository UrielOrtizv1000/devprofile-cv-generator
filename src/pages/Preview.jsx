import { useState } from 'react';
import { useCV } from '../context/useCV';
import { validateCVForExport, exportToPDF } from '../utils/pdfExport';
import { FaDownload } from 'react-icons/fa';
import '../styles/Preview.css';

const getTechnologiesText = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.filter(Boolean).join(', ');
  }

  return technologies || '';
};

function Preview() {
  const { cvData } = useCV();
  const [exportErrors, setExportErrors] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const { personalData, profileImage, skills, projects, education, certifications, experience, languages } = cvData;

  // Handle PDF export
  const handleExportPDF = async () => {
    setExportErrors([]);
    
    // Validate CV data
    const validation = validateCVForExport(cvData);
    if (!validation.isValid) {
      setExportErrors(validation.errors);
      return;
    }

    setIsExporting(true);
    try {
      const result = await exportToPDF(
        cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'CV',
        cvData,
        cvData.personalData?.fullName || 'CV'
      );
      
      if (!result.success) {
        setExportErrors([result.message]);
      }
    } catch (error) {
      setExportErrors([error.message || 'An unexpected error occurred during export']);
    } finally {
      setIsExporting(false);
    }
  };

  // Helper function to render date range
  const renderDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    return `${startDate || ''} ${startDate && endDate ? '–' : ''} ${endDate || 'Present'}`.trim();
  };

  // Filter empty sections
  const hasSkills = skills && skills.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasEducation = education && education.length > 0;
  const hasCertifications = certifications && certifications.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasLanguages = languages && languages.length > 0;
  const pdfContactItems = [
    personalData.location,
    personalData.email,
    personalData.phone,
    personalData.github ? `GitHub: ${personalData.github}` : '',
    personalData.linkedin ? `LinkedIn: ${personalData.linkedin}` : '',
    personalData.portfolio ? `Portfolio: ${personalData.portfolio}` : '',
  ].filter(Boolean);

  return (
    <div className="preview-container">
      {/* Export Button and Error Messages */}
      <div className="export-controls">
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="export-button"
          title="Export CV as PDF"
        >
          <FaDownload /> {isExporting ? 'Exporting...' : 'Export as PDF'}
        </button>
      </div>

      {/* Error Messages */}
      {exportErrors.length > 0 && (
        <div className="export-error-banner">
          <div className="error-content">
            <h3 className="error-title">Cannot Export CV</h3>
            <ul className="error-list">
              {exportErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
          <button
            className="error-close-button"
            onClick={() => setExportErrors([])}
            aria-label="Close error message"
          >
            ✕
          </button>
        </div>
      )}

      <div className="cv-document">
        {/* Header Section */}
        <header className="cv-header">
          <div className="header-content">
            {profileImage && (
              <div className="profile-image-wrapper">
                <img src={profileImage} alt={personalData.fullName} className="profile-image" />
              </div>
            )}
            <div className="header-info">
              <h1 className="full-name">{personalData.fullName || 'Your Name'}</h1>
              <p className="job-title">{personalData.jobTitle || 'Your Professional Title'}</p>
              <p className="location-about">
                {personalData.location && <span>{personalData.location}</span>}
                {personalData.location && personalData.about && <span className="separator">•</span>}
                {personalData.about && <span className="about-text">{personalData.about}</span>}
              </p>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="contact-links">
            {personalData.email && (
              <a href={`mailto:${personalData.email}`} className="contact-item">
                {personalData.email}
              </a>
            )}
            {personalData.phone && (
              <a href={`tel:${personalData.phone}`} className="contact-item">
                {personalData.phone}
              </a>
            )}
            {personalData.github && (
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
            )}
            {personalData.linkedin && (
              <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            )}
            {personalData.portfolio && (
              <a href={personalData.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="cv-content">
          {/* Experience Section */}
          {hasExperience && (
            <section className="cv-section">
              <h2 className="section-title">Experience</h2>
              <div className="section-content">
                {experience.map((exp, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <h3 className="entry-title">{exp.role}</h3>
                      <span className="entry-date">{renderDateRange(exp.startDate, exp.endDate)}</span>
                    </div>
                    <p className="entry-subtitle">{exp.company}</p>
                    {exp.description && <p className="entry-description">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {hasEducation && (
            <section className="cv-section">
              <h2 className="section-title">Education</h2>
              <div className="section-content">
                {education.map((edu, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <h3 className="entry-title">{edu.degree}</h3>
                      <span className="entry-date">{renderDateRange(edu.startDate, edu.endDate)}</span>
                    </div>
                    <p className="entry-subtitle">{edu.institution}</p>
                    {edu.description && <p className="entry-description">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {hasSkills && (
            <section className="cv-section">
              <h2 className="section-title">Skills</h2>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <h4 className="skill-name">{skill.name}</h4>
                    <p className="skill-category">{skill.category}</p>
                    {skill.level && <span className="skill-level">{skill.level}</span>}
                    {skill.description && <p className="skill-description">{skill.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {hasProjects && (
            <section className="cv-section">
              <h2 className="section-title">Projects</h2>
              <div className="section-content">
                {projects.map((project, index) => (
                  <div key={index} className="project-entry">
                    {project.image && (
                      <div className="project-image-wrapper">
                        <img src={project.image} alt={project.name} className="project-image" />
                      </div>
                    )}
                    <div className="project-details">
                      <h3 className="entry-title">{project.name}</h3>
                      {project.description && <p className="entry-description">{project.description}</p>}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="technologies">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="project-links">
                        {project.repoLink && (
                          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            Repository
                          </a>
                        )}
                        {project.deployLink && (
                          <a href={project.deployLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {hasCertifications && (
            <section className="cv-section">
              <h2 className="section-title">Certifications & Courses</h2>
              <div className="section-content">
                {certifications.map((cert, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <h3 className="entry-title">{cert.name}</h3>
                      {cert.date && <span className="entry-date">{cert.date}</span>}
                    </div>
                    <p className="entry-subtitle">{cert.issuer}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="certification-link">
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {hasLanguages && (
            <section className="cv-section">
              <h2 className="section-title">Languages</h2>
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{lang.language}</span>
                    <span className="language-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <div className="pdf-export-source" aria-hidden="true">
        <article className="pdf-document">
          <header className={`pdf-header ${profileImage ? 'has-image' : ''}`}>
            <div className="pdf-header-main">
              <h1 className="pdf-name">{personalData.fullName || 'Your Name'}</h1>
              <p className="pdf-title">{personalData.jobTitle || 'Career / Professional Area'}</p>
              {pdfContactItems.length > 0 && (
                <p className="pdf-contact-line">
                  {pdfContactItems.map((item, index) => (
                    <span key={`${item}-${index}`}>
                      {index > 0 && <span className="pdf-contact-separator"> | </span>}
                      {item}
                    </span>
                  ))}
                </p>
              )}
            </div>
            {profileImage && (
              <img src={profileImage} alt={personalData.fullName || 'Profile'} className="pdf-profile-image" />
            )}
          </header>

          <main className="pdf-content">
            {personalData.about && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Professional Profile</h2>
                <p className="pdf-body-text">{personalData.about}</p>
              </section>
            )}

            {hasSkills && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Skills</h2>
                {skills.map((skill, index) => (
                  <div key={index} className="pdf-entry">
                    <p className="pdf-entry-heading">
                      <strong>{skill.name}</strong>
                      {(skill.category || skill.level) && (
                        <span> - {[skill.category, skill.level].filter(Boolean).join(' | ')}</span>
                      )}
                    </p>
                    {skill.description && <p className="pdf-body-text">{skill.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {hasProjects && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Projects</h2>
                {projects.map((project, index) => {
                  const technologiesText = getTechnologiesText(project.technologies);

                  return (
                    <div key={index} className="pdf-entry">
                      <h3 className="pdf-entry-title">{project.name}</h3>
                      {project.description && <p className="pdf-body-text">{project.description}</p>}
                      {technologiesText && (
                        <p className="pdf-detail-line">
                          <strong>Technologies:</strong> {technologiesText}
                        </p>
                      )}
                      {project.repoLink && (
                        <p className="pdf-detail-line">
                          <strong>Repository:</strong> <a href={project.repoLink}>{project.repoLink}</a>
                        </p>
                      )}
                      {project.deployLink && (
                        <p className="pdf-detail-line">
                          <strong>Deploy:</strong> <a href={project.deployLink}>{project.deployLink}</a>
                        </p>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            {hasEducation && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Education</h2>
                {education.map((edu, index) => (
                  <div key={index} className="pdf-entry">
                    <div className="pdf-entry-row">
                      <h3 className="pdf-entry-title">{edu.degree}</h3>
                      <span className="pdf-entry-date">{renderDateRange(edu.startDate, edu.endDate)}</span>
                    </div>
                    <p className="pdf-entry-subtitle">{edu.institution}</p>
                    {edu.description && <p className="pdf-body-text">{edu.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {hasCertifications && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="pdf-entry">
                    <div className="pdf-entry-row">
                      <h3 className="pdf-entry-title">{cert.name}</h3>
                      {cert.date && <span className="pdf-entry-date">{cert.date}</span>}
                    </div>
                    <p className="pdf-entry-subtitle">{cert.issuer}</p>
                    {cert.url && (
                      <p className="pdf-detail-line">
                        <strong>Credential:</strong> <a href={cert.url}>{cert.url}</a>
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {hasExperience && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Experience</h2>
                {experience.map((exp, index) => (
                  <div key={index} className="pdf-entry">
                    <div className="pdf-entry-row">
                      <h3 className="pdf-entry-title">{exp.role}</h3>
                      <span className="pdf-entry-date">{renderDateRange(exp.startDate, exp.endDate)}</span>
                    </div>
                    <p className="pdf-entry-subtitle">{exp.company}</p>
                    {exp.description && <p className="pdf-body-text">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {hasLanguages && (
              <section className="pdf-section">
                <h2 className="pdf-section-title">Languages</h2>
                <div className="pdf-languages-list">
                  {languages.map((lang, index) => (
                    <p key={index} className="pdf-language-item">
                      <strong>{lang.language}</strong>{lang.level && ` - ${lang.level}`}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </main>
        </article>
      </div>
    </div>
  );
}

export default Preview;
