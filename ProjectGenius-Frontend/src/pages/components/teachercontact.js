import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPhone } from "@fortawesome/free-solid-svg-icons";
//import actions
import { teacherAadhar } from "../../actions/adminAction";

const TeacherContact = (props) => {
  const [data, setData] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [onFocusPhoneNum, setFocusOnPhoneNum] = useState(false);
  const [onFocusWhatsApp, setFocusOnWhatsApp] = useState(false);
  const [onFocusEmail, setFocusOnEmail] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [onFocusFatherNum, setFocusOnFatherNum] = useState(false);
  const [onFocusMotherNum, setFocusOnMotherNum] = useState(false);
  const [onFocusPerAdd, setFocusOnPerAdd] = useState(false);
  const [onFocusTempAdd, setFocusOnTempAdd] = useState(false);
  const [onFocusAadhar, setFocusOnAadhar] = useState(false);

  const { formValue, setFormValue, handlePreClick, handleNextClick } = props;
  const {
    phoneNumber,
    email,
    fatherphonenumber,
    permanentaddress,
    whatsappNumber,
    aadhaarNumber,
    motherphonenumber,
    temporaryaddress,
  } = formValue;
  const isButtonDisable =
    phoneNumber.length === 10 &&
    email !== "" &&
    fatherphonenumber.length === 10 &&
    permanentaddress !== "" &&
    whatsappNumber.length === 10 &&
    aadhaarNumber.length === 14 &&
    motherphonenumber.length === 10 &&
    temporaryaddress !== "";
  const triggerPreviousForm = () => {
    handlePreClick();
  };
  const triggerNextForm = () => {
    handleNextClick();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };
  // validating an Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setEmailValid(validateEmail(value));
  };

  const getData = async () => {
    let { status, result } = await teacherAadhar();
    if (status == true) {
      setData(result);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let isAadharExists = false;

    for (let i = 0; i < data.length; i++) {
      const ans = data[i];
      const ans2 = ans.aadhaarNumber;

      if (ans2 === aadhaarNumber) {
        isAadharExists = true;
        break;
      }
    }

    if (isAadharExists) {
      setAadharError("Aadhar number already exists");
    } else {
      setAadharError("");
    }
  }, [data, aadhaarNumber]);

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
              onBlur={() =>
                phoneNumber.length < 10
                  ? setFocusOnPhoneNum(true)
                  : setFocusOnPhoneNum(false)
              }
            />
            {phoneNumber.length < 10 && onFocusPhoneNum && (
              <span className="text-error">
                Please enter valid 10 digit mobile number
              </span>
            )}
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
              onBlur={() =>
                whatsappNumber.length < 10
                  ? setFocusOnWhatsApp(true)
                  : setFocusOnWhatsApp(false)
              }
            />
            {whatsappNumber.length < 10 && onFocusWhatsApp && (
              <span className="text-error">
                Please enter valid 10 digit mobile number
              </span>
            )}
          </div>
          <div className="teach-box">
            <label htmlFor="">
              Email Address<sup>*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="abcd123@example.com"
              onFocus={() => setFocusOnEmail(true)}
              onBlur={() => setFocusOnEmail(false)}
            />
            {!isEmailValid && onFocusEmail && (
              <span className="text-error">
                Please enter a valid email address(Ex:abc123@gmail.com)
              </span>
            )}
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
              onBlur={() =>
                aadhaarNumber.length < 14
                  ? setFocusOnAadhar(true)
                  : setFocusOnAadhar(false)
              }
              placeholder="xxxx - xxxx - xxxx"
            />
            {aadhaarNumber.length < 14 && onFocusAadhar && (
              <span className="text-error">
                Please enter valid 12 digit aadhaar number in format
                like(1234-1234-1234)
              </span>
            )}
            {aadharError && <span className="text-error">{aadharError}</span>}
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
              maxLength={10}
              onBlur={() =>
                fatherphonenumber.length < 10
                  ? setFocusOnFatherNum(true)
                  : setFocusOnFatherNum(false)
              }
            />
            {fatherphonenumber.length < 10 && onFocusFatherNum && (
              <span className="text-error">
                Please enter valid 10 digit mobile number
              </span>
            )}
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
              maxLength={10}
              onBlur={() =>
                motherphonenumber.length < 10
                  ? setFocusOnMotherNum(true)
                  : setFocusOnMotherNum(false)
              }
            />
            {motherphonenumber.length < 10 && onFocusMotherNum && (
              <span className="text-error">
                Please enter valid 10 digit mobile number
              </span>
            )}
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
              onFocus={() => setFocusOnPerAdd(true)}
              onBlur={() => setFocusOnPerAdd(false)}
            />
            {permanentaddress.length >= 50 && onFocusPerAdd && (
              <span className="text-error">
                Reached max characters limit 50
              </span>
            )}
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
              onFocus={() => setFocusOnTempAdd(true)}
              onBlur={() => setFocusOnTempAdd(false)}
            />
            {temporaryaddress.length >= 50 && onFocusTempAdd && (
              <span className="text-error">
                Reached max characters limit 50
              </span>
            )}
          </div>
        </form>
      </div>
      <div className="btnn">
        <button className="previous" onClick={triggerPreviousForm}>
          <FontAwesomeIcon icon={faArrowLeft} className="myarrow" />
          Previous
        </button>
        <button
          onClick={triggerNextForm}
          disabled={!isButtonDisable}
          style={{ backgroundColor: isButtonDisable ? "#ff80a6" : "gray" }}
        >
          Next
          <img src="images/arrow.png" alt="" />
        </button>
      </div>
    </>
  );
};

export default TeacherContact;
