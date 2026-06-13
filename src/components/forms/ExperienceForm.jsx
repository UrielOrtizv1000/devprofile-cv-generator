import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import './EducationForm.css';

function ExperienceForm() {
  const { cvData, updateCVData } = useCV();
  const experienceList = cvData.experience || [];

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
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
    
    if (!formData.role.trim() || !formData.company.trim()) {
      setError('Role and company are required.');
      return;
    }

    let newExperience = [...experienceList];
    const expToSave = {
      ...formData,
      role: formData.role.trim(),
      company: formData.company.trim(),
      description: formData.description.trim()
    };

    if (editingIndex >= 0) {
      newExperience[editingIndex] = expToSave;
      setEditingIndex(-1);
    } else {
      newExperience.push(expToSave);
    }

    updateCVData('experience', newExperience);
    
    setFormData({
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(experienceList[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newExperience = experienceList.filter((_, i) => i !== index);
    updateCVData('experience', newExperience);
    
    if (editingIndex === index) {
      setFormData({
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <div className="experience-form-container form-container">
      <h3>Experience</h3>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="exp-role">Role</label>
          <input
            type="text"
            id="exp-role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exp-company">Company</label>
          <input
            type="text"
            id="exp-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Tech Corp"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exp-start-date">Start Date</label>
          <input
            type="date"
            id="exp-start-date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exp-end-date">End Date</label>
          <input
            type="date"
            id="exp-end-date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="exp-description">Description</label>
          <input
            type="text"
            id="exp-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Developed and maintained..."
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>

      <div className="items-list">
        {experienceList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <h4>{item.role}</h4>
              <p>{item.company} | {item.startDate ? item.startDate.replace(/-/g, '/') : ''} - {item.endDate ? item.endDate.replace(/-/g, '/') : 'Present'}</p>
              {item.description && <p className="item-desc">{item.description}</p>}
            </div>
            <div className="item-actions">
              <button type="button" className="btn-edit" onClick={() => handleEdit(index)}>Edit</button>
              <button type="button" className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceForm;
