import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import './EducationForm.css';

const validLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

function LanguagesForm() {
  const { cvData, updateCVData } = useCV();
  const languagesList = cvData.languages || [];

  const [formData, setFormData] = useState({
    language: '',
    level: 'Basic'
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
    
    if (!formData.language.trim()) {
      setError('Language is required.');
      return;
    }

    if (!validLevels.includes(formData.level)) {
      setError('Invalid level.');
      return;
    }

    const isDuplicate = languagesList.some(
      (lang, index) => 
        lang.language.toLowerCase() === formData.language.trim().toLowerCase() && 
        index !== editingIndex
    );

    if (isDuplicate) {
      setError('Language already exists.');
      return;
    }

    let newLanguages = [...languagesList];
    const langToSave = {
      ...formData,
      language: formData.language.trim()
    };

    if (editingIndex >= 0) {
      newLanguages[editingIndex] = langToSave;
      setEditingIndex(-1);
    } else {
      newLanguages.push(langToSave);
    }

    updateCVData('languages', newLanguages);
    
    setFormData({
      language: '',
      level: 'Basic'
    });
  };

  const handleEdit = (index) => {
    setFormData(languagesList[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const newLanguages = languagesList.filter((_, i) => i !== index);
    updateCVData('languages', newLanguages);
    
    if (editingIndex === index) {
      setFormData({
        language: '',
        level: 'Basic'
      });
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <div className="languages-form-container form-container">
      <h3>Languages</h3>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="lang-name">Language</label>
          <input
            type="text"
            id="lang-name"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="e.g. English"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lang-level">Level</label>
          <select
            id="lang-level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            {validLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          {editingIndex >= 0 ? 'Update Language' : 'Add Language'}
        </button>
      </form>

      <div className="items-list">
        {languagesList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-info">
              <h4>{item.language}</h4>
              <p>{item.level}</p>
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

export default LanguagesForm;
