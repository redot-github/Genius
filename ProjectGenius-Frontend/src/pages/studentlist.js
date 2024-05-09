import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
//fontawesome pacakage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faMoneyCheck, faSchool, faSort } from "@fortawesome/free-solid-svg-icons";
//react confirm pop-up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";
//material UI components
import Badge from "@mui/material/Badge";
import SwitchAccountRounded from "@mui/icons-material/SwitchAccountRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { ArrowRightAltOutlined } from "@mui/icons-material";
//import Actions
import { viewStudent, deleteStudent } from "../actions/adminAction";
//impotr Components
import StudentInfo from './components/studentInfo.js';
//import Lib
import toastAlert from "../lib/toast";

const Students = () => {
  const [data, setData] = useState([]);
  const [section, setSection] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  //states for student information toggle-sideviews
  const [showStudentInfo, toggleStudentInfo] = useState(false);
  const [clickedStudentDetails, setStudentDetails] = useState({});
  //states for search box and sorting
  const [userSearchInput, setUserSearchInput] = useState("");
  const [sortGrade, setGradeSort] = useState("");
  const [isAsc, setSortedData] = useState(true);
  const [sortKey, setSortKey] = useState("");
  //pre-loader view
  const [loaderView, setLoaderView] = useState(true);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectingStudents, setSelectingStudents] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  //preloader

  const handleSectionAllocate = () => {
    const formattedData = data
      .filter((item) => selectedStudents.includes(item._id))
      .map((item) => ({
        name: item.name,
        studentId: item.studentId,
      }));
    const studentData = {
      formattedData,
      sortGrade,
    };
    navigate('/multi-sectionallocate', { state: { studentData } })
  };

  const renderUserView = () => {
    if (loaderView) {
      return (
        <div className="loader-view-container">
          <div class="spinner-box">
            <div class="pulse-container">
              <div class="pulse-bubble pulse-bubble-1"></div>
              <div class="pulse-bubble pulse-bubble-2"></div>
              <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
          </div>
        </div>
      );
    }
    const getSortedData = () => {
      if (sortGrade !== "") {
        const filteredData = data.filter(
          (eachItem) => eachItem.admissiongrade === sortGrade
        );
        return filteredData;
      }
      return data;
    };
    const sortedData = getSortedData();
    const studentData = sortedData.filter(
      (each) =>
        each.active === 1 &&
        each.name.toLowerCase().includes(userSearchInput.toLowerCase())
    );
    return (
      <>
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
                <th>
                  {selectingStudents ? (
                    <div className="students-select-control">
                      <div>
                        <Badge
                          badgeContent={selectedStudents.length}
                          color="primary"
                        >
                          <SwitchAccountRounded color="action" />
                        </Badge>
                        <button type="button" onClick={handleCancelAllocat}>
                          <CancelIcon color="error" />
                        </button>
                      </div>
                      <div>
                        <input
                          id="selectAll"
                          type="checkbox"
                          onChange={() => handleSelectAll(studentData)}
                          checked={selectAll}
                        />
                        <label htmlFor="selectAll">Select All</label>
                      </div>
                    </div>
                  ) : (
                    "S.No"
                  )}
                </th>
                <th>
                  Name
                  <button
                    type="button"
                    className="name-sort-btn"
                    onClick={() => handleSorting("name")}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>Student ID</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Contact Number</th>
                <th>
                  Admission Date
                  <button
                    type="button"
                    className="name-sort-btn"
                    onClick={() => handleSorting("doj")}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th>Due Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                studentData.map((item, key) => {
                  // Check if the studentId is present in any section
                  const sectionForStudent = section.find(sec =>
                    sec.students.some(student => student.studentId === item.studentId)
                  );
                  return (
                    <tr className="std-row" key={key}>
                      <td>
                        {selectingStudents ? (
                          <label
                            className="select-checkbox"
                            style={{ marginRight: "8px" }}
                          >
                            <input
                              type="checkbox"
                              onChange={() => handleStudentSelection(item._id)}
                              checked={selectedStudents.includes(item._id)}
                            />
                            <span></span>
                          </label>
                        ) : (
                          key + 1
                        )}
                      </td>
                      <td className="profile">
                        <img
                          src={`${IMAGE_URL}/${item.photo}`}
                          alt=""
                          onClick={() => handleStudentInfo(item.studentId)}
                        />
                        <span
                          key={key}
                          onClick={() => handleStudentInfo(item.studentId)}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td>{item.studentId}</td>
                      <td>
                        <span className="grade">{item.admissiongrade}</span>
                      </td>
                      <td>
                        <span className="grade">{sectionForStudent ? sectionForStudent.section : "-"}</span>
                      </td>
                      <td>+91{item.contactNumber}</td>
                      <td>{item.doj}</td>
                      <td>
                        <span className="due1">${item.feesamount}</span>
                      </td>
                      <td className="edit" id="ed">
                        <div className="dropdown">
                          <FontAwesomeIcon
                            icon={faEllipsis}
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          />
                          <ul
                            className="dropdown-menu"
                            style={{ background: "#fafafa", padding: "0" }}
                          >
                            <li className="edit-box">
                              <a
                                className="dropdown-item"
                                href="#"
                                style={{ color: "blue" }}
                                onClick={() => editstudent(item._id)}
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
                                onClick={() => feecollection(item._id)}
                                style={{ color: "#13d872" }}
                              >
                                <FontAwesomeIcon
                                  icon={faMoneyCheck}
                                  style={{
                                    color: "#13d872",
                                    marginRight: "5px",
                                  }}
                                />
                                Pay-Fee
                              </a>
                            </li>
                            <li className="edit-box">
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
                                    style={{ color: "red", marginRight: 10 }}
                                  />
                                  Clear
                                </a>
                              </Button>
                            </li>
                            <li className="edit-box">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => sectionallocate(item._id)}
                                style={{ color: "revert-layer" }}
                              >
                                <FontAwesomeIcon
                                  icon={faSchool}
                                  style={{
                                    color: "revert-layer",
                                    marginRight: "5px",
                                  }}
                                />
                                Section-allocate
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {sortGrade !== "" && (
          <div className="allocate-btn">
            <button type="button" onClick={handleSectionAllocate}>
              Section allocate
            </button>
          </div>
        )}
      </>
    );
  };

  const handleSelectAll = (sortedData) => {
    if (!selectAll) {
      const studentList = sortedData.map((each) => each._id);
      setSelectAll(true);
      setSelectedStudents([...studentList]);
    } else {
      setSelectAll(false);
      setSelectedStudents([]);
    }
  };

  const handleCancelAllocat = () => {
    setGradeSort("");
    setSelectedStudents([]);
    setSelectingStudents(false);
  };

  //navigate
  const navigate = useNavigate();
  const deletestudent = async (id) => {
    try {
      let { status, message } = await deleteStudent(id);
      if (status === true) {
        toastAlert("success", message);
        getData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  //confirmation pop-up box
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action
    if (action) {
      deletestudent(Id);
    }
  };
  const getData = async () => {
    try {
      let { status, result, result2, imageUrl } = await viewStudent();
      if (status === true) {
        setLoaderView(false)
        const studentData = await result.filter(each => each.active === 1 && each.name.toLowerCase().includes(userSearchInput.toLowerCase()))
        setData(studentData)
        setIMAGE_URL(imageUrl);
        setSection(result2)
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data, '---data')
  console.log(section, '---section')
  //updating grade sorting state
  const handleGradeSort = (event) => {
    if (event.target.value === "") {
      setGradeSort("");
      setSelectingStudents(false);
      setSelectedStudents([]);
    } else {
      setGradeSort(event.target.value);
      setSelectingStudents(true);
      setSelectedStudents([]);
      setSelectAll(false);
    }
  };

  const handleStudentSelection = (id) => {
    if (selectedStudents.includes(id)) {
      const updatedStudents = selectedStudents.filter((each) => each !== id);
      setSelectedStudents(updatedStudents);
    } else {
      setSelectedStudents((prevList) => [...prevList, id]);
    }
  };

  //navigate to student-edit page
  const editstudent = (id) => {
    navigate("/student-edit/" + id);
  };
  //student toggle-sideview
  const handleStudentInfo = (id) => {
    let studentDetails = data.find((eachItem) => eachItem.studentId === id);
    if (studentDetails) {
      setStudentDetails(studentDetails);
      toggleStudentInfo(true);
    }
  };
  //search box function
  const handleSearchInput = (event) => {
    setUserSearchInput(event.target.value);
  };
  //name & date wise sorting function
  const sortData = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return isAsc ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };
  const handleSorting = (key) => {
    if (sortKey === key) {
      setSortedData(!isAsc);
    } else {
      setSortKey(key);
      setSortedData(true);
    }
    sortData(key);
  };
  const feecollection = (id) => {
    navigate("/feecollection/" + id);
  };
  const sectionallocate = (id) => {
    navigate("/sectionallocate/" + id);
  };
  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Student Details</p>
          </div>
          <div className="middle-header-right">
            {sortGrade !== "" && (
              <button type="button" className="allocate-btn-sm" onClick={handleSectionAllocate}>
                {`No.of Students ${selectedStudents.length}`} <ArrowRightAltOutlined />
              </button>
            )}
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
                <li style={{ borderBottom: "1px solid #efeef1" }}>
                  <select
                    name="admissiongrade"
                    value={sortGrade}
                    onChange={handleGradeSort}
                    style={{ paddingLeft: "7px", border: "none" }}
                  >
                    <option value="">Select Grade</option>
                    <option>Preschool</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {renderUserView()}
      </div>
      {showStudentInfo && (
        <StudentInfo
          IMAGE_URL={IMAGE_URL}
          studentDetails={clickedStudentDetails}
          toggleStudentInfo={toggleStudentInfo}
        />
      )}
    </div>
  );
};

export default Students;
