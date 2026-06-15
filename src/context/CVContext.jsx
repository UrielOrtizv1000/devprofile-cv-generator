import { useState, useEffect } from 'react';
import { CVContext } from './CVContextCore';

// initial empty structure for the CV data
const initialCVData = {
  personalData: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    github: '',
    linkedin: '',
    portfolio: '',
  },
  profileImage: '',
  skills: [],
  projects: [],
  education: [],
  certifications: [],
  experience: [],
  languages: [],
  // GitHub, LinkedIn and portfolio live in personalData for now.
  // Keep this reserved field for compatibility with older saved CV data.
  professionalLinks: [],
};

const normalizeTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.map((tech) => String(tech).trim()).filter(Boolean);
  }

  if (typeof technologies === 'string') {
    return technologies.split(',').map((tech) => tech.trim()).filter(Boolean);
  }

  return [];
};

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeCVData = (data) => {
  const savedData = data && typeof data === 'object' ? data : {};

  return {
    ...initialCVData,
    ...savedData,
    personalData: {
      ...initialCVData.personalData,
      ...(savedData.personalData || {}),
    },
    profileImage: typeof savedData.profileImage === 'string' ? savedData.profileImage : '',
    skills: normalizeArray(savedData.skills),
    projects: normalizeArray(savedData.projects).map((project) => ({
      ...project,
      technologies: normalizeTechnologies(project?.technologies),
    })),
    education: normalizeArray(savedData.education),
    certifications: normalizeArray(savedData.certifications),
    experience: normalizeArray(savedData.experience),
    languages: normalizeArray(savedData.languages),
    professionalLinks: normalizeArray(savedData.professionalLinks),
  };
};

export function CVProvider({ children }) {
  // initialize state from localStorage if available
  const [cvData, setCvData] = useState(() => {
    try {
      const savedData = localStorage.getItem('cvData');
      return savedData ? normalizeCVData(JSON.parse(savedData)) : initialCVData;
    } catch (error) {
      console.error('error reading from local storage', error);
      return initialCVData;
    }
  });

  // save to localStorage whenever cvData changes
  useEffect(() => {
    try {
      localStorage.setItem('cvData', JSON.stringify(cvData));
    } catch (error) {
      console.error('error saving to local storage', error);
    }
  }, [cvData]);

  // function to update specific parts of the CV
  const updateCVData = (section, data) => {
    setCvData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <CVContext.Provider value={{ cvData, updateCVData }}>
      {children}
    </CVContext.Provider>
  );
}
