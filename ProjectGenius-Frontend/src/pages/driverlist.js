import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
//fontawesome pacakage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faMoneyCheck,
  faSchool,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
//react confirm pop-up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";
//import Actions
import { viewDriver, deleteDriver } from "../actions/adminAction";
//import Lib
import toastAlert from "../lib/toast";
import DriverInfo from "./components/driverinfo";

const DriverList = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  //states for student information toggle-sideviews
  const [showDriverInfo, toggleDriverInfo] = useState(false);
  const [clickedDriverDetails, setDriverDetails] = useState({});
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

  //instance for useNavigate
  const navigate = useNavigate();

  const editDriverDetail = (id) => {
    navigate(`/driver-edit/${id}`);
  };
  const busAllocation = (id) => {
    navigate(`/driver-allocate/${id}`);
  };

  const removeDriver = async (Id) => {
    try {
      let { status, message } = await deleteDriver(Id);
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

  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action
    if (action) {
      removeDriver(Id);
    }
  };

  //preloader
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

    return (
      <>
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
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
                <th>Driver ID</th>
                <th>Role</th>
                <th>BusNo</th>
                <th>Contact Number</th>
                <th>Experience</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <tr className="std-row" key={key}>
                      <td className="profile">
                        <img
                          src={`${IMAGE_URL}/${item.driverphoto}`}
                          alt=""
                          onClick={() => handleDriverInfo(item.driverId)}
                        />
                        <span
                          key={key}
                          onClick={() => handleDriverInfo(item.driverId)}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td>{item.driverId}</td>
                      <td>{item.role}</td>
                      <td>
                        <span className="grade">{item.vehicleRegisterNumber}</span>
                      </td>
                      <td>+91{item.phoneNumber}</td>
                      <td>{item.drivingexperience}</td>
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
                                onClick={() => editDriverDetail(item._id)}
                              >
                                <i
                                  className="fa fa-pencil"
                                  style={{ color: "blue" }}
                                />
                                Edit
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
                                  onClick={() => openBasic(item._id)}
                                >
                                  <i
                                    className="fa fa-trash-o"
                                    style={{ color: "red", marginRight: 10 }}
                                  />
                                  Clear
                                </a>
                              </Button>
                            </li>
                            {item.role === "Driver" && (
                              <li className="edit-box">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => busAllocation(item._id)}
                                  style={{ color: "revert-layer" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faSchool}
                                    style={{
                                      color: "revert-layer",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Bus-allocate
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewDriver();
      if (status === true) {
        setLoaderView(false);
        const driverData = await result.filter(
          (each) =>
            each.active === 1 &&
            each.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setData(driverData);
        setIMAGE_URL(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userSearchInput]);

  const handleDriverInfo = (id) => {
    let driverDetails = data.find((eachItem) => eachItem.driverId === id);
    console.log(id,'id..id...dididi');
    console.log(data,'data...');
    if (driverDetails) {
      setDriverDetails(driverDetails);
      toggleDriverInfo(true);
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
  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Driver Details</p>
          </div>
          <div className="middle-header-right">
            <input
              type="search"
              placeholder="search"
              onChange={handleSearchInput}
              value={userSearchInput}
            />
          </div>
        </div>
        {renderUserView()}
      </div>
      {showDriverInfo && (
        <DriverInfo
          IMAGE_URL={IMAGE_URL}
          driverDetails={clickedDriverDetails}
          toggleDriverInfo={toggleDriverInfo}
        />
      )}
    </div>
  );
};

export default DriverList;
