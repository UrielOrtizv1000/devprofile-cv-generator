import html2pdf from 'html2pdf.js';

/**
 * Validates that all required CV sections have necessary data
 * @param {Object} cvData - The CV data object from context
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateCVForExport = (cvData) => {
  const errors = [];

  const { personalData, skills, education, experience } = cvData;

  // Check personal data
  if (!personalData?.fullName?.trim()) {
    errors.push('Full name is required');
  }
  if (!personalData?.jobTitle?.trim()) {
    errors.push('Job title is required');
  }
  if (!personalData?.email?.trim()) {
    errors.push('Email is required');
  }

  // Check at least one skill
  if (!skills || skills.length === 0) {
    errors.push('At least one skill is required');
  }

  // Check at least one education entry
  if (!education || education.length === 0) {
    errors.push('At least one education entry is required');
  }

  // Check at least one experience entry
  if (!experience || experience.length === 0) {
    errors.push('At least one experience entry is required');
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
    // Get the CV document element
    const element = document.querySelector('.cv-document');
    if (!element) {
      throw new Error('CV document not found');
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);

    // Remove any interactive elements that shouldn't appear in PDF
    const buttons = clonedElement.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());

    // Configure html2pdf options
    const options = {
      margin: [10, 10, 10, 10], // margins in mm [top, left, bottom, right]
      filename: `${fileName || fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2, // Higher quality rendering
        useCORS: true, // Allow cross-origin images
        logging: false,
        // Force desktop layout for the PDF regardless of the device/viewport
        // the export is triggered from, so responsive (tablet/mobile) CSS
        // rules don't apply to the rendered document.
        windowWidth: 1200,
        windowHeight: element.scrollHeight
      },
      jsPDF: {
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['h2', '.entry', '.skill-card', '.project-entry', '.language-item']
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
