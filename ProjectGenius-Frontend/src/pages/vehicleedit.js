import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import {getSingleVehicle, updateVehicle} from '../actions/adminAction'

import toastAlert from "../lib/toast";

const initialFormValue = {
  vehicleRegisterNumber: "",
  vehicleType: "",
  manufacturer: "",
  seatingCapacity: "",
  status: "",
  ownerName: "",
  registrationDate: "",
  mileage: "",
  pollutionCertificate: "",
  pollutionTestedDate: "",
  pollutionValidityDate: "",
  insurance: "",
  insuranceStartDate: "",
  insuranceEndDate: "",
  isSpeedGovernorInstalled: "",
  speedLimit: "",
  fitnessCertificateNumber: "",
  fitnessTestedDate: "",
  accidentClaimsInfo: "",
  serviceHistoryDetails: "",
  usageType: "",
  vehicleRoute: "",
};

const VehicleEdit = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const navigate = useNavigate();
  const { Id } = useParams();
  const [data, setData] = useState({});
  //Photo validating state
  const [fileErrorMsg, setFileErrorMsg] = useState("");

  const getData = async (Id) => {
    try {
        let { status, result } = await getSingleVehicle(Id)
        if (status === true) {
            setFormValue(result)
            setData(result)
        } else if (status === false) {
            navigate('/vehicleview')
        }
    } catch (err) {
        console.log(err, '--err')
    }
  }

  useEffect(() => {
    getData(Id)
  }, [Id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, 
    }));
    setFormValue({ ...formValue, [name]: value });
  };

  const handleFileChange = (event) => {
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

  const {
    vehicleRegisterNumber,
    vehicleType,
    manufacturer,
    seatingCapacity,
    status,
    ownerName,
    registrationDate,
    mileage,
    pollutionCertificate,
    pollutionTestedDate,
    pollutionValidityDate,
    insurance,
    insuranceStartDate,
    insuranceEndDate,
    isSpeedGovernorInstalled,
    speedLimit,
    fitnessCertificateNumber,
    fitnessTestedDate,
    accidentClaimsInfo,
    serviceHistoryDetails,
    usageType,
    vehicleRoute,
  } = formValue;

  const handleNextClick = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };
  const handlePreClick = () => {
    setCurrentForm(currentForm - 1);
  };

  const handleSubmit = async () => {
    try {
      let formData = formValue

    let { status: apiStatus, message,} = await updateVehicle(formData, Id);
      if (apiStatus === true) {
        toastAlert("success", message);
        setFormValue(initialFormValue);
        setErrors({});
        navigate("/vehicleview");
      } else if (apiStatus === false) {
        toastAlert("error", message);
        navigate("/vehicleview");
      }
    } catch (err) {
      console.log(err)
    }

  }

  const getPollutionFileName = () => {
    const fileName = pollutionCertificate.split("/").pop();
    return fileName;
  };
  const getInsuranceFileName = () => {
    const signatureName = insurance.split("/").pop();
    return signatureName;
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <div className="teacher-details">
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Vehicle Details</span>
            </div>
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label htmlFor="VehicleRegisterNumber">
                  Vehicle Register Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="vehicleRegisterNumber"
                  id="VehicleRegisterNumber"
                  value={vehicleRegisterNumber}
                  onChange={handleChange}
                  maxLength={20}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="VehicleType">
                  Vehicle Type<sup>*</sup>
                </label>
                <select
                  type="number"
                  name="vehicleType"
                  id="VehicleType"
                  value={vehicleType}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="bus">Bus</option>
                  <option value="van">Van</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="Manufacturer">
                  Vehicle Manufacturer<sup>*</sup>
                </label>
                <select
                  id="Manufacturer"
                  name="manufacturer"
                  value={manufacturer}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="tataMotors">Tata Motors</option>
                  <option value="ashokLeyland">Ashok Leyland</option>
                  <option value="eicher">Eicher Motors</option>
                  <option value="bharatBenz">BharatBenz</option>
                  <option value="volvo">Volvo Buses</option>
                  <option value="mahindra">Mahindra</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="RegistrationDate">
                  Registration Date<sup>*</sup>
                </label>
                <div className="date-input-container ">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={registrationDate}
                    placeholder="DD/MM/YYYY"
                    readOnly
                  />
                  <input
                    type="date"
                    name="registrationDate"
                    onChange={handleChange}
                    id="RegistrationDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="Status">
                  Vehicle Status<sup>*</sup>
                </label>
                <select
                  name="status"
                  value={status}
                  onChange={handleChange}
                  id="Status"
                >
                  <option value=""></option>
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="OwnerName">
                  Owner Name<sup>*</sup>
                </label>
                <input
                  id="OwnerName"
                  type="text"
                  name="ownerName"
                  value={ownerName}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="SeatingCapacity">
                  Seating Capacity<sup>*</sup>
                </label>
                <input
                  type="number"
                  name="seatingCapacity"
                  value={seatingCapacity}
                  onChange={handleChange}
                  id="SeatingCapacity"
                />
              </div>
              <div className="teach-box">
                <label id="Mileage">
                  Mileage<sup>*</sup>
                </label>
                <input
                  type="number"
                  id="Mileage"
                  value={mileage}
                  onChange={handleChange}
                  name="mileage"
                  placeholder="Per Liter"
                />
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="teacher-details">
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Vehicle Details</span>
            </div>
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label htmlFor="PollutionTestedDate">
                  Pollution Tested Date<sup>*</sup>
                </label>
                <div className="date-input-container">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={pollutionTestedDate}
                    placeholder="DD/MM/YYYY"
                    readOnly
                  />
                  <input
                    type="date"
                    name="pollutionTestedDate"
                    onChange={handleChange}
                    id="PollutionTestedDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="PollutionValidityDate">
                  Pollution Validity Date<sup>*</sup>
                </label>
                <div className="date-input-container ">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={pollutionValidityDate}
                    placeholder="DD/MM/YYYY"
                    readOnly
                  />
                  <input
                    type="date"
                    name="pollutionValidityDate"
                    onChange={handleChange}
                    id="PollutionValidityDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="InsuranceStartDate">
                  Insurance Start Date<sup>*</sup>
                </label>
                <div className="date-input-container ">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={insuranceStartDate}
                    placeholder="DD/MM/YYYY"
                    readOnly
                  />
                  <input
                    type="date"
                    name="insuranceStartDate"
                    onChange={handleChange}
                    id="InsuranceStartDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="InsuranceEndDate">
                  Insurance End Date<sup>*</sup>
                </label>
                <div className="date-input-container ">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={insuranceEndDate}
                    placeholder="DD/MM/YYYY"
                  />
                  <input
                    type="date"
                    name="insuranceEndDate"
                    onChange={handleChange}
                    id="InsuranceEndDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="IsSpeedGovernorInstalled">
                  Speed Governor Installed<sup>*</sup>
                </label>
                <select
                  id="IsSpeedGovernorInstalled"
                  name="isSpeedGovernorInstalled"
                  value={isSpeedGovernorInstalled}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="true">Installed</option>
                  <option value="false">Not Installed</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="SpeedLimit">Speed Limit</label>
                <input
                  type="number"
                  id="SpeedLimit"
                  value={speedLimit}
                  onChange={handleChange}
                  name="speedLimit"
                />
              </div>
              <div className="teach-box">
                <label htmlFor="PollutionCertificate">
                  Pollution Certificate<sup>*</sup>
                </label>
                <input
                  type="file"
                  name="pollutionCertificate"
                  id="PollutionCertificate"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
                <label htmlFor="PollutionCertificate" className="t-photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {pollutionCertificate  === "object" ? (
                    <span>{pollutionCertificate.name}</span>
                  ) : (
                    <span>{getPollutionFileName()}</span>
                  )}
                </label>
                <span className="text-error">{fileErrorMsg}</span>
              </div>
              <div className="teach-box">
                <label htmlFor="Insurance">
                  Insurance<sup>*</sup>
                </label>
                <input
                  type="file"
                  name="insurance"
                  id="Insurance"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
                <label htmlFor="Insurance" className="t-photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof insurance === "object"  ? (
                    <span>{insurance.name}</span>
                  ) : (
                    <span>{getInsuranceFileName()}</span>
                  )}
                </label>
                <span className="text-error">{fileErrorMsg}</span>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="teacher-details">
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Vehicle Details</span>
            </div>
            <form action="" className="teacher-form">
              <div className="teach-box">
                <label htmlFor="FitnessCertificateNumber">
                  F.C Number<sup>*</sup>
                </label>
                <input
                  type="number"
                  name="fitnessCertificateNumber"
                  id="FitnessCertificateNumber"
                  value={fitnessCertificateNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="FitnessTestedDate">
                  Fitness Tested Date<sup>*</sup>
                </label>
                <div className="date-input-container ">
                  <input
                    type="text"
                    style={{ borderRadius: "4px 0px 0px 4px " }}
                    value={fitnessTestedDate}
                    placeholder="DD/MM/YYYY"
                    readOnly
                  />
                  <input
                    type="date"
                    name="fitnessTestedDate"
                    onChange={handleChange}
                    id="FitnessTestedDate"
                  />
                </div>
              </div>
              <div className="teach-box">
                <label htmlFor="UsageType">
                  Vehicle Usage Type<sup>*</sup>
                </label>
                <select
                  id="UsageType"
                  name="usageType"
                  value={usageType}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="live">Live</option>
                  <option value="spare">Spare</option>
                </select>
              </div>
              <div className="teach-box">
                <label htmlFor="AccidentClaimsInfo">
                  Accident Claims Info<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="accidentClaimsInfo"
                  id="AccidentClaimsInfo"
                  value={accidentClaimsInfo}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="ServiceHistoryDetails">
                  Service History Details<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="serviceHistoryDetails"
                  id="ServiceHistoryDetails"
                  value={serviceHistoryDetails}
                  onChange={handleChange}
                />
              </div>
              <div className="teach-box">
                <label htmlFor="VehicleRoute">
                  Vehicle Route<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="vehicleRoute"
                  id="VehicleRoute"
                  value={vehicleRoute}
                  onChange={handleChange}
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
      <h3 className="editname">Edit Vehicle: {data.vehicleNumber ? data.vehicleNumber : '' }</h3>
      <div className="container-one container-edit">
        <div className="right-content">
          {renderForm()}
          <div className="btnn">
            {currentForm == 2 && (
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
            {currentForm < 3 && (
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
            {currentForm == 3 && (
              <button
                onClick={() => {
                  handlePreClick();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
                Previous
              </button>
            )}
            {currentForm === 3 && (
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

export default VehicleEdit;
