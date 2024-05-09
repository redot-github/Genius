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
import { viewDriver, deleteDriver, displayBusAllocation, deleteBusAllocation, updateDriver } from "../actions/adminAction";
//import Lib
import toastAlert from "../lib/toast";

const BusAllocateList = () => {
  const [data, setData] = useState([]);
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



  const removeAllocation = async (Id) => {
    try {
        const { status, message } = await deleteBusAllocation(Id);
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
    if (action) {
      removeAllocation(Id);
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
                <th>S.No</th>
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
                <th>BusNo</th>
                <th>Bus Route</th>
                <th>Attender Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <tr className="std-row" key={key}>
                      <>{key+1}</>
                      <td >
                        
                        <span
                          key={key}
                        >
                          {item.driverName}
                        </span>
                      </td>
                      <td>{item.driverId}</td>
                      <td>
                        <span className="grade">{item.vehicleRegisterNumber}</span>
                      </td>
                      <td>{item.vehicleRoute}</td>
                      <td>{item.attender}</td>
                      <td className="edit" id="ed">
                        <div className="dropdown">
                  
                          
                              <Button
                                className="pop-up-button"
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
                                </a>
                              </Button>
                           
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
      let { status, result, imageUrl } = await displayBusAllocation();
      if (status === true) {
        setLoaderView(false);
        const driverData = await result.filter(
          (each) =>
            each.active === 1 &&
            each.driverName.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        console.log(driverData,'disData...');
        setData(driverData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userSearchInput]);

  //search box function
  const handleSearchInput = (event) => {
    const searchInput = event.target.value;
    setUserSearchInput(searchInput);
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
    </div>
  );
};

export default BusAllocateList;
