import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import './SkillsForm.css';

const validLevels = ['Basic', 'Intermediate', 'Advanced', 'Expert'];

function SkillsForm() {
  const { cvData, updateCVData } = useCV();
  const skills = cvData.skills || [];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 'Basic',
    description: ''
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
    
    // basic validation
    if (!formData.name.trim() || !formData.category.trim()) {
      setError('Name and category are required.');
      return;
    }

    if (!validLevels.includes(formData.level)) {
      setError('Invalid skill level.');
      return;
    }

    // check duplicates ignoring case
    const isDuplicate = skills.some(
      (skill, index) => 
        skill.name.toLowerCase() === formData.name.trim().toLowerCase() && 
        index !== editingIndex
    );

    if (isDuplicate) {
      setError('Skill already exists.');
      return;
    }

    let newSkills = [...skills];
    const skillToSave = {
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim()
    };

    if (editingIndex >= 0) {
      newSkills[editingIndex] = skillToSave;
      setEditingIndex(-1);
    } else {
      newSkills.push(skillToSave);
    }

    updateCVData('skills', newSkills);
    
    // reset form
    setFormData({
      name: '',
      category: '',
      level: 'Basic',
      description: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(skills[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    updateCVData('skills', newSkills);
    
    // reset if deleting the one being edited
    if (editingIndex === index) {
      setFormData({
        name: '',
        category: '',
        level: 'Basic',
        description: ''
      });
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <div className="skills-form-container">
      <h3>Skills</h3>
      
      <form onSubmit={handleSubmit} className="skill-form">
        <div className="form-group">
          <label htmlFor="skill-name">Name</label>
          <input
            type="text"
            id="skill-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skill-category">Category</label>
          <input
            type="text"
            id="skill-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Frontend"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skill-level">Level</label>
          <select
            id="skill-level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            {validLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="skill-description">Brief Description</label>
          <input
            type="text"
            id="skill-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. 3+ years of experience with React"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-info">
              <h4>{skill.name}</h4>
              <p>{skill.category} {skill.description && `- ${skill.description}`}</p>
              <span className="skill-badge">{skill.level}</span>
            </div>
            <div className="skill-actions">
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

export default SkillsForm;
