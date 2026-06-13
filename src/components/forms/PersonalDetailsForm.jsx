import { useState, useEffect } from 'react';
import { useCV } from '../../context/CVContext';
import { validateField } from '../../utils/validations';
import './PersonalDetailsForm.css';

function PersonalDetailsForm() {
  const { cvData, updateCVData } = useCV();
  const { personalData, profileImage } = cvData;

  const [localData, setLocalData] = useState(personalData || {});
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLocalData(personalData || {});
  }, [personalData]);

  const validationRules = {
    fullName: { required: true, maxLength: 50 },
    jobTitle: { required: true, maxLength: 50 },
    location: { maxLength: 50 },
    email: { required: true, email: true },
    phone: { maxLength: 20 },
    github: { url: true },
    linkedin: { url: true },
    portfolio: { url: true },
    about: { maxLength: 500 }
  };

  // handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change
    if (validationRules[name]) {
      const errorMsg = validateField(name, value, validationRules[name]);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';
    
    if (validationRules[name]) {
      errorMsg = validateField(name, value, validationRules[name]);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }

    // Only update global context if there's no error
    if (!errorMsg) {
      updateCVData('personalData', {
        ...personalData,
        [name]: value,
      });
    }
  };

  // handle image url input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageError(false);
    updateCVData('profileImage', url);
  };

  // handle file upload and convert to base64
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageError(false);
        updateCVData('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // fallback if image fails to load
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="form-container">
      <h3>Personal Details</h3>
      <form className="personal-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group image-upload-group">
          <label>Profile Image (URL or Upload)</label>
          <div className="image-inputs">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={profileImage && profileImage.startsWith('http') ? profileImage : ''}
              onChange={handleImageUrlChange}
            />
            <span className="or-text">OR</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              onClick={(e) => { e.target.value = null; }}
            />
          </div>
          
          {profileImage && !imageError && (
            <div className="image-preview">
              <img 
                src={profileImage} 
                alt="Profile preview" 
                onError={handleImageError} 
              />
            </div>
          )}
          {imageError && (
            <p className="error-text">Failed to load image. Please check the URL or file.</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={localData.fullName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            className={errors.fullName ? 'input-error' : ''}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Profession / Area *</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={localData.jobTitle || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Software Engineer"
            className={errors.jobTitle ? 'input-error' : ''}
          />
          {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={localData.location || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City, Country"
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={localData.email || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={localData.phone || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 234 567 890"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub</label>
          <input
            type="url"
            id="github"
            name="github"
            value={localData.github || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://github.com/username"
            className={errors.github ? 'input-error' : ''}
          />
          {errors.github && <span className="error-text">{errors.github}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={localData.linkedin || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://linkedin.com/in/username"
            className={errors.linkedin ? 'input-error' : ''}
          />
          {errors.linkedin && <span className="error-text">{errors.linkedin}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="portfolio">Portfolio</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={localData.portfolio || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://yourwebsite.com"
            className={errors.portfolio ? 'input-error' : ''}
          />
          {errors.portfolio && <span className="error-text">{errors.portfolio}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="about">Professional Profile</label>
          <textarea
            id="about"
            name="about"
            value={localData.about || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="A brief summary of your professional experience and goals..."
            rows="5"
            className={errors.about ? 'input-error' : ''}
          />
          {errors.about && <span className="error-text">{errors.about}</span>}
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
