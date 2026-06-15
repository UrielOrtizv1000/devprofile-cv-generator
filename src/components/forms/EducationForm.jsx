import { useState } from 'react';
import { useCV } from '../../context/useCV';
import { validateField } from '../../utils/validations';
import './EducationForm.css';

function EducationForm() {
  const { cvData, updateCVData } = useCV();
  const educationList = cvData.education || [];

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
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
    
    const validationErrors = [
      validateField('degree', formData.degree, {
        required: true,
        minLength: 2,
        maxLength: 100,
        label: 'The degree',
      }),
      validateField('institution', formData.institution, {
        required: true,
        minLength: 2,
        maxLength: 100,
        label: 'The institution',
      }),
      validateField('description', formData.description, {
        minLength: 10,
        maxLength: 300,
        label: 'The education description',
      }),
    ].filter(Boolean);

    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      return;
    }

    let newEducation = [...educationList];
    const eduToSave = {
      ...formData,
      degree: formData.degree.trim(),
      institution: formData.institution.trim(),
      description: formData.description.trim()
    };

    if (editingIndex >= 0) {
      newEducation[editingIndex] = eduToSave;
      setEditingIndex(-1);
    } else {
      newEducation.push(eduToSave);
    }

    updateCVData('education', newEducation);
    
    setFormData({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(educationList[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newEducation = educationList.filter((_, i) => i !== index);
    updateCVData('education', newEducation);
    
    if (editingIndex === index) {
      setFormData({
        degree: '',
        institution: '',
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
    <div className="education-form-container form-container">
      <h3>Education</h3>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="edu-degree">Degree</label>
          <input
            type="text"
            id="edu-degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g. B.S. in Computer Science"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edu-institution">Institution</label>
          <input
            type="text"
            id="edu-institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g. MIT"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edu-start-date">Start Date</label>
          <input
            type="date"
            id="edu-start-date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edu-end-date">End Date</label>
          <input
            type="date"
            id="edu-end-date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="edu-description">Description</label>
          <input
            type="text"
            id="edu-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Graduated with honors..."
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Education' : 'Add Education'}
        </button>
      </form>

      <div className="items-list">
        {educationList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <h4>{item.degree}</h4>
              <p>{item.institution} | {item.startDate ? item.startDate.replace(/-/g, '/') : ''} - {item.endDate ? item.endDate.replace(/-/g, '/') : 'Present'}</p>
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

export default EducationForm;
