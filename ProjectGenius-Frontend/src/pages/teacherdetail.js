import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
//import Actions
import {
  findAttendance,
  findschedulefordetails,
  getSingleteacher,
} from "../actions/adminAction";
//import Components
import Attendance from "./components/attendance";
import Sidebar from "./components/sidebar";

const TeacherDetail = () => {
  const [data, setData] = useState("");
  const [schedule, setSchedule] = useState("");
  const [Class, setClass] = useState({});
  const [currentDaySchedule, setCurrentDaySchedule] = useState([]);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [AttendanceView, setAttendanceView] = useState("");
  //params
  const { Id } = useParams();

  const navigate = useNavigate();

  const getData = async (id) => {
    try {
      let { status, result } = await getSingleteacher(id);
      if (status == true) {
        setData(result);
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };
  useEffect(() => {
    getData(Id);
  }, []);

  const getSchedule = async () => {
    try {
      const Scheduledata = {
        teacherId: data.teacherId,
      };
      console.log(Scheduledata, "---sch");
      let { status, result, result2 } = await findschedulefordetails(
        Scheduledata
      );
      console.log(result2, "---result2");
      if (status == true) {
        setSchedule(result);
        setClass(result2.status);
      }
    } catch (err) {
      console.log(err, "---err");
    }
  };
  useEffect(() => {
    getSchedule();
  }, [data.teacherId]);
  console.log(schedule, "---schedule");
  console.log(Class, "---Class");
  useEffect(() => {
    // Process the schedule data when it changes
    if (schedule && schedule.schedule) {
      const processedData = schedule.schedule.map((dayData) => {
        const { day, periods } = dayData;
        const processedPeriods = Object.values(periods).filter(
          (period) => period.class && period.subject
        );
        return { day, periods: processedPeriods };
      });
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const currentDayData = processedData.find(
        (dayData) => dayData.day.toLowerCase() === today.toLowerCase()
      );
      setCurrentDaySchedule(currentDayData || []);
    }
  }, [schedule]);

  const handlePopUp = () => {
    setOpenAttendance((prevState) => !prevState);
  };

  const getAttendance = async () => {
    try {
      const attendata = {
        date: new Date().toLocaleDateString(),
      };
      let { status, result } = await findAttendance(attendata);
      if (status === true) {
        setAttendanceView(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);
  console.log(AttendanceView, "----View");

  const IndividualAttendanceView =
    AttendanceView && AttendanceView.attendance && AttendanceView.attendance
      ? AttendanceView.attendance.find(
          (each) => data.teacherId === each.teacherId
        )
      : null;
  const StatusView =
    IndividualAttendanceView && IndividualAttendanceView
      ? IndividualAttendanceView.status
      : null;
  console.log(StatusView, "----sview");

  const Thismonth = new Date().toLocaleString("en-US", { month: "long" });
  const Today = new Date().toLocaleDateString();
  return (
    <>
      <div className="teacher">
        <Sidebar Id={Id} />
        <div className="teacher-content" style={{ background: "#f7f7f8" }}>
          <div className="header">
            <div className="l-header">
              <p>Teacher Details</p>
            </div>
          </div>
          <div className="teacher-docs">
            <div className="left-docs">
              <div className="doc-profile">
                <div>
                  <img src={data.teacherphoto} />
                </div>
                <div className="tchr-name">
                  <p>{data.name}</p>
                  <p>Subjects Handling</p>
                  <p>{data.subjects}</p>
                </div>
                <div className="tchr-adrs">
                  <div className="ad">
                    <i className="fa fa-phone" />
                    <span>(+91){data.phoneNumber}</span>
                  </div>
                  <div className="ad">
                    <i className="fa fa-envelope-o" />
                    <span>{data.email}</span>
                  </div>
                  <div className="ad">
                    <i className="fa fa-address-card-o" />
                    <span>{data.permanentaddress}</span>
                  </div>
                </div>
              </div>
              <div className="doc-details">
                <div className="abt" style={{ marginTop: 35 }}>
                  <h3>About</h3>
                  <p>
                    Dedicated to fostering a passion for learning and
                    encouraging intellectual growth in students, I am committed
                    to delivering a dynamic and engaging educational experience.
                  </p>
                  <p>
                    My teaching philosophy revolves around instilling critical
                    thinking, creativity, and a thirst for knowledge.
                  </p>
                </div>
                <div className="abt">
                  <h3>Education</h3>
                  <ul>
                    <li>{data.higherqualification} 2013-2017</li>
                    <li>{data.teachingcertificates} 2013-2017</li>
                  </ul>
                </div>
                <div className="abt">
                  <h3>Expertise</h3>
                  <p>
                    World History, Philosophy, Prehistoric, Culture, Ancient
                  </p>
                </div>
              </div>
            </div>
            {/* )
      })} */}
            <div className="right-docs">
              <div className="assign-task">
                <button type="button">
                  <Link
                    to={"/teacherschedule/" + data._id}
                    style={{ textDecoration: "none", color: "deeppink" }}
                  >
                    + Assign Task
                  </Link>
                </button>
              </div>
              <div className="attendan att">
                <div>
                  <p style={{ color: "#ff3672" }}>Attendance</p>
                  <button
                    type="button"
                    className="att-button"
                    onClick={handlePopUp}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ marginRight: 8 }}
                    />
                    View
                  </button>
                </div>
                <ul className="attendancelist">
                  {AttendanceView && AttendanceView ? (
                    <>
                      <li className="monthrow">Month:{AttendanceView.month}</li>
                      <li className="daterow">Date:{AttendanceView.date}</li>
                      <li
                        style={
                          StatusView && StatusView === "Present"
                            ? { color: "#0fc478" }
                            : { color: "red" }
                        }
                      >
                        Status:{" "}
                        <span
                          className={
                            StatusView && StatusView === "Present"
                              ? "due2"
                              : "grade"
                          }
                        >
                          {StatusView}
                        </span>{" "}
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="monthrow">Month:{Thismonth}</li>
                      <li className="daterow">Date:{Today}</li>
                      <li>
                        Status: <span className="due2">Waiting...</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="attendan sch">
                <p style={{ color: "#4a86f9" }}>Schedule</p>
                {currentDaySchedule && currentDaySchedule.day ? (
                  <div>
                    <p>Day:{currentDaySchedule.day}</p>
                    {currentDaySchedule.periods &&
                    currentDaySchedule.periods.length > 0 ? (
                      <div className="schedule-list">
                        <ul>
                          {currentDaySchedule.periods.map(
                            (period, periodIndex) => (
                              <li key={periodIndex}>
                                {`${period.class}(${period.section}) - ${period.subject}`}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ) : (
                      <ul>
                        <li>Free period</li>
                        <li>Free period</li>
                        <li>Free period</li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <>
                    <p>Day:Sunday</p>
                    <div className="schedule-list">
                      <ul>
                        <li>It's Holiday Buddy..!</li>
                        <li>It's Holiday Buddy..!</li>
                        <li>It's Holiday Buddy..!</li>
                      </ul>
                    </div>
                  </>
                )}
                <button
                  className="schedule"
                  onClick={() => {
                    navigate("/teachertimetable/" + data.teacherId);
                  }}
                >
                  <i className="fa fa-eye" style={{ marginRight: 8 }} />
                  View
                </button>
              </div>
              <div className="attendan perform">
                <p style={{ color: "#10c87b" }}>Teacher Status</p>
                <div className="perform-content">
                  <table className="status-table">
                    <tr>
                      <th>Grade</th>
                      <th>Role</th>
                      <th>Subject</th>
                    </tr>
                    {Class && Class.length > 0 ? (
                      Class.map((item, key) => {
                        return (
                          <tr className="status-table-row">
                            <td>
                              {item.className}-{item.section}
                            </td>
                            <td>{item.role}</td>
                            <td>{item.subjects}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="status-table-row">
                        <td>className-section</td>
                        <td>role</td>
                        <td>subjects</td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
              <div className="attendan att">
                <p style={{ color: "#10c87b" }}>Bus Route Allocation</p>
                <div className="perform-content">
                  <table className="status-table">
                    <tr>
                      <th>Bus No</th>
                      <th>Bus Route</th>
                    </tr>
                    {Class && Class.length > 0 ? (
                      Class.map((item, key) => {})
                    ) : (
                      <tr className="status-table-row">
                        <td>{data.vehicleRegisterNumber}</td>
                        <td>{data.vehicleRoute}</td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAttendance && (
        <div className="claender-container">
          <div
            className="calender-over-lay"
            onClick={() => handlePopUp()}
          ></div>
          {/* <button type="button" onClick={handlePopUp} className="calender-close"> */}
          {/* </button> */}
          <div style={{ width: "50%" }}>
            <Attendance TeacherId={data.teacherId} Month={Thismonth} />
          </div>
        </div>
      )}
    </>
  );
};
export default TeacherDetail;
