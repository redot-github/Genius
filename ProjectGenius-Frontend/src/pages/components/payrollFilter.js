import React, { useState } from "react";

const Payrollfilter = ({ onSelectCategory, closepopup, onSelectMonth }) => {
  const [formValue, setFormValue] = useState({
    leaveType: "",
    month: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { leaveType, month } = formValue;
    if (
      leaveType === "teacherId" ||
      leaveType === "driverId" ||
      leaveType === "All"
    ) {
      onSelectCategory(leaveType);
      onSelectMonth(month); 
      closepopup();
    }
  };

  return (
    <div className="teacher-attendance">
      <div className="monthly-content">
        <h2>Select Category And Month</h2>
        <form onSubmit={handleSubmit}>
          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="leaveType">Category</label>
              <select
                name="leaveType"
                id="leaveType"
                value={formValue.leaveType}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="teacherId">Teacher</option>
                <option value="driverId">Driver</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
          <div className="route-allocate-part-two">
            <div className="route-allocate-input">
              <label htmlFor="month">Month</label>
              <select
                name="month"
                value={formValue.month}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
          <div className="btnn center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payrollfilter;
