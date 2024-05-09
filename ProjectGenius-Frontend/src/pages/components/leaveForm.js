import React, { useState, useEffect } from "react";
import toastAlert from "../../lib/toast";
import { applyLeave, leaveAllocateEdit, leaveDisplay, singleAllocateDisplay } from "../../actions/adminAction";

const LeaveForm = ({ closePopup }) => {
  const [formValue, setFormValue] = useState({
    employeeId: "",
    name: "",
    fromDate: "",
    toDate: "",
    numofDays: "",
    reason: "",
    leaveType: "",
  });

  const [casualLeaveBalance, setCasualLeaveBalance] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormValue = { ...formValue, [name]: value };

    if (name === "fromDate" || name === "toDate") {
      const from = new Date(newFormValue.fromDate);
      const to = new Date(newFormValue.toDate);
      const differenceInTime = to.getTime() - from.getTime();
      const differenceInDays =
        Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;

      newFormValue = {
        ...newFormValue,
        numofDays: isNaN(differenceInDays) ? "" : differenceInDays,
      };
    }
    setFormValue(newFormValue);
  };

  const fetchLeaveAllocationData = async () => {
    try {
      const teacherData = JSON.parse(localStorage.getItem("TEACHER_DATA"));
      const formData = {
        ...formValue,
        employeeId: teacherData ? teacherData.teacherId : "",
        name: teacherData ? teacherData.name : "",
        approval: "Applied",
      };
      const singleAllocateDetails = await singleAllocateDisplay(formData.employeeId);
      const leaveAllocationData = singleAllocateDetails.result
      const casualLeaveBal = leaveAllocationData ? leaveAllocationData.casualLeave : 0;
      setCasualLeaveBalance(casualLeaveBal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaveAllocationData();
  }, []);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = currentDate.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fromDate, toDate, reason, leaveType, numofDays } = formValue;

    if (!fromDate || !toDate || !reason || !leaveType || !numofDays) {
      toastAlert('error', 'Please fill all the fields');
      return;
    }

    try {
      const teacherData = JSON.parse(localStorage.getItem("TEACHER_DATA"));
      const formData = {
        ...formValue,
        employeeId: teacherData ? teacherData.teacherId : "",
        name: teacherData ? teacherData.name : "",
        approval: "Applied",
      };

      const response = await leaveDisplay(formData);
      console.log(response,'date....');
      if (response.status === true) {
        toastAlert("success", response.message);
      } else {
        if (response.status === false) {
          toastAlert("error", response.message);
        } else if (response.message) {
          toastAlert("error", response.message);
        } else {
          console.log("An error occurred:", response);
        }
        return;
      }

      const singleAllocateDetails = await singleAllocateDisplay(formData.employeeId);
      const leaveAllocationData = singleAllocateDetails.result
      let casualLeave = leaveAllocationData ? leaveAllocationData.casualLeave : 0;
      let medicalLeave = leaveAllocationData ? leaveAllocationData.medicalLeave : 0;
      let paternityLeave = leaveAllocationData ? leaveAllocationData.paternityLeave : 0;
      let unpaidLeave = leaveAllocationData ? leaveAllocationData.unpaidLeave : 0;

      switch (leaveType) {
        case "Casual":
          if (casualLeave >= parseInt(numofDays)) {
            casualLeave -= parseInt(numofDays);
          } else {
            toastAlert("error", "Not enough casual leave balance available.");
            return;
          }
          break;
        case "Medical":
          if (medicalLeave >= parseInt(numofDays)) {
            medicalLeave -= parseInt(numofDays);
          } else {
            toastAlert("error", "Not enough medical leave balance available.");
            return;
          }
          break;
        case "Paternity":
          if (paternityLeave >= parseInt(numofDays)) {
            paternityLeave -= parseInt(numofDays);
          } else {
            toastAlert("error", "Not enough paternity leave balance available.");
            return;
          }
          break;
        case "LOP":
          unpaidLeave += parseInt(numofDays);
          break;
        default:
          break;
      }

      formData.casualLeave = casualLeave;
      formData.medicalLeave = medicalLeave;
      formData.paternityLeave = paternityLeave;
      formData.unpaidLeave = unpaidLeave;

      const { message, status} = await applyLeave(formData);
      if (status === true) {
        await leaveAllocateEdit(formData);
        toastAlert("success", message);
        closePopup();
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      toastAlert("error", "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="teacher-attendance"
         style={{
           boxShadow: "1px 3px 10px 4px #00000040",
           background: "rgb(247, 247, 248)",
         }}
    >
      <div className="monthly-content">
        <h2>Leave Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="fromDate">From Date:</label>
              <input type="date"
                     name="fromDate"
                     id="fromDate"
                     value={formValue.fromDate}
                     onChange={handleChange}
                     min={getCurrentDate()}
              />
            </div>
            <div className="route-allocate-input">
              <label htmlFor="numofDays">Number of Days:</label>
              <input type="text"
                     name="numofDays"
                     id="numofDays"
                     value={formValue.numofDays}
                     onChange={handleChange}
              />
            </div>
          </div>

          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="toDate">To Date:</label>
              <input type="date"
                     name="toDate"
                     id="toDate"
                     value={formValue.toDate}
                     min={formValue.fromDate}
                     onChange={handleChange}
              />
            </div>

            <div className="route-allocate-input">
              <label htmlFor="approval">Leave Type:</label>
              <select name="leaveType"
                      id="leaveType"
                      value={formValue.leaveType}
                      onChange={handleChange}
              >
                <option></option>
                <option value="Medical">Medical</option>
                <option value="Casual">Casual</option>
                <option value="Paternity">Paternity</option>
                {casualLeaveBalance === 0 && <option value="LOP">LOP</option>}
              </select>
            </div>
          </div>

          <div className="route-allocate-input" style={{ width: "100%", marginRight: "50px" }}>
            <label htmlFor="reason">Reason:</label>
            <textarea name="reason"
                      id="reason"
                      value={formValue.reason}
                      onChange={handleChange}
            />
          </div>

          <div className="btnn center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
