import { createContext, useState, useContext } from 'react';

// initial empty structure for the CV data
const initialCVData = {
  personalData: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    about: '',
  },
  profileImage: '',
  skills: [],
  projects: [],
  education: [],
  experience: [],
  languages: [],
  professionalLinks: [],
};

const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState(initialCVData);

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
