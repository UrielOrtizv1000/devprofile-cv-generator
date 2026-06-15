import html2pdf from 'html2pdf.js';
import { isValidEmail, isValidSkillLevel, isValidUrl } from './validations';

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
const asArray = (value) => (Array.isArray(value) ? value : []);

const hasTechnologies = (project) => {
  if (Array.isArray(project?.technologies)) {
    return project.technologies.some(hasText);
  }

  return hasText(project?.technologies);
};

const hasValidUrlWhenPresent = (url) => !hasText(url) || isValidUrl(url);

const isValidProjectForExport = (project) => (
  hasText(project?.name) &&
  hasText(project?.description) &&
  hasTechnologies(project) &&
  hasValidUrlWhenPresent(project?.repoLink) &&
  hasValidUrlWhenPresent(project?.deployLink)
);

const isValidSkillForExport = (skill) => (
  hasText(skill?.name) &&
  hasText(skill?.category) &&
  isValidSkillLevel(skill?.level)
);

const isValidEducationForExport = (education) => (
  hasText(education?.degree) &&
  hasText(education?.institution)
);

const isValidCertificationForExport = (certification) => (
  hasText(certification?.name) &&
  hasText(certification?.issuer)
);

const isValidExperienceForExport = (experience) => (
  hasText(experience?.role) &&
  hasText(experience?.company)
);

const isValidLanguageForExport = (language) => (
  hasText(language?.language) &&
  hasText(language?.level)
);

const waitForExportImages = async (root) => {
  const images = Array.from(root.querySelectorAll('img'));

  await Promise.all(images.map((image) => new Promise((resolve) => {
    const source = image.getAttribute('src');

    if (!source) {
      image.remove();
      resolve();
      return;
    }

    if (/^https?:\/\//i.test(source)) {
      image.crossOrigin = 'anonymous';
      image.referrerPolicy = 'no-referrer';
      image.src = source;
    }

    if (image.complete) {
      if (image.naturalWidth === 0) {
        image.remove();
      }
      resolve();
      return;
    }

    const timeout = window.setTimeout(resolve, 2000);

    image.onload = () => {
      window.clearTimeout(timeout);
      resolve();
    };

    image.onerror = () => {
      window.clearTimeout(timeout);
      image.remove();
      resolve();
    };
  })));
};

/**
 * Validates that all required CV sections have necessary data
 * @param {Object} cvData - The CV data object from context
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateCVForExport = (cvData) => {
  const errors = [];

  const {
    personalData = {},
    skills,
    projects,
    education,
    certifications,
    experience,
    languages,
  } = cvData || {};

  const validSkills = asArray(skills).filter(isValidSkillForExport);
  const validProjects = asArray(projects).filter(isValidProjectForExport);
  const validEducation = asArray(education).filter(isValidEducationForExport);
  const validCertifications = asArray(certifications).filter(isValidCertificationForExport);
  const validExperience = asArray(experience).filter(isValidExperienceForExport);
  const validLanguages = asArray(languages).filter(isValidLanguageForExport);

  // Check personal data
  if (!hasText(personalData.fullName)) {
    errors.push('Full name is required');
  }
  if (!hasText(personalData.jobTitle)) {
    errors.push('Job title is required');
  }
  if (!hasText(personalData.email)) {
    errors.push('Email is required');
  } else if (!isValidEmail(personalData.email)) {
    errors.push('Email must be valid');
  }

  // Check at least one skill
  if (validSkills.length === 0) {
    errors.push('At least one valid skill with name, category, and level is required');
  }

  // Check at least one project
  if (validProjects.length === 0) {
    errors.push('At least one valid project with name, description, and technologies is required');
  }

  const projectsWithInvalidLinks = asArray(projects).filter(
    (project) => !hasValidUrlWhenPresent(project?.repoLink) || !hasValidUrlWhenPresent(project?.deployLink)
  );

  if (projectsWithInvalidLinks.length > 0) {
    errors.push('Project repository and deploy links must be valid URLs when provided');
  }

  // Check at least one education or certification entry
  if (validEducation.length === 0 && validCertifications.length === 0) {
    errors.push('At least one valid education or certification entry is required');
  }

  // Check at least one experience or language entry
  if (validExperience.length === 0 && validLanguages.length === 0) {
    errors.push('Add at least one valid experience entry or one valid language');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Exports the CV to a PDF file
 * @param {string} fileName - The name of the PDF file (without extension)
 * @param {Object} cvData - The CV data from context
 * @param {string} fullName - Full name for generating filename
 */
export const exportToPDF = async (fileName, cvData, fullName = 'CV') => {
  try {
    // Get the Harvard-style PDF document element
    const element = document.querySelector('.pdf-document');
    if (!element) {
      throw new Error('PDF document not found');
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);
    clonedElement.style.position = 'static';
    clonedElement.style.left = 'auto';
    clonedElement.style.top = 'auto';
    clonedElement.style.transform = 'none';
    clonedElement.style.margin = '0';
    clonedElement.style.minHeight = 'auto';

    // Remove any interactive elements that shouldn't appear in PDF
    const buttons = clonedElement.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());

    await waitForExportImages(clonedElement);

    // Configure html2pdf options
    const options = {
      margin: [0.5, 0.5, 0.65, 0.5],
      filename: `${fileName || fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 900,
        windowHeight: element.scrollHeight
      },
      jsPDF: {
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
        compress: true
      },
      pagebreak: {
        mode: ['css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['.pdf-header', '.pdf-section', '.pdf-entry', '.pdf-languages-list', '.pdf-language-item']
      }
    };

    // Generate and download PDF
    await html2pdf().set(options).from(clonedElement).save();

    return { success: true, message: 'PDF exported successfully' };
  } catch (error) {
    console.error('PDF export error:', error);
    return { success: false, message: error.message || 'Failed to export PDF' };
  }
};
