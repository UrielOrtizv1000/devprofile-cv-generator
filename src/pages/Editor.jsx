import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import EducationForm from '../components/forms/EducationForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import LanguagesForm from '../components/forms/LanguagesForm';

function Editor() {
  return (
    <section className="editor" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>CV Editor</h2>
      <p>Fill in your details below to update your CV.</p>
      
      <PersonalDetailsForm />
      <SkillsForm />
      <ProjectsForm />
      <EducationForm />
      <CertificationsForm />
      <ExperienceForm />
      <LanguagesForm />
      
    </section>
  )
}

export default Editor
