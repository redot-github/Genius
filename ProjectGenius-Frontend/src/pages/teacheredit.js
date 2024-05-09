import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
import {
  faArrowRight,
  faUpload,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
//import actions
import {
  getAllVehicle,
  getSingleteacher,
  updateTeacher,
} from "../actions/adminAction";
// import lib
import toastAlert from "../lib/toast";

const initialFormValue = {
  firstName: "",
  lastName: "",
  currentsalary: "",
  teachingexperience: "",
  maritalstatus: "",
  teachingcertificates: "",
  subjects: "",
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
  emergencycontactNumber: "",
  phoneNumber: "",
  vaccination: "",
  whatsappNumber: "",
  teachersignature: "",
  teacherphoto: "",
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

const TeacherEdit = () => {
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
    fatherphonenumber,
    motherphonenumber,
    placeofbirth,
    permanentaddress,
    temporaryaddress,
    bloodgroup,
    vaccination,
    phoneNumber,
    whatsappNumber,
    emergencycontactNumber,
    teachingexperience,
    maritalstatus,
    teachingcertificates,
    teachersignature,
    teacherphoto,
    subjects,
    aadhaarNumber,
    dearnessallowance,
    dearnessallowanceAmount,
    medicalallowance,
    medicalallowanceAmount,
    hraAllowance,
    hraAllowanceAmount,
    grossSalary,
    vehicleRoute,
    vehicleRegisterNumber,
  } = formValue;

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
    if (currentForm < 4) {
      setCurrentForm(currentForm + 1);
    }
  };
  const handlePreClick = () => {
    setCurrentForm(currentForm - 1);
  };

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

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("higherqualification", higherqualification);
      formData.append("teachingexperience", teachingexperience);
      formData.append("dob", dob);
      formData.append("age", age);
      formData.append("email", email);
      formData.append("placeofbirth", placeofbirth);
      formData.append("permanentaddress", permanentaddress);
      formData.append("temporaryaddress", temporaryaddress);
      formData.append("bloodgroup", bloodgroup);
      formData.append("vaccination", vaccination);
      formData.append("phoneNumber", phoneNumber);
      formData.append("fatherphonenumber", fatherphonenumber);
      formData.append("motherphonenumber", motherphonenumber);
      formData.append("whatsappNumber", whatsappNumber);
      formData.append("emergencycontactNumber", emergencycontactNumber);
      formData.append("maritalstatus", maritalstatus);
      formData.append("teachingcertificates", teachingcertificates);
      formData.append("teachersignature", teachersignature);
      formData.append("teacherphoto", teacherphoto);
      formData.append("subjects", subjects);
      formData.append("aadhaarNumber", aadhaarNumber);
      formData.append("Id", Id);
      formData.append("currentsalary", currentsalary);
      formData.append("grossSalary", grossSalary);
      formData.append("dearnessallowanceAmount", dearnessallowanceAmount);
      formData.append("dearnessallowance", dearnessallowance);
      formData.append("medicalallowance", medicalallowance);
      formData.append("medicalallowanceAmount", medicalallowanceAmount);
      formData.append("hraAllowanceAmount", hraAllowanceAmount);
      formData.append("hraAllowance", hraAllowance);
      formData.append("vehicleRoute", vehicleRoute);
      formData.append("vehicleRegisterNumber", vehicleRegisterNumber);

      let { status, message, errors } = await updateTeacher(formData);
      if (status === true) {
        toastAlert("success", message);
        setFormValue(initialFormValue);
        setErrors({});
        navigate("/teacherview");
      } else if (status === false) {
        if (errors) {
          setErrors(errors);
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            firstName: errors.firstName,
            lastName: errors.lastName,
            dob: errors.dob,
            age: errors.age,
            currentsalary: errors.currentsalary,
            subjects: errors.subjects,
            placeofbirth: errors.placeofbirth,
            teacherphoto: errors.teacherphoto,
            maritalstatus: errors.maritalstatus,
            phoneNumber: errors.phoneNumber,
            fatherphonenumber: errors.fatherphonenumber,
            motherphonenumber: errors.motherphonenumber,
            whatsappNumber: errors.whatsappNumber,
            aadhaarNumber: errors.aadhaarNumber,
            temporaryaddress: errors.temporaryaddress,
            permanentaddress: errors.permanentaddress,
            vaccination: errors.vaccination,
            emergencycontactNumber: errors.emergencycontactNumber,
            teachingcertificates: errors.teachingcertificates,
            bloodgroup: errors.bloodgroup,
            higherqualification: errors.higherqualification,
            teachingexperience: errors.teachingexperience,
            teachersignature: errors.teachersignature,
            email: errors.email,
            vaccination: errors.vaccination,
          }));
        }

        if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {}
  };
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

  const getData = async (id) => {
    try {
      let { status, result } = await getSingleteacher(id);
      if (status === true) {
        setFormValue(result);
        setData(result);
      } else if (status === false) {
        // navigate('/students')
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getData(Id);
  }, []);
  const getPhotoName = () => {
    const photoName = teacherphoto.split("/").pop();
    return photoName;
  };
  const getsignatureName = () => {
    const signatureName = teachersignature.split("/").pop();
    return signatureName;
  };
  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return (
          // Personal Details form JSX
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
                />
                <span className="text-error">{inputErrors.firstName}</span>
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
                />
                <span className="text-error">{inputErrors.lastName}</span>
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
                {<span className="text-error">{inputErrors.dob}</span>}
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
                {<span className="text-error">{inputErrors.age}</span>}
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
                <span className="text-error">{inputErrors.maritalstatus}</span>
              </div>
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
                <span className="text-error">{inputErrors.placeofbirth}</span>
              </div>
              <div className="teach-box">
                <label>Upload Teacher Photo</label>
                <input
                  type="file"
                  id="file"
                  name="teacherphoto"
                  onChange={handleFilePhotoChange}
                />
                <label htmlFor="file" className="t-photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof teacherphoto === "object" ? (
                    <span>{teacherphoto.name}</span>
                  ) : (
                    <span>{getPhotoName()}</span>
                  )}
                </label>
                {typeof teacherphoto === "object" && (
                  <img
                    src={URL.createObjectURL(teacherphoto)}
                    style={{ width: "60px", marginTop: "5px" }}
                  />
                )}
                {typeof teacherphoto === "string" && (
                  <img
                    src={teacherphoto}
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
          // Contact Details form JSX
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
                />
                <span className="text-error">{inputErrors.phoneNumber}</span>
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
                />
                <span className="text-error">{inputErrors.whatsappNumber}</span>
              </div>
              <div className="teach-box">
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
              <div className="teach-box">
                <label htmlFor="">
                  Aadhar Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={aadhaarNumber}
                  onChange={handleChange}
                  placeholder="xxxx - xxxx - xxxx"
                />
                <span className="text-error">{inputErrors.email}</span>
              </div>
              <div className="teach-box">
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
              <div className="teach-box">
                <label htmlFor="">
                  Mother's Mobile Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="motherphonenumber"
                  value={motherphonenumber}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.motherphonenumber}
                </span>
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
                />
                <span className="text-error">
                  {inputErrors.permanentaddress}
                </span>
              </div>
              <div className="teach-box">
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
          // Student History form JSX
          <div className="teacher-details" style={{ minHeight: 420 }}>
            <div className="teacher-header">
              <ion-icon name="person" />
              <span>Teacher History</span>
            </div>
            <form action="" className="teacher-form">
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
                  <option>High School Diploma</option>
                  <option>Associate's Degree</option>
                  <option>Bachelor's Degree</option>
                  <option>Bachelor's Degree in Education</option>
                  <option>Master's Degree</option>
                  <option>Master's Degree in Education</option>
                  <option>Doctorate (Ph.D.) in Education</option>
                  <option>Teaching Certificate</option>
                  <option>Postgraduate Certificate in Education</option>
                  <option>Other</option>
                </select>
                <span className="text-error">
                  {inputErrors.higherqualification}
                </span>
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
                <span className="text-error">{inputErrors.bloodgroup}</span>
              </div>
              <div className="teach-box">
                <label htmlFor="">
                  Previous Teaching Experience (in Years)<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="teachingexperience"
                  value={teachingexperience}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.teachingexperience}
                </span>
              </div>
              <div className="teach-box">
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
              <div className="teach-box">
                <label htmlFor="">
                  Subject(s) Taught<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="subjects"
                  value={subjects}
                  onChange={handleChange}
                />
                <span className="text-error">{inputErrors.subjects}</span>
              </div>
              <div className="teach-box">
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

              <div className="teach-box">
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
                  Bus Number<sup>*</sup>
                </label>
                <input
                  name="vehicleRegisterNumber"
                  value={SelectedBusRoute.vehicleRegisterNumber}
                  onChange={handlerouteselection}
                />
              </div>

              <div className="teach-box">
                <label htmlFor="">
                  Teaching Certifications(if any)<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="teachingcertificates"
                  value={teachingcertificates}
                  onChange={handleChange}
                />
                <span className="text-error">
                  {inputErrors.teachingcertificates}
                </span>
              </div>
              <div className="teach-box">
                <label>Digital Signature</label>
                <input
                  type="file"
                  id="file"
                  name="teachersignature"
                  onChange={handleFileSignatureChange}
                  accept="image/*,application/pdf"
                />
                <label htmlFor="file" className="t-photo">
                  <div style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  {typeof teachersignature === "object" ? (
                    <span>{teachersignature.name}</span>
                  ) : (
                    <span>{getsignatureName()}</span>
                  )}
                </label>
                {displayFile(teachersignature)}
                <span className="text-error">{fileErrorMsg}</span>
              </div>
            </form>
          </div>
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
        return null;
    }
  };
  return (
    <>
      <h3 className="editname">Edit Teacher: {data.name}</h3>
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
export default TeacherEdit;
