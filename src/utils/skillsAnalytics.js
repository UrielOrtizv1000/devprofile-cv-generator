/**
 * Utility functions for analyzing and processing skills data
 */

// Common technical categories (can be extended)
const TECHNICAL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Mobile',
  'Database',
  'DevOps',
  'Cloud',
  'AI/ML',
  'Data Science',
  'Security',
  'Systems',
  'Tools',
  'Programming Languages',
  'Frameworks',
  'Libraries',
  'APIs',
  'Databases',
  'Infrastructure',
  'Version Control',
  'Testing'
];

/**
 * Classify a skill as technical or soft skill
 * @param {string} category - The skill category
 * @returns {string} 'Technical' or 'Soft'
 */
export const classifySkill = (category) => {
  if (!category) return 'Soft';
  const normalizedCategory = category.toLowerCase().trim();
  
  // Check if category matches any technical category
  const isTechnical = TECHNICAL_CATEGORIES.some(
    tech => normalizedCategory.includes(tech.toLowerCase())
  );
  
  return isTechnical ? 'Technical' : 'Soft';
};

/**
 * Analyze skills and return statistics
 * @param {Array} skills - Array of skill objects
 * @returns {Object} Analytics data
 */
export const analyzeSkills = (skills) => {
  if (!skills || skills.length === 0) {
    return {
      totalSkills: 0,
      byLevel: {},
      byCategory: {},
      byType: {},
      averageLevel: null,
      levelDistribution: [],
      categoryDistribution: [],
      typeDistribution: []
    };
  }

  const analytics = {
    totalSkills: skills.length,
    byLevel: {},
    byCategory: {},
    byType: {},
    skills: []
  };

  // Level mapping for calculations
  const levelValues = { Basic: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
  let totalLevelValue = 0;

  skills.forEach(skill => {
    const type = classifySkill(skill.category);
    
    // Count by level
    analytics.byLevel[skill.level] = (analytics.byLevel[skill.level] || 0) + 1;
    totalLevelValue += levelValues[skill.level] || 0;

    // Count by category
    analytics.byCategory[skill.category] = (analytics.byCategory[skill.category] || 0) + 1;

    // Count by type
    analytics.byType[type] = (analytics.byType[type] || 0) + 1;

    // Store enriched skill data
    analytics.skills.push({
      ...skill,
      type
    });
  });

  // Calculate average level
  analytics.averageLevel = totalLevelValue / skills.length;

  // Format for charts
  analytics.levelDistribution = Object.entries(analytics.byLevel).map(([level, count]) => ({
    name: level,
    value: count,
    percentage: ((count / skills.length) * 100).toFixed(1)
  }));

  analytics.categoryDistribution = Object.entries(analytics.byCategory)
    .map(([category, count]) => ({
      name: category,
      value: count,
      percentage: ((count / skills.length) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  analytics.typeDistribution = Object.entries(analytics.byType).map(([type, count]) => ({
    name: type,
    value: count,
    percentage: ((count / skills.length) * 100).toFixed(1)
  }));

  return analytics;
};

/**
 * Get color for skill level
 * @param {string} level - Skill level
 * @returns {string} Color hex code
 */
export const getLevelColor = (level) => {
  const colors = {
    'Basic': '#FF9999',
    'Intermediate': '#FFD700',
    'Advanced': '#87CEEB',
    'Expert': '#90EE90'
  };
  return colors[level] || '#CCCCCC';
};

/**
 * Get color for skill type
 * @param {string} type - 'Technical' or 'Soft'
 * @returns {string} Color hex code
 */
export const getTypeColor = (type) => {
  return type === 'Technical' ? '#4A90E2' : '#E24A4A';
};

/**
 * Get a predefined list of technical categories for filtering
 * @returns {Array} Technical categories
 */
export const getTechnicalCategories = () => {
  return TECHNICAL_CATEGORIES;
};
