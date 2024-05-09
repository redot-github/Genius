import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leaveDisplay } from "../../actions/adminAction";
import Sidebar from "../components/sidebar";
import LeaveApproval from "../leaveApproval";

const LeaveDetails = () => {
  const navigate = useNavigate();
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState({
    approvalPage: false,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);

  const getData = async () => {
    try {
      let { status, result } = await leaveDisplay();

      if (status) {
        const vehicleData = result.filter((each) => each.active === 1);
        setLoaderView(false);
        setData(vehicleData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ApprovingLeave = (data) => {
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

  const renderUserView = () => {
    if (loaderView) {
      return (
        <div className="loader-view-container">
          <div className="spinner-box">
            <div className="pulse-container">
              <div className="pulse-bubble pulse-bubble-1"></div>
              <div className="pulse-bubble pulse-bubble-2"></div>
              <div className="pulse-bubble pulse-bubble-3"></div>
            </div>
          </div>
        </div>
      );
    }

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

    return (
      <>
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
                <th>Type</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="std-row" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.employeeId}</td>
                  <td>{item.name}</td>
                  <td>{item.currentDate}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.numofDays}</td>
                  <td>{item.leaveType}</td>
                  <td>{item.reason}</td>
                  <td onClick={() => ApprovingLeave(item)}>
                    <span
                      className="due2"
                      style={{ color: getApprovalColor(item.approval) }}
                    >
                      {item.approval}
                    </span>
                  </td>
                  {/* <td onClick={() => setShowPopup({ approvalPage: true })}>
                    <span
                      className="due2"
                      style={{ color: getApprovalColor(item.approval) }}
                    >
                      {item.approval}
                    </span>
                  </td> */}
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
                setShowPopup((prev) => ({ ...prev, approvalPage: false }))
              }
              selectedRecord={selectedRecord}
            ></div>
            <div className="schedule-pop-container">
              <LeaveApproval id={selectedRecord} />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Employee Leave Management System</p>
          </div>
          <div className="middle-header-right">
            <input type="search" placeholder="search" />
          </div>
        </div>
        {renderUserView()}
      </div>
    </div>
  );
};

export default LeaveDetails;
