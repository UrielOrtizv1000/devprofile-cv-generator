export const isValidEmail = (email) => {
  if (!email) return true; // allow empty if not mandatory
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const hasMinLength = (value, min) => {
  if (!value) return true;
  return value.trim().length >= min;
};

export const hasMaxLength = (value, max) => {
  if (!value) return true;
  return value.trim().length <= max;
};

export const isValidSkillLevel = (level) => {
  const validLevels = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
  return validLevels.includes(level);
};

export const isDuplicateSkill = (skills, newSkillName, editingIndex = -1) => {
  return skills.some(
    (skill, index) =>
      skill.name.toLowerCase() === newSkillName.trim().toLowerCase() &&
      index !== editingIndex
  );
};

export const isDuplicateProject = (projects, newProjectName, editingIndex = -1) => {
  return projects.some(
    (project, index) =>
      project.name.toLowerCase() === newProjectName.trim().toLowerCase() &&
      index !== editingIndex
  );
};

export const validateField = (name, value, rules) => {
  if (rules.required && !isRequired(value)) {
    return 'This field is required.';
  }
  if (rules.email && !isValidEmail(value)) {
    return 'Invalid email address.';
  }
  if (rules.url && !isValidUrl(value)) {
    return 'Invalid URL format.';
  }
  if (rules.minLength && !hasMinLength(value, rules.minLength)) {
    return `Minimum length is ${rules.minLength} characters.`;
  }
  if (rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
    return `Maximum length is ${rules.maxLength} characters.`;
  }
  return '';
};
