import { useCV } from '../context/useCV';
import SkillsDashboard from '../components/SkillsDashboard';
import SkillsOverview from '../components/SkillsOverview';
import '../styles/Dashboard.css';

function Dashboard() {
  const { cvData } = useCV();
  const skills = cvData.skills || [];

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h2>Skills Dashboard</h2>
        <p className="subtitle">Track your skills growth and distribution</p>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-main">
          <SkillsDashboard skills={skills} />
        </div>

        <aside className="dashboard-sidebar">
          <SkillsOverview skills={skills} />
        </aside>
      </div>
    </section>
  );
}

export default Dashboard;
