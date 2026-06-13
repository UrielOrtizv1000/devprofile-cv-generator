import { useState } from 'react';
import { useCV } from '../../context/useCV';
import { validateField } from '../../utils/validations';
import './PersonalDetailsForm.css';

const validationRules = {
  fullName: { required: true, minLength: 2, maxLength: 50, label: 'The full name' },
  jobTitle: { required: true, minLength: 2, maxLength: 50, label: 'The profession or area' },
  location: { maxLength: 50, label: 'The location' },
  email: { required: true, email: true, label: 'The email address' },
  phone: { maxLength: 20, label: 'The phone number' },
  github: { url: true, label: 'The GitHub link' },
  linkedin: { url: true, label: 'The LinkedIn link' },
  portfolio: { url: true, label: 'The portfolio' },
  about: { minLength: 10, maxLength: 500, label: 'The professional profile' },
};

const normalizePersonalData = (data) => ({
  fullName: (data.fullName || '').trim(),
  jobTitle: (data.jobTitle || '').trim(),
  location: (data.location || '').trim(),
  email: (data.email || '').trim(),
  phone: (data.phone || '').trim(),
  about: (data.about || '').trim(),
  github: (data.github || '').trim(),
  linkedin: (data.linkedin || '').trim(),
  portfolio: (data.portfolio || '').trim(),
});

const validatePersonalData = (data) => {
  return Object.entries(validationRules).reduce((fieldErrors, [field, rules]) => {
    const error = validateField(field, data[field] || '', rules);
    return { ...fieldErrors, [field]: error };
  }, {});
};

function PersonalDetailsForm() {
  const { cvData, updateCVData } = useCV();
  const { personalData, profileImage } = cvData;

  const [localData, setLocalData] = useState(() => personalData || {});
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState(() =>
    typeof profileImage === 'string' && profileImage.startsWith('http') ? profileImage : ''
  );
  const [imageError, setImageError] = useState('');
  const [imageMessage, setImageMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    setFormMessage('');

    if (validationRules[name]) {
      const errorMsg = validateField(name, value, validationRules[name]);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (validationRules[name]) {
      const errorMsg = validateField(name, value, validationRules[name]);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSavePersonalData = (e) => {
    e.preventDefault();

    const nextErrors = validatePersonalData(localData);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setFormMessage('Review the highlighted fields before saving.');
      return;
    }

    const normalizedData = normalizePersonalData(localData);
    updateCVData('personalData', normalizedData);
    setLocalData(normalizedData);
    setFormMessage('Personal details saved successfully.');
  };

  const handleImageUrlChange = (e) => {
    setImageUrlInput(e.target.value);
    setImageError('');
    setImageMessage('');
  };

  const handleApplyImageUrl = () => {
    const url = imageUrlInput.trim();

    if (!url) {
      setImageMessage('');
      setImageError('Enter an image URL before saving it.');
      return;
    }

    const urlError = validateField('profileImage', url, {
      imageUrl: true,
      label: 'The profile image',
    });

    if (urlError) {
      setImageMessage('');
      setImageError(urlError);
      return;
    }

    setImageError('');
    setImageMessage('Validating image...');

    const image = new Image();
    image.onload = () => {
      updateCVData('profileImage', url);
      setImageUrlInput(url);
      setImageError('');
      setImageMessage('Profile image updated.');
    };
    image.onerror = () => {
      setImageMessage('');
      setImageError('The image could not be loaded. It was not saved to the CV.');
    };
    image.src = url;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImageMessage('');
    setImageError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        setImageError('The selected image could not be read.');
        return;
      }

      updateCVData('profileImage', reader.result);
      setImageUrlInput('');
      setImageError('');
      setImageMessage('Profile image uploaded successfully.');
    };
    reader.onerror = () => {
      setImageError('The selected image could not be read.');
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageError = () => {
    updateCVData('profileImage', '');
    setImageUrlInput('');
    setImageMessage('');
    setImageError('The saved image could not be loaded and was removed from the CV.');
  };

  const handleClearProfileImage = () => {
    updateCVData('profileImage', '');
    setImageUrlInput('');
    setImageError('');
    setImageMessage('Profile image removed.');
  };

  return (
    <div className="form-container">
      <h3>Personal Details</h3>
      <form className="personal-form" onSubmit={handleSavePersonalData}>
        <div className="form-group image-upload-group">
          <label htmlFor="profile-image-url">Profile Image (URL or Upload)</label>
          <div className="image-inputs">
            <input
              type="url"
              id="profile-image-url"
              placeholder="https://example.com/image.jpg"
              value={imageUrlInput}
              onChange={handleImageUrlChange}
            />
            <button type="button" className="btn-secondary" onClick={handleApplyImageUrl}>
              Save URL
            </button>
            <span className="or-text">OR</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
          </div>

          {profileImage && (
            <div className="image-preview">
              <img src={profileImage} alt="Profile preview" onError={handleProfileImageError} />
            </div>
          )}

          {profileImage && (
            <button type="button" className="btn-secondary btn-danger-light" onClick={handleClearProfileImage}>
              Remove image
            </button>
          )}

          {imageError && <p className="error-text">{imageError}</p>}
          {imageMessage && <p className="status-text">{imageMessage}</p>}
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

        <div className="form-actions">
          <button type="submit" className="btn-add">
            Save personal details
          </button>
          {formMessage && (
            <p className={Object.values(errors).some(Boolean) ? 'error-text' : 'status-text'}>
              {formMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
