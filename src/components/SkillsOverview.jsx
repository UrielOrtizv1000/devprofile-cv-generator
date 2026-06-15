import { analyzeSkills } from '../utils/skillsAnalytics';
import './SkillsOverview.css';

function SkillsOverview({ skills = [] }) {
  const analytics = analyzeSkills(skills);

  if (analytics.totalSkills === 0) {
    return (
      <div className="skills-overview empty-state">
        <p>No skills to display. Add skills to see analytics.</p>
      </div>
    );
  }

  const getAverageLevelLabel = (avgLevel) => {
    if (avgLevel < 1.5) return 'Basic';
    if (avgLevel < 2.5) return 'Intermediate';
    if (avgLevel < 3.5) return 'Advanced';
    return 'Expert';
  };

  const getMostCommonCategory = () => {
    if (analytics.categoryDistribution.length === 0) return 'N/A';
    return analytics.categoryDistribution[0].name;
  };

  const getTechnicalPercentage = () => {
    const technical = analytics.typeDistribution.find(t => t.name === 'Technical');
    return technical ? technical.percentage : '0';
  };

  return (
    <div className="skills-overview">
      <h3>Skills Overview</h3>
      
      <div className="overview-grid">
        {/* Total Skills */}
        <div className="stat-card">
          <div className="stat-value">{analytics.totalSkills}</div>
          <div className="stat-label">Total Skills</div>
        </div>

        {/* Average Level */}
        <div className="stat-card">
          <div className="stat-value">{getAverageLevelLabel(analytics.averageLevel)}</div>
          <div className="stat-label">Average Level</div>
          <div className="stat-detail">{analytics.averageLevel.toFixed(2)}/4.0</div>
        </div>

        {/* Most Common Category */}
        <div className="stat-card">
          <div className="stat-value">{getMostCommonCategory()}</div>
          <div className="stat-label">Most Common Category</div>
        </div>

        {/* Technical Skills Percentage */}
        <div className="stat-card">
          <div className="stat-value">{getTechnicalPercentage()}%</div>
          <div className="stat-label">Technical Skills</div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="overview-details">
        <div className="details-section">
          <h4>Skills by Level</h4>
          <ul className="detail-list">
            {analytics.levelDistribution.map((item) => (
              <li key={item.name}>
                <span className="label">{item.name}:</span>
                <span className="value">{item.value} ({item.percentage}%)</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h4>Top Categories</h4>
          <ul className="detail-list">
            {analytics.categoryDistribution.slice(0, 5).map((item) => (
              <li key={item.name}>
                <span className="label">{item.name}:</span>
                <span className="value">{item.value} ({item.percentage}%)</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h4>Skill Type Distribution</h4>
          <ul className="detail-list">
            {analytics.typeDistribution.map((item) => (
              <li key={item.name}>
                <span className="label">{item.name}:</span>
                <span className="value">{item.value} ({item.percentage}%)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkillsOverview;
