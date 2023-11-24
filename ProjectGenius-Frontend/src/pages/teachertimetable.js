import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar';
import { getTeacherSchedule } from '../actions/adminAction';
import {useNavigate, useParams } from 'react-router-dom';


const TimeTable = () =>{
  const [data,setData] = useState();
  const {teacherId} = useParams();
  // const location = useLocation();
  // const { Data } = location.state || "";
// console.log(Data,'---Data')
const [Result,setResult] = useState()
 
const getData = async (teacherId) => {
  try {
    const { status, result,result2 } = await getTeacherSchedule(teacherId);
    if (status === true) {
      console.log(result, "--result");
      if (result.schedule) {
        setData(result.schedule);
        setResult(result2._id);
      } else {
        setResult(result2._id);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  useEffect(() => {
    getData(teacherId);
  }, [teacherId,Result]);
  
  console.log(Result,'---result2')
const navigate = useNavigate()

const EditSchedule = () => {
  navigate('/teacherschedule/'+Result)
}

// const AssignSchedule = () => {
//   navigate('/teacherschedule/'+Result)
// }

const renderBody = () => {
  return(
    data.map((item, index) => (
      <tr className="time-row" key={index}>
      <td>{item.day}</td>
      <td>
        <div className="subject">
          <p>{item.periods.period1.class} {item.periods.period1.section}</p>
          <p>{item.periods.period1.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period2.class} {item.periods.period2.section}</p>
          <p>{item.periods.period2.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject3">
          <p>{item.periods.period3.class} {item.periods.period3.section}</p>
          <p>{item.periods.period3.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject">
          <p>{item.periods.period4.class} {item.periods.period4.section}</p>
          <p>{item.periods.period4.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period5.class} {item.periods.period5.section}</p>
          <p>{item.periods.period5.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject3">
          <p>{item.periods.period6.class} {item.periods.period6.section}</p>
          <p>{item.periods.period6.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject">
          <p>{item.periods.period7.class} {item.periods.period7.section}</p>
          <p>{item.periods.period7.subject}</p>
        </div>
      </td>
      <td>
        <div className="subject2">
          <p>{item.periods.period8.class} {item.periods.period8.section}</p>
          <p>{item.periods.period8.subject}</p>
        </div>
      </td>
    </tr>
    ))
   )
    }
 
    return(
        <div className="teacher">
 <Sidebar teacherId={teacherId}/>
  <div className="teacher-content" style={{ background: "#f7f7f8" }}>
    <div className="header" style={{ width: "100%" }}>
      <div className="l-header">
        <p>Teacher Time Table</p>
      </div>
      {/* <div className="r-header" style={{ width: 600 }}>
        <input type="search" placeholder="search" />
        <img src="images/filter.png" />
        <a href="#" className="notify">
          <img
            src="images/bell.png"
            alt=""
            title="notification"
            style={{ height: 25 }}
          />
        </a>
        <a href="#" className="notify">
          <img
            src="images/setting.png"
            alt=""
            title="setting"
            style={{ height: 25 }}
          />
        </a>
        <div>
          <span>Sam Smith</span>
          <br />
          <span style={{ color: "#ccc" }}>Admin</span>
        </div>
        <img src="images/Profile photo.png" alt="" title="profile" />
      </div> */}
    </div>
    <div className="time-table-content">
      <div className="time-header">
        <p style={{ fontSize: 15, fontWeight: 600 }}>Time Table</p>
        <div className="time-buttons">
          <button style={{ color: "#605bff" }} onClick={EditSchedule}>
            <i className="fa fa-pencil" style={{ marginRight: 10 }} onClick={EditSchedule}/>
            Edit
          </button>
          {/* <button style={{ color: "hotpink" }} onClick={AssignSchedule}>
            <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: 10 }} onClick={AssignSchedule}/>
            Assign Schedule
          </button> */}
        </div>
      </div>
      <table className="time-table" border={1}>
        <thead>
          <tr className="time-head-row">
            <th>Day</th>
            <th>
              <span>1</span>
              <br />
              9.30-10.10AM
            </th>
            <th>
              <span>2</span>
              <br />
              10.20-11.00AM
            </th>
            <th>
              <span>3</span>
              <br />
              11.00-11.40AM
            </th>
            <th>
              <span>4</span>
              <br />
              11.40-12.10PM
            </th>
            <th>
              <span>5</span>
              <br />
              1.00-1.40PM
            </th>
            <th>
              <span>6</span>
              <br />
              1.40-2.10PM
            </th>
            <th>
              <span>7</span>
              <br />
              2.20-3.00PM
            </th>
            <th>
              <span>8</span>
              <br />
              3.00-3.40PM
            </th>
          </tr>
        </thead>
        <tbody>
              {data ? (
                renderBody()
              ) : (
                <tr className="time-row">
                <td>Monday</td>
                <td>
                  <div className="subject">
                    <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject3">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject3">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                  <p>Class=?</p>
                    <p>Subject=?</p>
                  </div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;