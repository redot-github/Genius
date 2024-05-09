import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
// import Payrollfilter from "./components/payrollFilter";
import {
  leaveDisplay,
  payrollsalary,
  salaryformUpdate,
  viewDriver,
  viewTeacher,
} from "../actions/adminAction";
import axios from "axios";
import toastAlert from "../lib/toast";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
// import generatePDF from "../pages/payslipPdf";
import DownloadIcon from "@mui/icons-material/Download";

const PayrolllistGenerate = () => {
  const [loaderView, setLoaderView] = useState(true);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isMonthInDatabase, setIsMonthInDatabase] = useState(false);
  const navigator = useNavigate();
  const [submitDisable, setsubmitDisable] = useState(false);
  const [formValue, setFormValue] = useState({
    leaveType: "All",
    month: "",
  });
  const catagoryhandleSubmit = async (e) => {
    e.preventDefault();
    const { leaveType, month } = formValue;
    if (
      leaveType === "teacherId" ||
      leaveType === "driverId" ||
      leaveType === "All"
    ) {
      setLoaderView(true);
      setSelectedCategory(leaveType);
      setSelectedMonth(month);
      setsubmitDisable(true);
      getData();
    }
  };

  const goback =()=>{
    navigator("/payrollList")
  }
  const [dataFromDatabase, setDataFromDatabase] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formValue.month !== "") {
          const response = await salaryformUpdate(formValue, formValue.month);
          setDataFromDatabase(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formValue.month]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const fetchTeacherAndDriverData = async () => {
    try {
      const [teacherData, leaveData, driverData] = await Promise.all([
        viewTeacher(),
        leaveDisplay(),
        viewDriver(),
      ]);

      if (teacherData.status && leaveData.status && driverData.status) {
        const totalDaysMap = {};

        const filteredLeaves = leaveData.result.filter((leaveItem) => {
          let totalDays = 0;
          leaveItem.leaveDates.forEach((leaveDateObj) => {
            const leaveDate = new Date(leaveDateObj.date);
            if (leaveDate.getMonth() === parseInt(selectedMonth) - 1) {
              totalDays++;
            }
          });
          leaveItem.numofDays = totalDays.toString();
          return true;
        });

        filteredLeaves.forEach((leaveItem) => {
          if (
            leaveItem.approval === "Accept" &&
            leaveItem.leaveType === "LOP"
          ) {
            totalDaysMap[leaveItem.employeeId] =
              (totalDaysMap[leaveItem.employeeId] || 0) +
              parseInt(leaveItem.numofDays);
          }
        });

        const totaldaysformonth = 30;

        const teacherResult = teacherData.result.map((teacherItem) => {
          const totalworkingdays =
            totaldaysformonth - (totalDaysMap[teacherItem.teacherId] || 0);
          const salarycalculation = teacherItem.grossSalary / totaldaysformonth;
          const netsalary = salarycalculation * (totalworkingdays || 0);
          const Netsalary = Math.round(netsalary / 10) * 10;
          const selectedYear = selectedMonth ? new Date().getFullYear() : "";

          return {
            category: "Teacher",
            employeeId: teacherItem.teacherId,
            name: teacherItem.name,
            currentSalary: teacherItem.currentsalary,
            grossSalary: teacherItem.grossSalary,
            numofDays: totalDaysMap[teacherItem.teacherId] || 0,
            totalworkingdays,
            totaldaysformonth,
            Netsalary,
            month: selectedMonth,
            year: selectedYear,
          };
        });

        const driverResult = driverData.result.map((driverItem) => ({
          category: "Driver",
          employeeId: driverItem.driverId,
          name: driverItem.name,
          currentSalary: driverItem.currentsalary,
          numofDays: 0,
          month: selectedMonth,
          year: new Date().getFullYear(),
        }));

        return [...teacherResult, ...driverResult];
      } else {
        return [];
      }
    } catch (error) {
      console.error(
        "Error occurred while fetching teacher and driver data:",
        error
      );
      return [];
    }
  };

  const getData = async () => {
    try {
      if (selectedMonth) {
        let result = [];

        result = await fetchTeacherAndDriverData();

        setLoaderView(false);
        setData(result);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth]);

  const Close = () => {
    window.location.reload();
    setData([]);
    setsubmitDisable(false);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthName = (monthNumber) => {
    return monthNames[monthNumber - 1];
  };

  const handleSubmit = async () => {
    try {
      const EmployeePaySlip = data.map((item) => ({
        ...item,
        month: getMonthName(item.month),
      }));

      const response = await payrollsalary({ EmployeePaySlip });

      if (response && response.status === true) {
        toastAlert("success", response.message);
        // window.location.reload();
        navigator('/payrollList');
      } else {
        toastAlert("error", response.message || "Failed to save payroll data.");
      }
    } catch (error) {
      console.error("Error occurred while saving payroll data:", error);
      toastAlert(
        "error",
        "Failed to save payroll data. Please try again later."
      );
    }
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

      const modifiedData = [
        ...data.map((item) => ({
          "Employee ID": item.employeeId,
          "Employee Name": item.name,
          Month: `${getMonthName(item.month)} ${item.year}`,
          "Current Salary": new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(item.currentSalary),
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

  const generatePDF = (employeeId) => {
    const employeeData = data.find((item) => item.employeeId === employeeId);

    if (!employeeData) {
      console.error(`Employee with ID ${employeeId} not found.`);
      return null;
    }

    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 20,
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      heading: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        textDecoration: "underline",
      },
      text: {
        fontSize: 12,
        marginBottom: 5,
      },
    });

    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Employee Details</Text>
            <Text style={styles.text}>
              Employee ID: {employeeData.employeeId}
            </Text>
            <Text style={styles.text}>Employee Name: {employeeData.name}</Text>
            <Text style={styles.text}>
              Month: {getMonthName(employeeData.month)} {employeeData.year}
            </Text>
            <Text style={styles.text}>
              Current Salary: {employeeData.currentSalary}
            </Text>
            {/* Add other fields as needed */}
          </View>
        </Page>
      </Document>
    );

    return MyDocument;
  };

  const renderUserView = () => {
    const isMonthSelected = selectedMonth !== null;
    const renderButtons = isMonthSelected;

    return (
      <>
        <div className="std-table">
          {/* {renderButtons && ( */}
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
                <th>Pay-Slip</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="std-row" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.employeeId}</td>
                  <td>{item.name}</td>
                  <td>{`${getMonthName(item.month)} ${item.year}`}</td>
                  <td>{item.currentSalary}</td>
                  <td>{item.grossSalary}</td>
                  <td>{item.totaldaysformonth}</td>
                  <td>{item.totalworkingdays}</td>
                  <td>{item.numofDays}</td>
                  <td>{item.Netsalary || "-"}</td>
                  <td>
                  <PDFDownloadLink
                      document={generatePDF(item.employeeId, data)} // Pass the employeeId and data
                      fileName={`payroll_data_${item.employeeId}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download PDF"
                      }
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
            {renderButtons && (
              <thead>
                <tr>
                  <th>
                    <button
                      style={{ textAlign: "right" }}
                      className="tchr-month-att-btn"
                      onClick={handleSubmit}
                    >
                      Submit
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
                  <th>
                    <button
                      style={{ textAlign: "left" }}
                      className="tchr-month-att-btn"
                      onClick={Close}
                    >
                      Close
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
            <p>Generate Pay-Slip</p>
          </div>
          <div className="middle-header-right">
            <select
              name="month"
              value={formValue.month}
              onChange={handleChange}
              disabled={submitDisable}
            >
              <option value="">Select Month</option>
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {formValue.month && (
            <button
              type="submit"
              className="tchr-month-att-btn"
              onClick={catagoryhandleSubmit}
              disabled={submitDisable}
            >
              Filter
            </button>
          )}
            <button
              type="submit"
              className="tchr-month-att-btn"
              onClick={goback}
            >
              Go-Back
            </button>
          <div className="middle-header-right">
            <input type="search" placeholder="search" />
          </div>
        </div>
        {renderUserView()}
      </div>
    </div>
  );
};

export default PayrolllistGenerate;
