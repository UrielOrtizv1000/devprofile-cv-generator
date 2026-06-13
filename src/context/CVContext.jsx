import { createContext, useState, useEffect, useContext } from 'react';

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
  professionalLinks: [],
};

const CVContext = createContext();

export function CVProvider({ children }) {
  // initialize state from localStorage if available
  const [cvData, setCvData] = useState(() => {
    try {
      const savedData = localStorage.getItem('cvData');
      return savedData ? JSON.parse(savedData) : initialCVData;
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

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
