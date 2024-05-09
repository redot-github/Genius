import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import {
  payrollListmonth,
  salaryformUpdate,
  salarypayrollDislay,
} from "../actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toastAlert from "../lib/toast";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
// import {
//   PDFDownloadLink,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";
// import generatePDF from "./payslipPdf";
import DownloadIcon from "@mui/icons-material/Download";

const initialFormValue = {
  month: "",
  currentSalary: "",
  Netsalary: "",
};
const PayrollList = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [editingItemId, setEditingItemId] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [submitDisable, setsubmitDisable] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const [ispayrollGenerated, setispayrollGenerated] = useState(false);
  const [monthstoredatas, setmonthstoredatas] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    if (selectedMonth && showDetails) {
      getData();
    }
  }, [selectedMonth, showDetails]);

  const PayrolllistGenerate = () => {
    navigator("/PayrolllistGenerate");
  };

  const getData = async () => {
    try {
      if (selectedMonth) {
        const [selectedData] = await Promise.all([
          salarypayrollDislay(selectedMonth),
        ]);
        const teacherDisplay = selectedData.result;
        setData(
          teacherDisplay.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        console.log("Filtered Data:", data);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const handleSearchQuery = (e) => {
    setsearchQuery(e.target.value);
  };

  const catagoryhandleSubmit = async () => {
    if (selectedMonth) {
      setShowDetails(true);
      setsubmitDisable(true);
    }
  };

  const handlecancelEdit = () => {
    setEditingItemId(false);
  };

  const monthlist = async () => {
    try {
      const listview = await payrollListmonth();
      const valuesAreVisible = listview.result;
      console.log(valuesAreVisible, "valuesAreVisible");
      setmonthstoredatas(valuesAreVisible);
    } catch (error) {
      console.error("Error fetching month data:", error);
    }
  };

  useEffect(() => {
    monthlist();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setispayrollGenerated(true);
  };
  
  const handlevaluesUpate = (e, itemId, field) => {
    const { value } = e.target;
    const updatedData = data.map((item) =>
      item.employeeId === itemId ? { ...item, [field]: value } : item
    );

    const totalDaysMap = {};
    updatedData.forEach((item) => {
      totalDaysMap[item.employeeId] = 30 - item.numofDays;
    });

    updatedData.forEach((item) => {
      const totalworkingdays = totalDaysMap[item.employeeId] || 0;
      const salaryadding = parseInt(item.grossSalary) / 30;
      const calculation = totalworkingdays * salaryadding;
      const Netsalary = Math.round(calculation / 10) * 10;
      item.Netsalary = Netsalary;
      item.totalworkingdays = totalworkingdays;
    });

    setData(updatedData);
    if (editingItemId === itemId) {
      setFormValue({ ...formValue, [field]: value });
    }
  };

  const handleEditSubmit = async (employeeId, employeePaySlipId) => {
    try {
      const updatedItem = data.find((item) => item.employeeId === employeeId);
      if (!updatedItem) {
        return;
      }

      const formData = {
        employeeId: employeeId,
        currentSalary: formValue.currentSalary,
        grossSalary: formValue.grossSalary,
        Netsalary: updatedItem.Netsalary,
      };

      const { status, message } = await salaryformUpdate(
        formData,
        employeePaySlipId,
        employeeId
      );

      if (status === "success") {
        toastAlert("success", "Salary updated successfully", "green");
        getData();
      } else {
        toastAlert("error", message, "red");
      }
    } catch (error) {
      console.error("Error updating salary:", error);
      toastAlert("error", "Failed to update salary", "red");
    }
    setEditingItemId(false);
  };

   const clear = () => {
    window.location.reload();
    setData([]);
    setFormValue({ leaveType: "All", month: "" });
    setsubmitDisable(false);
  };

  const exportToExcel = () => {
    try {
      const totalCurrentSalary = data.reduce(
        (total, item) => total + parseFloat(item.currentSalary),
        0
      );

      const formattedTotalCurrentSalary = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      })
        .format(totalCurrentSalary)
        .replace(/,/g, "");

      const totalgrossSalary = data.reduce(
        (total, item) => total + parseFloat(item.grossSalary),
        0
      );

      const formattedTotalgrossSalary = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      })
        .format(totalgrossSalary)
        .replace(/,/g, "");

      const modifiedData = [
        ...data.map((item) => ({
          "Employee ID": item.employeeId,
          "Employee Name": item.name,
          Month: `${item.month}/${item.year}`,
          "Current Salary": new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.currentSalary),
          "Gross Salary": new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.grossSalary),
          "Total N.O.D": item.totaldaysformonth,
          "Working Days": item.totalworkingdays,
          "L.O.P": item.numofDays,
          "Net Salary": item.Netsalary || "-",
        })),
        {
          "Employee ID": "Total",
          "Employee Name": "",
          Month: "",
          "Current Salary": `${formattedTotalCurrentSalary}`,
          "Gross Salary": `${formattedTotalgrossSalary}`,
          "Total N.O.D": "",
          "Working Days": "",
          "L.O.P": "",
          "Net Salary": "",
        },
      ];
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Payroll Data");

      XLSX.writeFile(wb, "payroll_data.xlsx");
      window.location.reload();
      toastAlert("success", "Downloaded Successfully.");
    } catch (error) {
      console.error("Error occurred while exporting data to Excel:", error);
      toastAlert("error", "Failed to export data to Excel.");
    }
  };

  const renderUserView = () => {
    const isMonthSelected = selectedMonth !== null;
    const renderButtons = isMonthSelected && showDetails;

    return (
      <>
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Month</th>
                <th>Current Salary</th>
                <th>Gross Salary</th>
                <th>Total N.O.D</th>
                <th>Working Days</th>
                <th>L.O.P</th>
                <th>Net Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="std-row" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.employeeId}</td>
                  <td>{item.name}</td>
                  <td>{`${item.month}/${item.year}`}</td>
                  <td>{item.currentSalary}</td>
                  <td>{item.grossSalary}</td>
                  <td>{item.totaldaysformonth}</td>
                  <td>{item.totalworkingdays}</td>

                  <td>
                    {editingItemId === item.employeeId ? (
                      <input
                        type="text"
                        value={item.numofDays}
                        onChange={(e) =>
                          handlevaluesUpate(e, item.employeeId, "numofDays")
                        }
                      />
                    ) : (
                      item.numofDays
                    )}
                  </td>
                  <td>{item.Netsalary}</td>
                  <td>
                    {editingItemId === item.employeeId ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          onClick={() =>
                            handleEditSubmit(item.employeeId, item._id)
                          }
                          style={{ cursor: "pointer", marginRight: "5px" }}
                        />

                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={handlecancelEdit}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => setEditingItemId(item.employeeId)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {renderButtons && (
              <thead>
                <tr>
                  <th>
                    <button
                      style={{ textAlign: "left" }}
                      className="tchr-month-att-btn"
                      onClick={clear}
                    >
                      Clear
                    </button>
                  </th>
                  <th>
                    <button
                      style={{ textAlign: "right" }}
                      className="tchr-month-att-btn"
                      onClick={exportToExcel}
                    >
                      Export to Excel
                    </button>
                  </th>
                </tr>
              </thead>
            )}
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Pay-Roll List</p>
          </div>
          <div className="middle-header-right">

            <select
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              disabled={submitDisable}
            >
              <option value="">Select Month</option>
              {monthstoredatas.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {selectedMonth && (
            <button
              type="submit"
              className="tchr-month-att-btn"
              onClick={catagoryhandleSubmit}
              disabled={submitDisable}
            >
              Submit
            </button>
          )}
          {!ispayrollGenerated && (
            <button
              className="tchr-month-att-btn"
              onClick={PayrolllistGenerate}
            >
              Generate Pay-Roll
            </button>
          )}
          <div className="middle-header-right">
            <input
              type="search"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
          </div>
        </div>
        {renderUserView()}
      </div>
    </div>
  );
};

export default PayrollList;
