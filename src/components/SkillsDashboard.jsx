import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { analyzeSkills, getLevelColor, getTypeColor } from '../utils/skillsAnalytics';
import './SkillsDashboard.css';

function SkillsDashboard({ skills = [] }) {
  const analytics = analyzeSkills(skills);

  if (analytics.totalSkills === 0) {
    return (
      <div className="skills-dashboard empty-state">
        <div className="empty-message">
          <h3>No Skills Added Yet</h3>
          <p>Add skills to see visualizations and analytics on this dashboard.</p>
        </div>
      </div>
    );
  }

  const levelColors = analytics.levelDistribution.map(item => getLevelColor(item.name));
  const typeColors = analytics.typeDistribution.map(item => getTypeColor(item.name));

  return (
    <div className="skills-dashboard">
      <div className="dashboard-grid">
        {/* Skill Levels Distribution - Pie Chart */}
        <div className="chart-container">
          <h3>Skill Levels Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.levelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.levelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={levelColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} skill(s)`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Categories Distribution - Bar Chart */}
        <div className="chart-container">
          <h3>Top Skill Categories</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => `${value} skill(s)`} />
                <Bar dataKey="value" fill="#4A90E2" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical vs Soft Skills - Pie Chart */}
        <div className="chart-container">
          <h3>Technical vs Soft Skills</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={typeColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} skill(s)`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Level Distribution (Detailed) - Bar Chart */}
        <div className="chart-container">
          <h3>Level Distribution Details</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.levelDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} skill(s)`} />
                <Bar dataKey="value" fill="#82ca9d" radius={[8, 8, 0, 0]}>
                  {analytics.levelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={levelColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsDashboard;
