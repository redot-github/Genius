import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import LeaveApproval from "../leaveApproval";
import { leaveDisplay } from "../../actions/adminAction";
import AlertConfirm, { Button } from "react-alert-confirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

//Components
import TeacherHeader from "../components/teachernavbar";
import TeacherSidebar from "../components/teachersidebar";
//Actions
import { Dailyattendance, findsection } from "../../actions/teacherAction";
//Lib
import toastAlert from "../../lib/toast";
import EmployeeleaveEdit from "../employeeleaveEdit";

const Teacherleaveappliedlist = () => {
  const navigate = useNavigate();
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState({
    approvalPage: false,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const getData = async () => {
    try {
      let { status, result } = await leaveDisplay();

      if (status) {
        const teacherData = JSON.parse(localStorage.getItem("TEACHER_DATA"));
        const teacherId = teacherData ? teacherData.teacherId : "";
        const teacherLeaveData = result.filter(
          (leave) => leave.employeeId === teacherId && leave.active === 1
        );
        setLoaderView(false);
        setData(teacherLeaveData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editVehicle = (data) => {
    const {
      _id,
      employeeId,
      name,
      fromDate,
      toDate,
      numofDays,
      reason,
      approval,
      leaveType,
      reasonDecline,
    } = data;

    localStorage.setItem("id", _id);
    localStorage.setItem("employeeId", employeeId);
    localStorage.setItem("name", name);
    localStorage.setItem("fromDate", fromDate);
    localStorage.setItem("toDate", toDate);
    localStorage.setItem("numofDays", numofDays);
    localStorage.setItem("reason", reason);
    localStorage.setItem("approval", approval);
    localStorage.setItem("leaveType", leaveType);
    localStorage.setItem("reasonDecline", reasonDecline);
    setSelectedRecord(_id);
    setShowPopup({ approvalPage: true });
  };

  const getApprovalColor = (status) => {
    switch (status) {
      case "Applied":
        return "blue";
      case "Accept":
        return "green";
      case "Pending":
        return "orange";
      case "Decline":
        return "red";
      default:
        return "black";
    }
  };

  useEffect(() => {
    const currentDate = new Date().getMonth() + 1;
    setSelectedMonth(currentDate.toString());
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterDataByMonth = (month) => {
    setSelectedMonth(month);
  };

  const filteredData = selectedMonth
    ? data.filter(
        (item) =>
          new Date(item.fromDate).getMonth() + 1 === Number(selectedMonth)
      )
    : [];

  const closepopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="attendance">
        <TeacherHeader />
        <div className="attendance-content">
          <TeacherSidebar />
          <div className="att-sheet">
            <h2 className="dashboard-title">My Leave Applied Status</h2>
            <select
              name="Month"
              onChange={(e) => filterDataByMonth(e.target.value)}
              value={selectedMonth}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            {selectedMonth && (
              <div className="class-details">
                <div className="std-table">
                  <table className="std-info">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Teacher ID</th>
                        <th>Name</th>
                        <th>Applied Date</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>No Of Days</th>
                        <th>Reason</th>
                        <th>Admin-Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr className="std-row" key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.employeeId}</td>
                          <td>{item.name}</td>
                          <td>{item.currentDate}</td>
                          <td>{item.fromDate}</td>
                          <td>{item.toDate}</td>
                          <td>{item.numofDays}</td>
                          <td>{item.reason}</td>
                          <td>{item.reasonDecline}</td>
                          <td>
                            <span
                              className="due2"
                              style={{
                                color: getApprovalColor(item.approval),
                              }}
                            >
                              {item.approval}
                            </span>
                          </td>
                          <div className="dropdown">
                            <FontAwesomeIcon
                              icon={faEllipsis}
                              className="dropdown-toggle"
                              data-bs-toggle="dropdown"
                            />
                            <ul
                              className="dropdown-menu"
                              style={{ background: "#fafafa" }}
                            >
                              <li className="edit-box">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  style={{ color: "blue" }}
                                  onClick={() => editVehicle(item)}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    style={{ color: "blue" }}
                                  />
                                  Edit
                                </a>
                              </li>
                            </ul>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showPopup.approvalPage && selectedRecord && (
                  <div className="teacher-schedule-pop">
                    <div
                      className="schedule-pop-overlay"
                      onClick={() =>
                        setShowPopup((prev) => ({
                          ...prev,
                          approvalPage: false,
                        }))
                      }
                      selectedRecord={selectedRecord}
                    ></div>
                    <div className="schedule-pop-container">
                      <EmployeeleaveEdit
                        id={selectedRecord}
                        closepopup={closepopup}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {!selectedMonth && (
              <>
                <div className="class-details">
                  <div className="std-table">
                    <table className="std-info">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Teacher ID</th>
                          <th>Name</th>
                          <th>Applied Date</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>No Of Days</th>
                          <th>Reason</th>
                          <th>Admin-Reason</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacherleaveappliedlist;