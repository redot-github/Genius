import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toastAlert from "../../lib/toast";
import { employesalaryform } from "../../actions/adminAction";

const PayrollForm = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(1);

  const [formValue, setFormValue] = useState({
    employeeId: "",
    name: "",
    salaryMonthYear: "",
    salary: "",
    grossSalary: "",
    lop: "",
    netSalary: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormValue = { ...formValue, [name]: value };
  
    const salary = parseFloat(newFormValue.salary);
    const grossSalary = parseFloat(newFormValue.grossSalary);
    const lop = parseFloat(newFormValue.lop);
  
    let netSalary ;
  
    if (!isNaN(salary)) {
      netSalary = salary;
    }
  
    if (!isNaN(grossSalary)) {
      netSalary += grossSalary;
    }
  
    if (!isNaN(lop)) {
      const numberOfWorkingDays = 30 - lop;
      netSalary *= numberOfWorkingDays / 30;
    }
    netSalary = Math.round(netSalary / 10) * 10;

    newFormValue.netSalary = netSalary.toFixed(2);
    
    setFormValue(newFormValue);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { salaryMonthYear, salaryMonthYear, lop, salary } = formValue;

    // if (!salaryMonthYear || !salaryMonthYear || !lop || !salary) {
    //   return;
    // }

    try {
      // const teacherData = JSON.parse(localStorage.getItem("TEACHER_DATA"));
      const formData = {
        ...formValue,
        // employeeId: teacherData ? teacherData.teacherId : "",
        // name: teacherData ? teacherData.name : "",
      };

      let { message, status: addstatus } = await employesalaryform(formData);
      if (addstatus === true) {
        console.log(addstatus, message, "Successfully Submitted ");
        toastAlert("success", message);
      }
      navigate("/payrollForm");
    } catch (err) {
      console.log(err);
    }
  };

  const goback = () => {
    navigate("/payrollForm");
  };
  const {
    employeeId,
    name,
    salaryMonthYear,
    salary,
    grossSalary,
    lop,
    netSalary,
  } = formValue;

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <div className="teacher-details">
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Pay Roll</span>
            </div>
            <form onSubmit={handleSubmit} className="teacher-form">
              {" "}
              <div className="teach-box">
                <label htmlFor="employeeId">Employee Id</label>
                <input
                  type="text"
                  name="employeeId"
                  value={employeeId}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="salaryMonthYear">Salary Month Year</label>
                <input
                  type="text"
                  name="salaryMonthYear"
                  value={salaryMonthYear}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="salary">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formValue.salary}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="grossSalary">Gross Salary</label>
                <input
                  type="text"
                  name="grossSalary"
                  value={formValue.grossSalary}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="lop">L.O.P</label>
                <input
                  type="text"
                  name="lop"
                  value={lop}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="netSalary">Net Salary</label>
                <input
                  type="text"
                  name="netSalary"
                  value={formValue.netSalary}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container-one container-edit">
        <div className="right-content">
          {renderForm()}
          <div className="sub-btnn">
            {currentForm === 1 && <button onClick={goback}>Cancel</button>}
            {currentForm === 1 && (
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollForm;
