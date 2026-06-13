import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import './PersonalDetailsForm.css';

function PersonalDetailsForm() {
  const { cvData, updateCVData } = useCV();
  const { personalData, profileImage } = cvData;

  const [imageError, setImageError] = useState(false);

  // handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCVData('personalData', {
      ...personalData,
      [name]: value,
    });
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
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={personalData.fullName || ''}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Profession / Area</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={personalData.jobTitle || ''}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={personalData.location || ''}
            onChange={handleChange}
            placeholder="City, Country"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalData.email || ''}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalData.phone || ''}
            onChange={handleChange}
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub</label>
          <input
            type="url"
            id="github"
            name="github"
            value={personalData.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={personalData.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="portfolio">Portfolio</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={personalData.portfolio || ''}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="about">Professional Profile</label>
          <textarea
            id="about"
            name="about"
            value={personalData.about || ''}
            onChange={handleChange}
            placeholder="A brief summary of your professional experience and goals..."
            rows="5"
          />
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailsForm;
