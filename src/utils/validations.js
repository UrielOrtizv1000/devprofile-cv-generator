export const isValidEmail = (email) => {
  if (!email) return true; // allow empty if not mandatory
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidUrl = (url) => {
  if (!url) return true;
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

export const isValidImageUrl = (url) => {
  if (!url) return true;
  if (!isValidUrl(url)) return false;

  try {
    const parsedUrl = new URL(url);
    return /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(parsedUrl.pathname);
  } catch {
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
  const label = rules.label || name || 'This field';

  if (rules.required && !isRequired(value)) {
    return `Complete ${label.toLowerCase()}.`;
  }
  if (rules.email && !isValidEmail(value)) {
    return `${label} must be a valid email address.`;
  }
  if (rules.url && !isValidUrl(value)) {
    return `${label} must be a valid URL.`;
  }
  if (rules.imageUrl && !isValidImageUrl(value)) {
    return `${label} must be a valid image URL. Use png, jpg, jpeg, gif, webp, avif, or svg.`;
  }
  if (rules.minLength && !hasMinLength(value, rules.minLength)) {
    return `${label} must be at least ${rules.minLength} characters.`;
  }
  if (rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
    return `${label} must be at most ${rules.maxLength} characters.`;
  }
  return '';
};
