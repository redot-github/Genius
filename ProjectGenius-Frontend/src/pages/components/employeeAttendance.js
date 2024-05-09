import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Payrollfilter from "../components/payrollFilter";
import { leaveDisplay, viewDriver, viewTeacher } from "../../actions/adminAction";

const EmployeeAttendance = () => {
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const getData = async () => {
    try {
      let result = [];

      if (selectedCategory === "teacherId" || selectedCategory === "All") {
        const [teacherData, leaveData] = await Promise.all([
          viewTeacher(),
          leaveDisplay(),
        ]);

        if (teacherData.status && leaveData.status) {
          const totalDaysMap = {};

          leaveData.result.forEach((leaveItem) => {
            if (leaveItem.approval === "Accept") {
              totalDaysMap[leaveItem.employeeId] =
                (totalDaysMap[leaveItem.employeeId] || 0) +
                parseInt(leaveItem.numofDays);
            }
          });

          result = teacherData.result.map((teacherItem) => ({
            category: "Teacher",
            employeeId: teacherItem.teacherId,
            name: teacherItem.name,
            currentSalary: teacherItem.currentsalary,
            numofDays: totalDaysMap[teacherItem.teacherId] || "-",
          }));
        }
      }

      if (selectedCategory === "driverId" || selectedCategory === "All") {
        const driverData = await viewDriver();

        if (driverData.status) {
          result = [
            ...result,
            ...driverData.result.map((driverItem) => ({
              category: "Driver",
              employeeId: driverItem.driverId,
              name: driverItem.name,
              currentSalary: driverItem.currentsalary,
              numofDays: 0,
            })),
          ];
        }
      }

      setLoaderView(false);
      setData(result);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  const handleLeavePopup = () => {
    setShowPopup(true);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const clear = () => {
    setData([]);
    setSelectedCategory(null);
    setSelectedDate("");
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString('default', { month: 'short' });
    const year = formattedDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = async () => {
    try {
      let result = [];

      if (selectedCategory === "teacherId" || selectedCategory === "All") {
        const [teacherData, leaveData] = await Promise.all([
          viewTeacher(),
          leaveDisplay(),
        ]);

        if (teacherData.status === true && leaveData.status === true) {
          result = teacherData.result.map((teacherItem) => {
            const leaveForSelectedDate = leaveData.result.filter(
              (leaveItem) => leaveItem.employeeId === teacherItem.teacherId
            );

            const selectedDateFormat = formatDate(selectedDate);

            const leaveDatesText = leaveForSelectedDate.flatMap((leaveItem) =>
              leaveItem.leaveDates.map((dateObj) => dateObj.date)
            );

            const leaveDates = leaveDatesText.filter(
              (date) => date === selectedDateFormat
            );

            return {
              category: "Teacher",
              employeeId: teacherItem.teacherId,
              name: teacherItem.name,
              currentSalary: teacherItem.currentSalary,
              leaveDates:
                leaveDates.length > 0 ? "Leave" : "-  ",
            };
          });
        }
      }

      setData(result);
    } catch (error) {
      console.error("Error occurred while processing data:", error);
    }
  };

  const renderUserView = () => {
    return (
      <div className="std-table">
        {showPopup && (
          <div className="teacher-schedule-pop">
            <div
              className="schedule-pop-overlay"
              onClick={() => setShowPopup(false)}
            ></div>
            <div className="schedule-pop-container">
              <Payrollfilter
                onSelectCategory={handleSelectCategory}
                closepopup={() => setShowPopup(false)}
              />
            </div>
          </div>
        )}
        <table className="std-info">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Leave Dates</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="std-row" key={index}>
                <td>{index + 1}</td>
                <td>{item.employeeId}</td>
                <td>{item.name}</td>
                <td>{item.leaveDates || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Pay-Roll List</p>
          </div>
          <button className="tchr-month-att-btn" onClick={handleLeavePopup}>
            Show Payroll Table
          </button>
          <button className="tchr-month-att-btn" onClick={clear}>
            Clear
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              handleSubmit();
            }}
          />
          <div className="middle-header-right">
            <input type="search" placeholder="search" />
          </div>
        </div>
        {renderUserView()}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
