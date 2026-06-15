import { useState } from 'react';
import { useCV } from '../../context/useCV';
import { validateField, isDuplicateProject } from '../../utils/validations';
import './ProjectsForm.css';

const parseTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.map((tech) => String(tech).trim()).filter(Boolean);
  }

  return technologies.split(',').map((tech) => tech.trim()).filter(Boolean);
};

const formatTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.join(', ');
  }

  return technologies || '';
};

function ProjectsForm() {
  const { cvData, updateCVData } = useCV();
  const projects = cvData.projects || [];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    repoLink: '',
    deployLink: '',
    image: ''
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = [
      validateField('name', formData.name, {
        required: true,
        minLength: 2,
        maxLength: 100,
        label: 'The project name',
      }),
      validateField('description', formData.description, {
        required: true,
        minLength: 10,
        maxLength: 500,
        label: 'The project description',
      }),
      validateField('technologies', formData.technologies, {
        required: true,
        minLength: 2,
        label: 'The project technologies',
      }),
      validateField('repoLink', formData.repoLink, {
        url: true,
        label: 'The repository link',
      }),
      validateField('deployLink', formData.deployLink, {
        url: true,
        label: 'The deploy link',
      }),
      validateField('image', formData.image, {
        url: true,
        label: 'The project image',
      }),
    ].filter(Boolean);

    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      return;
    }

    if (isDuplicateProject(projects, formData.name, editingIndex)) {
      setError('A project with that name already exists.');
      return;
    }

    let newProjects = [...projects];
    const projectToSave = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      technologies: parseTechnologies(formData.technologies),
      repoLink: formData.repoLink.trim(),
      deployLink: formData.deployLink.trim(),
      image: formData.image.trim()
    };

    if (editingIndex >= 0) {
      newProjects[editingIndex] = projectToSave;
      setEditingIndex(-1);
    } else {
      newProjects.push(projectToSave);
    }

    updateCVData('projects', newProjects);
    
    // reset form
    setFormData({
      name: '',
      description: '',
      technologies: '',
      repoLink: '',
      deployLink: '',
      image: ''
    });
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setFormData({
      ...project,
      technologies: formatTechnologies(project.technologies),
    });
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    updateCVData('projects', newProjects);
    
    if (editingIndex === index) {
      setFormData({
        name: '',
        description: '',
        technologies: '',
        repoLink: '',
        deployLink: '',
        image: ''
      });
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <div className="projects-form-container">
      <h3>Projects</h3>
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group full-width">
          <label htmlFor="project-name">Project Name</label>
          <input
            type="text"
            id="project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. E-commerce Platform"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What does this project do?"
            rows="3"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="project-technologies">Technologies (comma separated)</label>
          <input
            type="text"
            id="project-technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-repo">Repository URL</label>
          <input
            type="text"
            id="project-repo"
            name="repoLink"
            value={formData.repoLink}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-deploy">Deploy URL</label>
          <input
            type="text"
            id="project-deploy"
            name="deployLink"
            value={formData.deployLink}
            onChange={handleChange}
            placeholder="https://myproject.com"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="project-image">Image URL (optional)</label>
          <input
            type="text"
            id="project-image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-info">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <small className="project-tech">{formatTechnologies(project.technologies)}</small>
              <div className="project-links">
                {project.repoLink && <a href={project.repoLink} target="_blank" rel="noreferrer">Repo</a>}
                {project.deployLink && <a href={project.deployLink} target="_blank" rel="noreferrer">Deploy</a>}
              </div>
            </div>
            {project.image && (
              <div className="project-thumb">
                <img src={project.image} alt={project.name} />
              </div>
            )}
            <div className="project-actions">
              <button 
                type="button" 
                className="btn-edit"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button 
                type="button" 
                className="btn-delete"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsForm;
