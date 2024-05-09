import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
import { getAllVehicle } from "../actions/adminAction";

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
//import actions
import { getSinglestudent, updateStudent } from "../actions/adminAction";
// import lib
import toastAlert from "../lib/toast";

const initialFormValue = {
  firstName: "",
  lastName: "",
  fathername: "",
  mothername: "",
  fatherphonenumber: "",
  motherphonenumber: "",
  dob: "",
  age: "",
  email: "",
  placeofbirth: "",
  aadhaarNumber: "",
  permanentaddress: "",
  temporaryaddress: "",
  bloodgroup: "",
  admissiongrade: "",
  previousgrade: "",
  previousschoolhistory: "",
  emergencyrelationname: "",
  emergencycontactNumber: "",
  contactNumber: "",
  vaccination: "",
  whatsappNumber: "",
  signature: "",
  photo: "",
  vehicleRegisterNumber: "",
  vehicleRoute: "",
};
const StudentEdit = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const navigate = useNavigate();
  const { Id } = useParams();
  const [data, setData] = useState({});
  //Photo validating state
  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const {
    firstName,
    lastName,
    dob,
    age,
    email,
    fathername,
    mothername,
    fatherphonenumber,
    motherphonenumber,
    placeofbirth,
    permanentaddress,
    temporaryaddress,
    bloodgroup,
    vaccination,
    contactNumber,
    whatsappNumber,
    emergencycontactNumber,
    emergencyrelationname,
    previousgrade,
    signature,
    photo,
    previousschoolhistory,
    aadhaarNumber,
    admissiongrade,
    vehicleRegisterNumber,
    vehicleRoute,
  } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null, 
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
  const handleFileSignatureChange = (event) => {
    const { name, files } = event.target;
    const supportedExtension = [
      ".jpg",
      ".png",
      ".jpeg",
      ".gif",
      ".pdf",
      ".doc",
    ];
    const selectedFile = files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name
        .substring(selectedFile.name.lastIndexOf("."))
        .toLowerCase();
      if (!supportedExtension.includes(fileExtension)) {
        setFileErrorMsg(
          "Please upload a valid signature file with only formates (jpg, jpeg, png, gif,pdf,doc)."
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
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("fathername", fathername);
      formData.append("mothername", mothername);
      formData.append("dob", dob);
      formData.append("age", age);
      formData.append("email", email);
      formData.append("placeofbirth", placeofbirth);
      formData.append("permanentaddress", permanentaddress);
      formData.append("temporaryaddress", temporaryaddress);
      formData.append("bloodgroup", bloodgroup);
      formData.append("vaccination", vaccination);
      formData.append("contactNumber", contactNumber);
      formData.append("fatherphonenumber", fatherphonenumber);
      formData.append("motherphonenumber", motherphonenumber);
      formData.append("whatsappNumber", whatsappNumber);
      formData.append("emergencycontactNumber", emergencycontactNumber);
      formData.append("emergencyrelationname", emergencyrelationname);
      formData.append("previousgrade", previousgrade);
      formData.append("signature", signature);
      formData.append("photo", photo);
      formData.append("previousschoolhistory", previousschoolhistory);
      formData.append("aadhaarNumber", aadhaarNumber);
      formData.append("admissiongrade", admissiongrade);
      formData.append("vehicleRegisterNumber", vehicleRegisterNumber);
      formData.append("vehicleRoute", vehicleRoute);
      formData.append("Id", Id);

      let { status, message, errors } = await updateStudent(formData);
      if (status === true) {
        toastAlert("success", message);
        setFormValue(initialFormValue);
        setErrors({});
        navigate("/students");
      } else if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            firstName: errors.firstName,
            lastName: errors.lastName,
            dob: errors.dob,
            age: errors.age,
            mothername: errors.mothername,
            fathername: errors.fathername,
            placeofbirth: errors.placeofbirth,
            photo: errors.photo,
            admissiongrade: errors.admissiongrade,
            contactNumber: errors.contactNumber,
            fatherphonenumber: errors.fatherphonenumber,
            motherphonenumber: errors.motherphonenumber,
            whatsappNumber: errors.whatsappNumber,
            aadhaarNumber: errors.aadhaarNumber,
            temporaryaddress: errors.temporaryaddress,
            permanentaddress: errors.permanentaddress,
            vaccination: errors.vaccination,
            emergencycontactNumber: errors.emergencycontactNumber,
            emergencyrelationname: errors.emergencyrelationname,
            bloodgroup: errors.bloodgroup,
            previousgrade: errors.previousgrade,
            previousschoolhistory: errors.previousschoolhistory,
            signature: errors.signature,
            email: errors.email,
            vaccination: errors.vaccination,
          }));
        }
        if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  //for display the uploaded file
  const displayFile = (file) => {
    if (typeof file === "object") {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image/")) {
        return (
          <img
            src={url}
            style={{ width: "70px", marginTop: "5px" }}
            alt="Uploaded File"
          />
        );
      } else if (file.type === "application/pdf") {
        return (
          <embed
            src={url}
            type="application/pdf"
            width="70px"
            height="70px"
            style={{ marginTop: "5px" }}
          />
        );
      }
    } else if (typeof file === "string") {
      // If it's a string (URL), simply use it
      if (file.startsWith("data:") || file.startsWith("http")) {
        if (file.startsWith("data:")) {
          // If it's a data URL, display an image
          return (
            <img
              src={file}
              style={{ width: "70px", marginTop: "5px" }}
              alt="Uploaded File"
            />
          );
        } else if (file.endsWith(".pdf")) {
          // If it's a PDF URL, display a PDF viewer
          return (
            <embed
              src={file}
              type="application/pdf"
              width="70px"
              height="70px"
              style={{ marginTop: "5px" }}
            />
          );
        }
      } else {
        return null;
      }
    }
    return null;
  };
  //get individual student data
  const getData = async (id) => {
    try {
      let { status, result } = await getSinglestudent(id);
      if (status === true) {
        setFormValue(result);
        setData(result);
      } else if (status === false) {
        navigate("/students");
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  const getPhotoName = () => {
    const photoName = photo.split("/").pop();
    return photoName;
  };
  const getsignatureName = () => {
    const signatureName = signature.split("/").pop();
    return signatureName;
  };
  useEffect(() => {
    getData(Id);
  }, []);
  console.log(data, "--data");

  /////////////////////////////////////////////

  const [VehicleList, setVehicleList] = useState([]);
  const handleVehicleList = async () => {
    try {
      const respinsing = await getAllVehicle();
      const data = respinsing.result;
      setVehicleList(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleVehicleList();
  }, []);

  const [SelectedBusRoute, setSelectedBusRoute] = useState({
    vehicleRoute: "",
    vehicleRegisterNumber: "",
  });

  const handlerouteselection = (e) => {
    const fs = e.target.value;
    const sec = VehicleList.find(
      (vehicleRoute) => vehicleRoute.vehicleRegisterNumber === fs
    );
    setSelectedBusRoute({
      vehicleRoute: sec.vehicleRoute,
      vehicleRegisterNumber: fs,
    });
    setFormValue({
      ...formValue,
      vehicleRegisterNumber: fs,
      vehicleRoute: sec.vehicleRoute,
    });
  };
  useEffect(() => {
    setSelectedBusRoute({
      vehicleRoute: formValue.vehicleRoute,
      vehicleRegisterNumber: formValue.vehicleRegisterNumber,
    });
  }, [formValue]);

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          // Student-Personal Details
          <div className="person-details">
            <div className="person-header">
              <ion-icon name="person" />
              <span>
                <FontAwesomeIcon icon={faUser} className="personicon" />
                Person Details
              </span>
            </div>
            <form className="myform" action="">
              <div className="field-box">
                <label htmlFor="">
                  First Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.firstName}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Last Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.lastName}</span>
              </div>
              <div className="field-box">
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
              <div className="field-box">
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
                <span className="text-error">{inputErrors.age}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Father Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="fathername"
                  value={fathername}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.fathername}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Mother Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="mothername"
                  value={mothername}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.mothername}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Place of Birth<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="placeofbirth"
                  value={placeofbirth}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.placeofbirth}</span>
              </div>
              <div className="field-box">
                <label>
                  Upload Student Photo<sup>*</sup>
                </label>
                <input
                  type="file"
                  id="file"
                  name="photo"
                  onChange={handleFilePhotoChange}
                />
                <label htmlFor="file" className="photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof photo === "object" ? (
                    <span>{photo.name}</span>
                  ) : (
                    <span>{getPhotoName()}</span>
                  )}
                </label>
                {typeof photo === "object" && (
                  <img
                    src={URL.createObjectURL(photo)}
                    style={{ width: "60px", marginTop: "5px" }}
                  />
                )}
                {typeof photo === "string" && (
                  <img
                    src={photo}
                    style={{ width: "60px", marginTop: "5px" }}
                  />
                )}
                <span className="text-error">{fileErrorMsg}</span>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          // Student-Contact Details
          <div className="person-details" style={{ minHeight: 420 }}>
            <div className="person-header">
              <span>
                <FontAwesomeIcon icon={faPhone} className="personicon" />
                Contact Details
              </span>
            </div>
            <form action="">
              <div className="field-box">
                <label htmlFor="">
                  Mobile Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.contactNumber}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  WhatsApp Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={whatsappNumber}
                  onChange={handleChange}
                  defaultValue=""
                />
                <span className="text-error">{inputErrors.whatsappNumber}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Email Address<sup>*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="abcd123@example.com"
                />
                <span className="text-error">{inputErrors.email}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Aadhar Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={aadhaarNumber}
                  onChange={handleChange}
                  placeholder="xxxx - xxxx - xxxx - xxxx"
                />
                <span className="text-error">{inputErrors.aadhaarNumber}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Father's Mobile Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="fatherphonenumber"
                  value={fatherphonenumber}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.fatherphonenumber}
                </span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Mother's Mobile Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="motherphonenumber"
                  value={motherphonenumber}
                  onChange={handleChange}
                  defaultValue=""
                />
                <span className="text-error">
                  {inputErrors.motherphonenumber}
                </span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Permanent Address
                  <span className="proof">(As per Government Proof)</span>
                  <sup>*</sup>
                </label>
                <textarea
                  name="permanentaddress"
                  value={permanentaddress}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.permanentaddress}
                </span>
              </div>
              <div className="field-box">
                <label>
                  Temporary Address<sup>*</sup>
                </label>
                <textarea
                  name="temporaryaddress"
                  value={temporaryaddress}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.temporaryaddress}
                </span>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          // Student History Details
          <div className="person-details">
            <div className="person-header">
              <span>
                <FontAwesomeIcon icon={faHistory} className="personicon" />
                Student History
              </span>
            </div>
            <form action="">
              <div className="field-box">
                <label htmlFor="">
                  Admission Grade<sup>*</sup>
                </label>
                <select
                  name="admissiongrade"
                  value={admissiongrade}
                  onChange={handleChange}
                >
                  <option />
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
                <span className="text-error">{inputErrors.admissiongrade}</span>
              </div>
              <div className="field-box">
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
                <span className="text-error">{inputErrors.bloodgroup}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Previous Grade/Class<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="previousgrade"
                  value={previousgrade}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.previousgrade}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Vaccination Details<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="vaccination"
                  value={vaccination}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.vaccination}</span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Emergency Contact Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="emergencycontactNumber"
                  value={emergencycontactNumber}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.emergencycontactNumber}
                </span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Previous School Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="previousschoolhistory"
                  value={previousschoolhistory}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.previousschoolhistory}
                </span>
              </div>
              <div className="field-box">
                <label htmlFor="">
                  Emergency Relation Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="emergencyrelationname"
                  value={emergencyrelationname}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.emergencyrelationname}
                </span>
              </div>
              <div className="field-box">
                <label>
                  Digital Signature<sup>*</sup>
                </label>
                <input
                  type="file"
                  id="file"
                  name="signature"
                  onChange={handleFileSignatureChange}
                  accept="image/*,application/pdf"
                />
                <label htmlFor="file" className="photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof signature === "object" ? (
                    <span>{signature.name}</span>
                  ) : (
                    <span>{getsignatureName()}</span>
                  )}
                </label>
                {displayFile(signature)}
                <span className="text-error">{fileErrorMsg}</span>
              </div>

              <div className="field-box">
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

              <div className="field-box">
                <label htmlFor="">
                  Bus Id<sup>*</sup>
                </label>
                <input
                  name="vehicleRegisterNumber"
                  value={SelectedBusRoute.vehicleRegisterNumber}
                />
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };
  console.log(photo, "--photo");
  return (
    <>
      <h3 className="editname">Edit Student: {data.name}</h3>
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
export default StudentEdit;
