import React, { useEffect, useState } from "react";
import { findAttendanceForMonth } from "../../actions/adminAction";


const Attendance = (props) => {
  
  const { TeacherId,Month } = props; 

  const [monthData,setMonthData] = useState([])

  const getMonthData = async () => {
    try {
      const MonthData = {
        month:Month
      }
      let { status, result } = await findAttendanceForMonth(MonthData);
      console.log('Status:', status);
      console.log('Result:', result);
      if (status === true) {
        setMonthData(result);
      }
    } catch (err) {
      console.log('Error', err);
    }
  }
  

  useEffect (() => {
   getMonthData()
  },[])
  console.log(monthData,'---mmmmdata')
  
  
  return (
        <div className="teacher-attendance" style={{boxShadow: '1px 3px 10px 4px #00000040',background:"rgb(247, 247, 248)" }}>
            <div className="monthly-content">
              <p className="monthlypara">Total Attendance Status for Month of : {Month}</p>
            <table className='attendance-table'>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Month</th>
                <th>Stauts</th>
              </tr>
              <tbody>
          {monthData && monthData.length > 0 && monthData.map((attendanceGroup, index) => {
            const teacherAttendance = attendanceGroup.attendance.find(item => item.teacherId === TeacherId);
            if (teacherAttendance) {
              return (
                <tr key={index} className='attendance-table-row'>
                  <td>{index + 1}</td>
                  <td>{attendanceGroup.date}</td>
                  <td>{attendanceGroup.day}</td>
                  <td>
                    <span className={teacherAttendance.status === 'Present' ? 'due2' : 'grade'}>
                      {teacherAttendance.status}
                    </span>
                  </td>
                </tr>
              );
            }
            return (
              <tr className='attendance-table-row'>
              <td>1</td>
              <td>dd/mm/yyyy</td>
              <td>Today</td>
              <td>
                <span className= 'due2'>
                  Present/Absent
                </span>
              </td>
            </tr>
            );
          })}
        </tbody>
            </table>
          </div>
        </div>
  );
};
export default Attendance;
