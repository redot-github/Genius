import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { StudentMenuContext, TeacherMenuContext } from "../../context/teachermenucontext";
import { IoClose } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { removeAuthRec, removeAuthToken } from "../../lib/localstorage";
import { useNavigate } from "react-router-dom";


const StudentHeader = () => {
  //context
  const { openMenu, toggleMenu } = useContext(StudentMenuContext); 
  //state
  const [studentInfo, setstudentInfo] = useState("");
  const [navPop, setNavPop] = useState(false);
  
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = () => {
      setstudentInfo(JSON.parse(localStorage.getItem("STUDENT_DATA")));
    };
    handleStorageChange();
  }, []);

  console.log(studentInfo,'info... teach...');
  const detailHandler = () => {
    setNavPop((prev) => !prev);
  };

  return (

    <div className="genius-header">
      <button
        className="teacher-ham-btn"
        type="button"
        onClick={() => toggleMenu()}
      >
        {openMenu ? <IoClose size={30} /> : <RxHamburgerMenu size={30} />}
      </button>
      <div className="genius-logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/Polygon 3.png`}
          alt="logo"
        />
        <span>Genius</span>
      </div>
      <div className="scl-std" onClick={detailHandler}>
        <img src={studentInfo.photo} width={'40px'} height={'40px'} style ={{borderRadius:"50%"}}alt="student" />
        <span>{studentInfo.name}</span>
      </div>
      {navPop && (
        <>
         <div className="nav-setting-overlay" onClick={() => setNavPop(prev => !prev)}></div>
        <div className="nav-setting">
          <button type="button" onClick={() => setNavPop(false)} className="nav-setting-close-btn">
            <IoClose />
          </button>
          <div className="nav-setting-container">
            <div className="nav-setting-content">
            <div className="nav-setting-header">
              <img
                src={studentInfo.photo}
                alt="profile"
              />
              <p>{studentInfo.name}</p>
              <span>{studentInfo.studentId}</span>
            </div>
            <div className="nav-setting-controls">
              <button type="button" className="nav-setting-button" onClick={() => {
            navigate("/student-changepassword");
          }}>
                <RiLockPasswordLine />
                Change Password
              </button>
              <button type="button" className="nav-setting-button"  onClick={() => {
            removeAuthToken();
            removeAuthRec();
            navigate("/student-login");
          }}>
                <AiOutlineLogout />
                Logout
              </button>
            </div>
            </div>
          </div>
        </div>
        </>
      )
      }
    </div>
   
  );
};
export default StudentHeader;
