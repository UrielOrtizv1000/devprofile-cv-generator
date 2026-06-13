import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { validateField } from '../../utils/validations';
import './EducationForm.css';

function CertificationsForm() {
  const { cvData, updateCVData } = useCV();
  const certificationsList = cvData.certifications || [];

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    url: ''
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
    
    const nameError = validateField('name', formData.name, { required: true, maxLength: 100 });
    const issuerError = validateField('issuer', formData.issuer, { required: true, maxLength: 100 });
    const urlError = validateField('url', formData.url, { url: true });

    if (nameError || issuerError) {
      setError('Name and issuer are required.');
      return;
    }

    if (urlError) {
      setError('Please enter a valid URL.');
      return;
    }

    let newCertifications = [...certificationsList];
    const certToSave = {
      ...formData,
      name: formData.name.trim(),
      issuer: formData.issuer.trim(),
      url: formData.url.trim()
    };

    if (editingIndex >= 0) {
      newCertifications[editingIndex] = certToSave;
      setEditingIndex(-1);
    } else {
      newCertifications.push(certToSave);
    }

    updateCVData('certifications', newCertifications);
    
    setFormData({
      name: '',
      issuer: '',
      date: '',
      url: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(certificationsList[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newCertifications = certificationsList.filter((_, i) => i !== index);
    updateCVData('certifications', newCertifications);
    
    if (editingIndex === index) {
      setFormData({
        name: '',
        issuer: '',
        date: '',
        url: ''
      });
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <div className="certifications-form-container form-container">
      <h3>Certifications & Courses</h3>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="cert-name">Name</label>
          <input
            type="text"
            id="cert-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. AWS Certified Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cert-issuer">Issuer</label>
          <input
            type="text"
            id="cert-issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="e.g. Amazon Web Services"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cert-date">Date</label>
          <input
            type="date"
            id="cert-date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cert-url">URL / Credential Link</label>
          <input
            type="url"
            id="cert-url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="e.g. https://aws.amazon.com/..."
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Certification' : 'Add Certification'}
        </button>
      </form>

      <div className="items-list">
        {certificationsList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>{item.issuer} | {item.date ? item.date.replace(/-/g, '/') : ''}</p>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-desc">View Credential</a>}
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

export default CertificationsForm;
