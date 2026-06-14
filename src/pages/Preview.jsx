import { useCV } from '../context/useCV';
import './Preview.css';

function Preview() {
  const { cvData } = useCV();
  const {
    personalData,
    profileImage,
    skills,
    projects,
    education,
    certifications,
    experience,
    languages,
  } = cvData;

  return (
    <section className="preview">
      <div className="cv-container">
        {/* Header Section with Profile Image and Personal Info */}
        <div className="cv-header">
          {profileImage && (
            <div className="profile-image-wrapper">
              <img src={profileImage} alt="Profile" className="profile-image" />
            </div>
          )}
          <div className="personal-info-header">
            <h1 className="full-name">{personalData?.fullName || 'Your Name'}</h1>
            <h2 className="job-title">{personalData?.jobTitle || 'Your Job Title'}</h2>
            <div className="contact-info">
              {personalData?.location && <span className="contact-item">📍 {personalData.location}</span>}
              {personalData?.email && <span className="contact-item">✉️ {personalData.email}</span>}
              {personalData?.phone && <span className="contact-item">📞 {personalData.phone}</span>}
            </div>
          </div>
        </div>

        {/* Professional Social Media Links */}
        {(personalData?.github || personalData?.linkedin || personalData?.portfolio) && (
          <div className="social-links">
            <h3>Professional Links</h3>
            <div className="links-container">
              {personalData?.github && (
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
              )}
              {personalData?.linkedin && (
                <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
              )}
              {personalData?.portfolio && (
                <a href={personalData.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}

        {/* About Section */}
        {personalData?.about && (
          <div className="cv-section">
            <h3>About</h3>
            <p className="about-text">{personalData.about}</p>
          </div>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="cv-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag" title={skill.category ? `Category: ${skill.category}` : ''}>
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="cv-section">
            <h3>Experience</h3>
            <div className="entries-list">
              {experience.map((exp, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <h4 className="entry-title">{exp.role || 'Job Title'}</h4>
                    {exp.startDate && exp.endDate && (
                      <span className="entry-date">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && <p className="entry-company">{exp.company}</p>}
                  {exp.description && <p className="entry-description">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="cv-section">
            <h3>Education</h3>
            <div className="entries-list">
              {education.map((edu, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <h4 className="entry-title">{edu.degree || 'Degree'}</h4>
                    {edu.startDate && edu.endDate && (
                      <span className="entry-date">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    )}
                  </div>
                  {edu.institution && <p className="entry-company">{edu.institution}</p>}
                  {edu.description && <p className="entry-description">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Courses Section */}
        {certifications && certifications.length > 0 && (
          <div className="cv-section">
            <h3>Certifications & Courses</h3>
            <div className="entries-list">
              {certifications.map((cert, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <h4 className="entry-title">{cert.name || 'Certification Name'}</h4>
                    {cert.date && <span className="entry-date">{cert.date}</span>}
                  </div>
                  {cert.issuer && <p className="entry-company">{cert.issuer}</p>}
                  {cert.url && (
                    <p className="entry-description">
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                        View Certificate →
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="cv-section">
            <h3>Projects</h3>
            <div className="entries-list">
              {projects.map((project, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <h4 className="entry-title">{project.name || 'Project Name'}</h4>
                    <div className="project-links">
                      {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          Repo
                        </a>
                      )}
                      {project.deployLink && (
                        <a href={project.deployLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && <p className="entry-description">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <div className="cv-section">
            <h3>Languages</h3>
            <div className="languages-list">
              {languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-name">{lang.language || 'Language'}</span>
                  {lang.level && (
                    <span className="language-proficiency">{lang.level}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Preview;
