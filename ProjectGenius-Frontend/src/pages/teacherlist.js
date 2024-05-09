import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
//import lib
import toastAlert from "../lib/toast";
//import Action
import {
  createAttendance,
  deleteTeacher,
  findAttendance,
  viewTeacher,
} from "../actions/adminAction";
//import components
import Sidebar from "./components/sidebar";
//Pop up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";
import CancelIcon from "@mui/icons-material/Cancel";


const initialAttendance = {
  date: new Date().toLocaleDateString(),
  attendance: [],
};

const TeacherList = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [Result, setResult] = useState();
  const [provideAttendance, setProvideAttendance] = useState(false);
  const [attendanceRecord, setAttendance] = useState(initialAttendance);
  const [viewAttendance, setviewAttendance] = useState("");
  // const [first, setfirst] = useState(second)
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [multiOption, setMultiOption] = useState('')

  const navigate = useNavigate();
  const getData = async () => {
    try {
      let { status, result, imageUrl, result2 } = await viewTeacher();
      if (status === true) {
        const teacherData = await result.filter(
          (each) =>
            each.active === 1 &&
            each.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setData(teacherData);
        setIMAGE_URL(imageUrl);
        setResult(result2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [userSearchInput]);

  const editteacher = (id) => {
    navigate("/teacher-edit/" + id);
  };
  const allocateteacher = (id) => {
    navigate("/teacher-allocate/" + id);
  };
  const teacherdetails = (id) => {
    navigate("/teacherdetails/" + id);
  };
  const deleteteacher = async (id) => {
    try {
      let { status, message } = await deleteTeacher(id);

      if (status === true) {
        toastAlert("success", message);
        getData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {}
  };
  const handleSearchInput = (event) => {
    setUserSearchInput(event.target.value);
  };
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action && console.log('ok');
    if (action) {
      deleteteacher(Id);
    }
  };

  const handleAttendance = (teacherId, teacherName, status) => {
    const isTeacherPresent = attendanceRecord.attendance.find(
      (item) => item.teacherId === teacherId
    );

    if (isTeacherPresent) {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        attendance: prevAttendance.attendance.map((each) => {
          if (each.teacherId === teacherId) {
            return {
              ...each,
              status: status,
            };
          } else {
            return each;
          }
        }),
      }));
    } else {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        attendance: [
          ...prevAttendance.attendance,
          { teacherId, teacherName, status: status },
        ],
      }));
    }
  };

  const handleHoliday = () => {
    const holidayData = selectedData.map((each) => ({
      ...each,
      status: "Holiday",
    }));
    setAttendance((prev) => ({ ...prev, attendance: [...holidayData] }));
  };

  const handleDeselect = () => {
    setAttendance(initialAttendance);
    setSelectedData([]);
    setSelectAll(false);
    setMultiOption('')
  };

  const handleAttendanceSubmit = async () => {
    try {
      const Attendata = {
        date: attendanceRecord.date,
        attendance: attendanceRecord.attendance,
      };
      let { status, message } = await createAttendance(Attendata);
      if (status === true) {
        setProvideAttendance(false);
        getAttendance();
        setSelectedData([]);
        toastAlert("success", message);
      }
      if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  const getAttendance = async () => {
    try {
      const attendata = {
        date: attendanceRecord.date,
      };
      let { status, result } = await findAttendance(attendata);
      if (status === true) {
        setviewAttendance(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  useEffect(() => {
    const allSelected = data.every((item) =>
      selectedData.some((selected) => selected.teacherId === item.teacherId)
    );
    setSelectAll(allSelected);
  }, [selectedData, data]);

  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      const allData = data.map((item) => ({
        teacherId: item.teacherId,
        teacherName: item.name,
      }));
      setSelectedData(allData);
    } else {
      setSelectedData([]);
    }
  };

  const toggleSelect = (teacherId, name) => {
    setSelectedData((prev) => {
      const existingIndex = prev.findIndex(
        (selected) => selected.teacherId === teacherId
      );

      if (existingIndex !== -1) {
        return [
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ];
      } else {
        return [...prev, { teacherId, teacherName: name }];
      }
    });
  };

  const handleMultiSelect = (e) => {
    if (selectAll) {
      setMultiOption(e.target.value)

    switch (e.target.value) {
      case 'Present':
        const presentData = selectedData.map((each) => ({
          ...each,
          status: "Present",
        }));
        setAttendance((prev) => ({ ...prev, attendance: [...presentData] }));
        break;
      case 'Absent':
        const absentData = selectedData.map((each) => ({
          ...each,
          status: "Absent",
        }));
        setAttendance((prev) => ({ ...prev, attendance: [...absentData] }));
        break;
      case 'Holiday':
        const holidayData = selectedData.map((each) => ({
          ...each,
          status: "Holiday",
        }));
        setAttendance((prev) => ({ ...prev, attendance: [...holidayData] }));
        break;
      default:
        
        return setAttendance(initialAttendance);
    }
    }
  }

  return (
    <div className="teacher">
      <Sidebar />
      <div className="teacher-content" style={{ background: "#f7f7f8" }}>
        <div className="header">
          <div className="l-header d-flex align-center">
            <p
              className="m-2"
              style={{ cursor: "pointer" }}
              onClick={() => setProvideAttendance(false)}
            >
              Teacher List
            </p>
            <p className="m-2 text-dark">|</p>
            <p
              className="m-2"
              style={{ cursor: "pointer" }}
              onClick={() => setProvideAttendance(true)}
            >
              Provide Attendance
            </p>
          </div>
          {/* <div className="r-header" style={{ width: 600 }}>
                        <input type="search" />
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
          <div className="middle-header-right">
            <input
              type="search"
              placeholder="search"
              onChange={handleSearchInput}
              value={userSearchInput}
            />
            <div className="dropdown filter">
              <img
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                src="images/filter.png"
                alt=""
                title="filter"
              />
              <ul id="filter-option" className="filt-opt dropdown-menu">
                <li>
                  <button className="std-btn">Student Name</button>
                </li>
                <li>
                  <button className="std-btn dropdown-item">
                    Admission Date
                  </button>
                </li>
                <li>
                  <button className="std-btn dropdown-item">Grade</button>
                </li>
                <li>
                  <button className="std-btn dropdown-item">
                    Contact Number
                  </button>
                </li>
                <li>
                  <button className="std-btn dropdown-item">
                    {" "}
                    Fee Payment Due
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tchr-table" onclick="hidefilt();">
          {provideAttendance ? (
            <>
              <div className="multi-select-control">
                <div className="multi-select-dropdown">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectAll}
                    id="multiSelect"
                  />
                  {selectAll ? <select onChange={handleMultiSelect} value={multiOption}>
                    <option value=""></option>
                    <option value="Present">
                      Present
                    </option>
                    <option value="Absent">
                      Absent
                    </option>
                    <option  value="Holiday">
                      Holiday
                    </option>
                  </select> : null}
                </div>
                {selectAll ? (
                  <button
                    type="button"
                    className="btn"
                    onClick={handleDeselect}
                  >
                    <CancelIcon color="error" />
                  </button>
                ) : (
                  <label htmlFor="multiSelect">Select All</label>
                )}
              </div>
              <table className="tchr-info">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Teacher ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, key) => {
                      const attendanceStatus = attendanceRecord.attendance.find(
                        (each) => item.teacherId === each.teacherId
                      );
                      const ViewAttendance =
                        viewAttendance && viewAttendance.attendance
                          ? viewAttendance.attendance.find(
                              (each) => item.teacherId === each.teacherId
                            )
                          : null;
                      const ViewStatus =
                        ViewAttendance && ViewAttendance
                          ? ViewAttendance.status
                          : null;
                      console.log(ViewAttendance, "attenstatus");
                      console.log(ViewStatus, "ansss");
                      return (
                        <tr className="tchr-row" onclick="infos()" key={key}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={() =>
                                toggleSelect(item.teacherId, item.name)
                              }
                              checked={selectedData.some(
                                (selected) =>
                                  selected.teacherId === item.teacherId
                              )}
                            />
                          </td>
                          <td>{key + 1}</td>
                          <td className="teacherprofile">
                            <img
                              src={`${IMAGE_URL}/${item.teacherphoto}`}
                              alt=""
                              onClick={() => teacherdetails(item._id)}
                            />
                            <span onClick={() => teacherdetails(item._id)}>
                              {item.name}
                            </span>
                          </td>
                          <td>{item.teacherId}</td>
                          <td>{new Date().toLocaleDateString()}</td>
                          <td>
                            {ViewAttendance && ViewAttendance ? (
                              <span
                                className={
                                  ViewStatus
                                    ? ViewStatus === "Present"
                                      ? "due2"
                                      : "grade"
                                    : "defaultValue"
                                }
                              >
                                {ViewStatus}
                              </span>
                            ) : (
                              <span
                                className={
                                  attendanceStatus
                                    ? attendanceStatus.status === "Present"
                                      ? "due2"
                                      : "grade"
                                    : "defaultValue"
                                }
                              >
                                {attendanceStatus
                                  ? attendanceStatus.status
                                  : "-"}
                              </span>
                            )}
                          </td>
                          <td>
                            {ViewAttendance && ViewAttendance ? (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  style={{ marginRight: "12px" }}
                                >
                                  P
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  A
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  style={{ marginRight: "12px" }}
                                  onClick={() =>
                                    handleAttendance(
                                      item.teacherId,
                                      item.name,
                                      "Present"
                                    )
                                  }
                                >
                                  P
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleAttendance(
                                      item.teacherId,
                                      item.name,
                                      "Absent"
                                    )
                                  }
                                >
                                  A
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="w-100 d-flex justify-content-end">
                {viewAttendance && viewAttendance ? null : (
                  <button
                    type="button"
                    className={`btn m-4 ${
                      data.length === attendanceRecord.attendance.length
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    disabled={!data.length === attendanceRecord.length}
                    onClick={handleAttendanceSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (
            <table className="tchr-info">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Teacher ID</th>
                  <th>Grade</th>
                  <th>Subject</th>
                  <th>Contact Number</th>
                  <th>Salary Details</th>
                  <th>Salary Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((item, key) => {
                    const matchedTeacher = Result.find(
                      (teacher) => teacher.teacherId === item.teacherId
                    );
                    // Check if the matched teacher's role is "Class Teacher"
                    const isClassTeacher =
                      matchedTeacher &&
                      matchedTeacher.status.find(
                        (status) => status.role === "Class Teacher"
                      );
                    console.log(isClassTeacher, "---classTeacher");
                    const gradeColumn = isClassTeacher
                      ? `${isClassTeacher.className}-${isClassTeacher.section}`
                      : "-";
                    return (
                      <tr className="std-row" onclick="infos()" key={key}>
                        <td >{key+1}</td>
                        <td className="profile">
                          <img
                            src={`${IMAGE_URL}/${item.teacherphoto}`}
                            e
                            alt=""
                            onClick={() => teacherdetails(item._id)}
                          />
                          <span onClick={() => teacherdetails(item._id)}>
                            {item.name}
                          </span>
                        </td>
                        <td>{item.teacherId}</td>
                        <td>
                          <span className="grade">{gradeColumn}</span>
                        </td>
                        <td>
                          <span className="grade">{item.subjects}</span>
                        </td>
                        <td>+91{item.phoneNumber}</td>
                        <td>
                          <span className="rupee">{item.currentsalary}</span>
                        </td>
                        <td>
                          <span className="due2">Paid</span>
                        </td>
                        <td>
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
                                  onClick={() => editteacher(item._id)}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    style={{ color: "blue" }}
                                  />
                                  Edit
                                </a>
                              </li>
                              <li className="edit-box">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => allocateteacher(item._id)}
                                >
                                  <i className="fa fa-tags" />
                                  Allocate
                                </a>
                              </li>
                              <li>
                                <Button
                                  className="pop-up-button"
                                  onClick={() => openBasic(item._id)}
                                >
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    style={{ color: "red" }}
                                  >
                                    <i
                                      className="fa fa-trash-o"
                                      style={{
                                        color: "red",
                                        marginRight: 10,
                                      }}
                                    />
                                    Clear
                                  </a>
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeacherList;
