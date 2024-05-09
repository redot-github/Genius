import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
//import Lib
import { removeAuthRec, removeAuthToken } from "../../lib/localstorage";
//import Context
import { TeacherMenuContext } from "../../context/teachermenucontext";


const Studentsidebar = () => {
  const { openMenu, toggleMenu } = useContext(TeacherMenuContext);
  //hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
     
      <div className={`side-menu-content ${openMenu ? "open" : "close"}`}>
        <div className="att-part-one">
          <div className="att-menu">
            <span>Track</span>
            <p
              className="am"
              style={
                pathname === "/teacher-dashboard"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => toggleMenu()}
            >
              <Link to="/teacher-dashboard">
                <img
                  src={`${process.env.PUBLIC_URL}/images/dashboard.png`}
                  alt="dashboard"
                />
                Dashboard
              </Link>
            </p>
          </div>
          <div className="att-menu">
            <span>Analyze</span>
            <p
              className="am"
              style={
                pathname === "/teacher-attendance"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => toggleMenu()}
            >
              <Link to="/teacher-attendance">
                <img
                  src={`${process.env.PUBLIC_URL}/images/sheet.png`}
                  alt="attendance"
                  style={{ marginRight: "18px" }}
                />
                Attendance Sheet
              </Link>
            </p>
            <p
              className="am"
              style={
                pathname === "/Studentleavestatus"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => toggleMenu()}
            >
              <Link to="/Studentleavestatus">
                <img
                  src={`${process.env.PUBLIC_URL}/images/sheet.png`}
                  alt="attendance"
                  style={{ marginRight: "18px" }}
                />
                My Leave
              </Link>
            </p>
            <p
              className="am"
              style={
                pathname === ("/teacher-marksheet")
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => toggleMenu()}
            >
              <Link to="/teacher-marksheet" className="report">
                <img
                  src={`${process.env.PUBLIC_URL}/images/report.png`}
                  alt="report"
                />
                Report Card
                <span>
                  {pathname === ("/teacher-marksheet") || pathname === ("/teacher-generatecard") ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropright size={20} />
                  )}
                </span>
              </Link>
            </p>
            {pathname === ("/teacher-marksheet") || pathname === ("/teacher-generatecard") ? (
              <p className="am"
              style={
                pathname === "/teacher-generatecard"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
              onClick={() => toggleMenu()}>
                <Link to="/teacher-generatecard" className="report ms-3">
                  <span><FaRegEdit size={25} /></span>
                  Generate Report
                </Link>
              </p>
            ) : null}
          </div>
          {/* <div className="att-menu">
            <span>Manage</span>
            <p
              className="am"
              style={
                pathname === "/teacher-student"
                  ? { backgroundColor: "#f9f6b8" }
                  : {}
              }
            >
              <Link to="/teacher-student" className="child">
                <img
                  src={`${process.env.PUBLIC_URL}/images/child.png`}
                  alt="Student"
                />
                Student
              </Link>
            </p>
          </div> */}
        </div>
        <button
          data-bs-toggle="tooltip"
          title="Logout!"
          data-bs-placement="right"
          className="teachersignout"
          onClick={() => {
            removeAuthToken();
            removeAuthRec();
            navigate("/teacher-login");
          }}
        >
          Logout
          <span>
            <FontAwesomeIcon icon={faSignOut} />
          </span>
        </button>
      </div>
      <div className={`side-menu-overlay ${openMenu ? "open" : "close"}`} onClick={() => toggleMenu()}></div>
    </>
  );
};
export default Studentsidebar;
