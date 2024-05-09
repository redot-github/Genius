import { createContext, useEffect, useState } from "react";

export const TeacherMenuContext = createContext();
export const StudentMenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState('');

  console.log(teacherInfo, 'test')

  const toggleMenu = () => {
    setOpenMenu(prev => !prev);
  }; 

  useEffect(() => {
    const handleStorageChange = () => {
      setTeacherInfo(JSON.parse(localStorage.getItem('TEACHER_DATA')));
    };
    handleStorageChange()
  }, []);

  console.log(teacherInfo,'contextData....');
  return (
    <TeacherMenuContext.Provider value={{ openMenu, toggleMenu, teacherInfo, setTeacherInfo }}>
    <StudentMenuContext.Provider value={{ openMenu, toggleMenu, teacherInfo, setTeacherInfo }}>
      {children}
      </StudentMenuContext.Provider>
      </TeacherMenuContext.Provider>
  );
};
