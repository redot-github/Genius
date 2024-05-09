import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TeacherMenuContext } from "../../context/teachermenucontext";
import { IoClose } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { removeAuthRec, removeAuthToken } from "../../lib/localstorage";
import { useNavigate } from "react-router-dom";


const TeacherHeader = () => {
  //context
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);
  //state
  const [teacherInfo, setTeacherInfo] = useState("");
  const [navPop, setNavPop] = useState(false);

  console.log(openMenu,'open...', toggleMenu,'toggle...');
  
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = () => {
      setTeacherInfo(JSON.parse(localStorage.getItem("TEACHER_DATA")));
    };
    handleStorageChange();
  }, []);

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
        <img src={teacherInfo.teacherphoto} width={'40px'} height={'40px'} style ={{borderRadius:"50%"}}alt="student" />
        <span>{teacherInfo.name}</span>
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
                src={teacherInfo.teacherphoto}
                alt="profile"
              />
              <p>{teacherInfo.name}</p>
              <span>{teacherInfo.teacherId}</span>
            </div>
            <div className="nav-setting-controls">
              <button type="button" className="nav-setting-button" onClick={() => {
            navigate("/teacher-changepassword");
          }}>
                <RiLockPasswordLine />
                Change Password
              </button>
              <button type="button" className="nav-setting-button"  onClick={() => {
            removeAuthToken();
            removeAuthRec();
            navigate("/teacher-login");
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
export default TeacherHeader;
