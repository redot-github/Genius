import React, { useEffect, useState } from 'react';
import { leaveAllocate, leaveAllocateDisplay, viewTeacher } from '../../actions/adminAction';
import toastAlert from '../../lib/toast';

const NewEmployeeLeave = () => {
  const [EmpID, setEmpID] = useState('');
  const [formValue, setFormValue] = useState({
    employeeId: '',
    name: '',
    medicalLeave: '',
    casualLeave: '',
    paternityLeave: '',
    annualLeave: 0,
    unpaidLeave: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });


  }; useEffect(() => {
    const total = (
      parseInt(formValue.medicalLeave || 0) +
      parseInt(formValue.casualLeave || 0) +
      // parseInt(formValue.maternityLeave || 0) +
      parseInt(formValue.paternityLeave || 0)
    ).toString();
    setFormValue({ ...formValue, annualLeave: total });
  }, [formValue.medicalLeave, formValue.casualLeave, formValue.paternityLeave]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await viewTeacher();
      const teacheralldata = response.result;
      const registeredEmployee = teacheralldata.find((teacher) => teacher.teacherId === formValue.employeeId);
      if (registeredEmployee) {
        setFormValue({ ...formValue, name: registeredEmployee.name });
      }
    };

    fetchData();
  }, [formValue.employeeId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...formValue };
  
      // Check if the employee ID is already in the leave allocation data
      const allocatedData = await leaveAllocateDisplay();
      const existingData = allocatedData.result;
      const existingEmployee = existingData.find((teacher) => teacher.employeeId === formData.employeeId);
      if (existingEmployee) { 
        toastAlert("error", "Employee ID already have allocated leaves.");
        return;
      }
  
      // Check if the employee ID is registered in the viewTeacher database
      const response = await viewTeacher();
      const teacheralldata = response.result;
      console.log(teacheralldata);
      const registeredEmployee = teacheralldata.find((teacher) => teacher.teacherId === formData.employeeId);
      console.log(registeredEmployee);
      if (!registeredEmployee) { 
        toastAlert("error", "Employee ID not found.");
        return;
      }
  
      // If the employee ID is not found in the leave allocation data and is registered, allocate leave
      let { status, message } = await leaveAllocate(formData);
      if (status === false) {
        toastAlert("error", message);
        return;
      }
  
      toastAlert("success", "Leave allocated successfully.");
      setFormValue({
        employeeId: "",
        name: "",
        medicalLeave: "",
        casualLeave: "",
        paternityLeave: "",
        annualLeave: 0,
        unpaidLeave: ""
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  

  
  

  return (
    <div>
        
            <div
              className="teacher-attendance"
              style={{
                boxShadow: "1px 3px 10px 4px #00000040",
                background: "rgb(247, 247, 248)",
              }}
            >
              <div className="monthly-content">
                <h2>Leave Allocation</h2>
                <form onSubmit={handleSubmit}>
                  <div className="route-allocate-part-two">
                    <div className="route-allocate-input">
                      <label htmlFor="employeeId">Employee ID</label>
                      <input
                        type="text"
                        name="employeeId"
                        id="employeeId"
                        value={formValue.employeeId}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="route-allocate-input">
                      <label htmlFor="medicalLeave">Medical Leave</label>
                      <input
                        type="number"
                        name="medicalLeave"
                        id="medicalLeave"
                        value={formValue.medicalLeave}
                        onChange={handleChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="route-allocate-part-two">

                  <div className="route-allocate-input">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formValue.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="route-allocate-input">
                      <label htmlFor="casualLeave">Casual Leave</label>
                      <input
                        type="number"
                        name="casualLeave"
                        id="casualLeave"
                        value={formValue.casualLeave}
                        onChange={handleChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="route-allocate-part-two">
                    <div className="route-allocate-input">
                      <label htmlFor="paternityLeave">Paternity Leave</label>
                      <input
                        type="number"
                        name="paternityLeave"
                        id="paternityLeave"
                        value={formValue.paternityLeave}
                        onChange={handleChange}
                        min={0}
                      />
                    </div>
                    
                  </div>
                  <div className="route-allocate-part-two">
                  <div className="route-allocate-input">
                      <label htmlFor="annualLeave">Annual Leave</label>
                      <input
                        type="number"
                        name="annualLeave"
                        id="annualLeave"
                        value={formValue.annualLeave}
                        onChange={handleChange}
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="sub-btnn">
                    <button type="submit">Allocate Leave</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  );
};

export default NewEmployeeLeave;
