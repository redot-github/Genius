import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
//fontawesome pacakge
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHistory,
  faPhone,
  faUpload,
  faUser,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  getAllVehicle,
  getSingleDriver,
  updateDriver,
} from "../actions/adminAction";

import toastAlert from "../lib/toast";

const initialFormValue = {
  firstName: "",
  lastName: "",
  currentsalary: "",
  drivingexperience: "",
  maritalstatus: "",
  role: "",
  licencetype: "",
  dob: "",
  age: "",
  email: "",
  placeofbirth: "",
  aadhaarNumber: "",
  permanentaddress: "",
  temporaryaddress: "",
  bloodgroup: "",
  licencenumber: "",
  phoneNumber: "",
  licenceexpirydate: "",
  whatsappNumber: "",
  licencephoto: "",
  driverphoto: "",
  higherqualification: "",
  dearnessallowance: "",
  dearnessallowanceAmount: "",
  medicalallowance: "",
  medicalallowance: "",
  hraAllowance: "",
  hraAllowanceAmount: "",
  grossSalary: "",
  vehicleRoute: "",
  vehicleRegisterNumber: "",
};

const DriverEdit = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [inputErrors, setInputErrors] = useState({});
  //Photo validating state
  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [VehicleList, setVehicleList] = useState([]);

  const {
    firstName,
    lastName,
    dob,
    age,
    email,
    higherqualification,
    currentsalary,
    placeofbirth,
    permanentaddress,
    temporaryaddress,
    bloodgroup,
    licenceexpirydate,
    phoneNumber,
    whatsappNumber,
    licencenumber,
    drivingexperience,
    maritalstatus,
    role,
    licencephoto,
    driverphoto,
    licencetype,
    aadhaarNumber,
    grossSalary,
    hraAllowance,
    hraAllowanceAmount,
    dearnessallowance,
    dearnessallowanceAmount,
    medicalallowance,
    medicalallowanceAmount,
    vehicleRoute,
    vehicleRegisterNumber,
  } = formValue;

  const getData = async (Id) => {
    try {
      let { status, result } = await getSingleDriver(Id);
      if (status === true) {
        setFormValue(result);
        setData(result);
      } else if (status === false) {
        navigate("/driverview");
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  useEffect(() => {
    getData(Id);
  }, []);

  const displayData = async () => {
    try {
      const vehicleDetails = await getAllVehicle();
      const data = vehicleDetails.result;
      setVehicleList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    displayData();
  }, []);

  const [SelectedBusRoute, setSelectedBusRoute] = useState({
    vehicleRoute: "",
    vehicleRegisterNumber: "",
  });

  const handlerouteselection = (e) => {
    const selectedNumber = e.target.value;
    const selectedRoute = VehicleList.find(
      (vehicleRoute) => vehicleRoute.vehicleRegisterNumber === selectedNumber
    );

    setSelectedBusRoute({
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber,
    });

    setFormValue({
      ...formValue,
      vehicleRoute: selectedRoute ? selectedRoute.vehicleRoute : "",
      vehicleRegisterNumber: selectedNumber,
    });
  };

  useEffect(() => {
    setSelectedBusRoute({
      vehicleRoute: formValue.vehicleRoute,
      vehicleRegisterNumber: formValue.vehicleRegisterNumber,
    });
  }, [formValue]);

  useEffect(() => {
    const total = (
      parseInt(formValue.currentsalary || 0) +
      parseInt(formValue.dearnessallowanceAmount || 0) +
      parseInt(formValue.medicalallowanceAmount || 0) +
      parseInt(formValue.hraAllowanceAmount || 0)
    ).toString();
    setFormValue({ ...formValue, grossSalary: total });
  }, [
    formValue.currentsalary,
    formValue.dearnessallowanceAmount,
    formValue.medicalallowanceAmount,
    formValue.hraAllowanceAmount,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, // Clear the error for this input
    }));
    if (name === "dob") {
      // Calculate age based on the selected date of birth
      const birthdate = moment(value, "YYYY-MM-DD");
      const today = moment();
      const age = today.diff(birthdate, "years");
      setFormValue({ ...formValue, age, [name]: value });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;

    if (
      name === "dearnessallowance" ||
      name === "medicalallowance" ||
      name === "hraAllowance"
    ) {
      const percentage = parseFloat(value);
      const currentSalaryValue = parseFloat(formValue.currentsalary);
      if (!isNaN(percentage) && !isNaN(currentSalaryValue)) {
        const allowanceAmount = (currentSalaryValue * percentage) / 100;
        setFormValue({
          ...formValue,
          [name]: value,
          [`${name}Amount`]: allowanceAmount.toFixed(2),
        });
      } else {
        setFormValue({ ...formValue, [name]: value, [`${name}Amount`]: "" });
      }
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  const handleFilePhotoChange = (event) => {
    const { name, files } = event.target;
    const supportedExtension = [".jpg", ".png", ".jpeg", ".gif", ".webp"];
    const selectedFile = files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name
        .substring(selectedFile.name.lastIndexOf("."))
        .toLowerCase();
      if (!supportedExtension.includes(fileExtension)) {
        setFileErrorMsg(
          "Please upload a valid image file with only formates (jpg, jpeg, png, gif)."
        );
        setFormValue({ ...formValue, ...{ [name]: "" } });
      } else if (selectedFile.size > 300000 || selectedFile.size < 30000) {
        setFileErrorMsg("File size should be Minimum 30Kb to Maximum 300Kb");
        setFormValue({ ...formValue, ...{ [name]: "" } });
      } else {
        setFileErrorMsg("");
        setFormValue({ ...formValue, ...{ [name]: selectedFile } });
      }
    }
  };

  const getDriverPhotoName = () => {
    const photoName = driverphoto.split("/").pop();
    return photoName;
  };

  const getDriverLicenceName = () => {
    const photoName = licencephoto.split("/").pop();
    return photoName;
  };

  const handleNextClick = () => {
    if (currentForm < 4) {
      setCurrentForm(currentForm + 1);
    }
  };
  const handlePreClick = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleSubmit = async () => {
    try {
      let formData = formValue;

      let { status: apiStatus, message } = await updateDriver(formData, Id);
      if (apiStatus === true) {
        toastAlert("success", message);
        setFormValue(initialFormValue);
        setErrors({});
        navigate("/driverview");
      } else if (apiStatus === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <>
            <div className="teacher-details">
              <div className="teacher-header">
                <ion-icon name="person" />
                <span>Personal Details</span>
              </div>
              <form action="" className="teacher-form">
                <div className="teach-box">
                  <label htmlFor="">
                    First Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    maxLength={15}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Last Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    maxLength={15}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Date of Birth<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={dob}
                      placeholder="DD/MM/YYYY"
                      readOnly
                    />
                    <input type="date" name="dob" onChange={handleChange} />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Age<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Marital Status<sup>*</sup>
                  </label>
                  <select
                    name="maritalstatus"
                    value={maritalstatus}
                    onChange={handleChange}
                  >
                    <option />
                    <option>Married</option>
                    <option>Single</option>
                    <option>Widowed</option>
                    <option>Divorced</option>
                  </select>
                </div>
                {/* <div className="teach-box">
                  <label htmlFor="">
                    Current Salary<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="currentsalary"
                    value={currentsalary}
                  />
                </div> */}
                <div className="teach-box">
                  <label htmlFor="">
                    Place of Birth<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="placeofbirth"
                    value={placeofbirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="teach-box">
                  <label>Upload Driver Photo</label>
                  <input
                    type="file"
                    id="file"
                    name="driverphoto"
                    onChange={handleFilePhotoChange}
                  />
                  <label htmlFor="file" className="t-photo">
                    <div style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    {typeof driverphoto === "object" ? (
                      <span>{driverphoto.name}</span>
                    ) : (
                      <span>{getDriverPhotoName()}</span>
                    )}
                  </label>
                  <span className="text-error">{fileErrorMsg}</span>
                  {driverphoto === "" && fileErrorMsg === "" && (
                    <span className="text-error">*No file uploaded</span>
                  )}
                </div>
              </form>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="teacher-details" style={{ minHeight: 420 }}>
              <div className="teacher-header">
                <ion-icon name="person" />
                <span>Contact Details</span>
              </div>
              <form action="" className="teacher-form">
                <div className="teach-box">
                  <label htmlFor="">
                    Mobile Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    WhatsApp Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={whatsappNumber}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="abcd123@example.com"
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Aadhar Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={aadhaarNumber}
                    onChange={handleChange}
                    maxLength={14}
                    placeholder="xxxx - xxxx - xxxx"
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Permanent Address
                    <span className="proof">(As per Government Proof)</span>
                    <sup>*</sup>
                  </label>
                  <textarea
                    name="permanentaddress"
                    value={permanentaddress}
                    onChange={handleChange}
                    maxLength={50}
                  />
                </div>
                <div className="teach-box">
                  <label>
                    Temporary Address<sup>*</sup>
                  </label>
                  <textarea
                    name="temporaryaddress"
                    value={temporaryaddress}
                    onChange={handleChange}
                    maxLength={50}
                  />
                </div>
                <div className="allocate-center">
          <div className="teach-box">
            <div className="bus-allocation-heading">Bus Allocation</div>
            <label htmlFor="">
              Bus Stop<sup>*</sup>
            </label>
            <select
              name="vehicleRoute"
              value={SelectedBusRoute.vehicleRegisterNumber}
              onChange={handlerouteselection}
            >
              <option value=""></option>
              {VehicleList.map((route) => (
                <option
                  key={route.vehicleRegisterNumber}
                  value={route.vehicleRegisterNumber}
                >
                  {route.vehicleRoute}
                </option>
              ))}
            </select>
          </div>
          <div className="teach-box">
            <label htmlFor="">
              Bus Number<sup>*</sup>
            </label>
            <input
              name="vehicleRegisterNumber"
              value={SelectedBusRoute.vehicleRegisterNumber}
              onChange={handlerouteselection}
            />
          </div>
          </div>
              </form>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="teacher-details" style={{ minHeight: 420 }}>
              <div className="teacher-header">
                <ion-icon name="person" />
                <span>Teacher History</span>
              </div>
              <form action="" className="teacher-form">
                <div className="teach-box">
                  <label htmlFor="">
                    Job Role<sup>*</sup>
                  </label>
                  <select name="role" value={role} onChange={handleChange}>
                    <option />
                    <option>Driver</option>
                    <option>Attender</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Licence Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="licencenumber"
                    value={licencenumber}
                    onChange={handleChange}
                    disabled={role === "Attender"}
                    style={{
                      backgroundColor:
                        role === "Attender" ? "transparent" : "white",
                    }}
                  />
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Licence Type<sup>*</sup>
                  </label>
                  <select
                    name="licencetype"
                    value={licencetype}
                    onChange={handleChange}
                    disabled={role === "Attender"}
                    style={{
                      backgroundColor:
                        role === "Attender" ? "transparent" : "white",
                    }}
                  >
                    <option />
                    <option>LMV</option>
                    <option>HMV</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Licence Expiry Date<sup>*</sup>
                  </label>
                  <div className="date-input-container ">
                    <input
                      type="text"
                      style={{ borderRadius: "4px 0px 0px 4px " }}
                      value={licenceexpirydate}
                      placeholder="DD/MM/YYYY"
                      readOnly
                      disabled={role === "Attender"}
                    />
                    <input
                      type="date"
                      name="licenceexpirydate"
                      onChange={handleChange}
                      disabled={role === "Attender"}
                      style={{
                        backgroundColor:
                          role === "Attender" ? "transparent" : "white",
                      }}
                    />
                  </div>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Educational Qualifications(Highest Degree)<sup>*</sup>
                  </label>
                  <select
                    name="higherqualification"
                    value={higherqualification}
                    onChange={handleChange}
                  >
                    <option></option>
                    <option>SSLC</option>
                    <option>Higher Secondary</option>
                    <option>ITI/Diploma</option>
                    <option>Degree</option>
                    <option>Below SSLC</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Blood Group<sup>*</sup>
                  </label>
                  <select
                    name="bloodgroup"
                    value={bloodgroup}
                    onChange={handleChange}
                  >
                    <option />
                    <option>A+ve</option>
                    <option>A-ve</option>
                    <option>B+ve</option>
                    <option>B-ve</option>
                    <option>AB+ve</option>
                    <option>AB-ve</option>
                    <option>O+ve</option>
                    <option>O-ve</option>
                    <option>A1B+</option>
                    <option>A1B-</option>
                    <option>A2B+</option>
                    <option>A2B-</option>
                    <option>Bombay Blood Group</option>
                  </select>
                </div>
                <div className="teach-box">
                  <label htmlFor="">
                    Previous Driving Experience (in Years)<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="drivingexperience"
                    value={drivingexperience}
                    onChange={handleChange}
                  />
                </div>
                <div className="teach-box">
                  <label>
                    Upload Licence Photo<sup>*</sup>
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="licencephoto"
                    onChange={handleFilePhotoChange}
                    accept="image/*,application/pdf"
                  />
                  <label htmlFor="file" className="t-photo">
                    <div style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    {typeof licencephoto === "object" ? (
                      <span>{licencephoto.name}</span>
                    ) : (
                      <span>{getDriverLicenceName()}</span>
                    )}
                  </label>
                  <span className="text-error">{fileErrorMsg}</span>
                  {licencephoto === "" && fileErrorMsg === "" && (
                    <span className="text-error">*No file uploaded</span>
                  )}
                </div>
              </form>
            </div>
          </>
        );
      case 4:
        return (
          <div className="teacher-details">
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Allowance Details</span>
            </div>
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label htmlFor="">
                  Basic Salary<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="currentsalary"
                  value={currentsalary}
                  onChange={handleChange2}
                  maxLength={10}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="">
                  Dearness Allowance<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="dearnessallowance"
                  placeholder="%"
                  value={dearnessallowance}
                  onChange={handleChange2}
                  maxLength={2}
                />
                <span value={dearnessallowanceAmount}>
                  {dearnessallowanceAmount !== undefined
                    ? `Amount: ${dearnessallowanceAmount}`
                    : ""}
                </span>
              </div>

              <div className="teach-box">
                <label htmlFor="">
                  Medical Allowance<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="medicalallowance"
                  placeholder="%"
                  value={medicalallowance}
                  onChange={handleChange2}
                  maxLength={2}
                />
                <span value={medicalallowanceAmount}>
                  {medicalallowanceAmount !== undefined
                    ? `Amount: ${medicalallowanceAmount}`
                    : ""}
                </span>
              </div>

              <div className="teach-box">
                <label htmlFor="">
                  HRA<sup>*</sup>
                  (in Percentage %)
                </label>
                <input
                  type="text"
                  name="hraAllowance"
                  placeholder="%"
                  value={hraAllowance}
                  onChange={handleChange2}
                  maxLength={2}
                />
                <span value={hraAllowanceAmount}>
                  {hraAllowanceAmount !== undefined
                    ? `Amount: ${hraAllowanceAmount}`
                    : ""}
                </span>
              </div>

              <div className="teach-box">
                <label htmlFor="">
                  Gross Salary<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="grossSalary"
                  value={grossSalary}
                  onChange={handleChange2}
                  disabled
                />
              </div>
            </form>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <>
      <h3 className="editname">Edit Driver: {data.name}</h3>
      <div className="container-one container-edit">
        <div className="right-content">
          {renderForm()}
          <div className="btnn">
            {currentForm < 4 && currentForm !== 1 && (
              <button
                className="previous"
                onClick={() => {
                  handlePreClick();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
                Previous
              </button>
            )}
            {currentForm < 4 && (
              <button
                onClick={() => {
                  handleNextClick();
                }}
              >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="myarrow" />
              </button>
            )}
          </div>
          <div className="sub-btnn">
            {currentForm === 4 && (
              <button
                onClick={() => {
                  handlePreClick();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
                Previous
              </button>
            )}
            {currentForm === 4 && (
              <button
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverEdit;
