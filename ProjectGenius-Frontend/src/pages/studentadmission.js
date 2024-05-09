import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import AdmissionFormOne from './components/studentpersonal'
import AdmissionFormTwo from './components/studentcontact';
import AdmissionFormFinal from './components/studenthistory';
//import actions
import { registerStudent } from '../actions/adminAction';
// import lib
import toastAlert from '../lib/toast';
import FormProgressBar from './components/progressbar';
import studentpersonal from '../../src/pages/components/studentpersonal'
// import { getAllVehicle } from '../actions/adminAction';
// import { SelectedBusRoute } from '../pages/components/studentpersonal';





const initialFormValue = {
  'firstName': '',
  'lastName': '',
  'fathername': '',
  'mothername': '',
  'fatherphonenumber': '',
  'motherphonenumber': '',
  'dob': '',
  'age': '',
  'email': '',
  'placeofbirth': '',
  'aadhaarNumber': '',
  'permanentaddress': '',
  'temporaryaddress': '',
  'bloodgroup': '',
  'admissiongrade': '',
  'previousgrade': '',
  'previousschoolhistory': '',
  'emergencyrelationname': '',
  'emergencycontactNumber': '',
  'contactNumber': '',
  'vaccination': '',
  'whatsappNumber': '',
  'signature': '',
  'photo': '',
  'vehicleRegisterNumber' : '',
  'vehicleRoute' : '',
}
const NewAdmission = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValue, setFormValue] = useState(initialFormValue);

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
    vehicleRoute
  } = formValue;

  const navigate =useNavigate();

  const handleNextClick = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1)
    }
  };

  const handlePreClick = () => {
    setCurrentForm(currentForm - 1)
};

  const handleSubmit = async () => {
    console.log(handleSubmit)
    try {
      let formData = new FormData();
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('fathername', fathername)
      formData.append('mothername', mothername)
      formData.append('dob', dob)
      formData.append('age', age)
      formData.append('email', email)
      formData.append('placeofbirth', placeofbirth)
      formData.append('permanentaddress', permanentaddress)
      formData.append('temporaryaddress', temporaryaddress)
      formData.append('bloodgroup', bloodgroup)
      formData.append('vaccination', vaccination)
      formData.append('contactNumber', contactNumber)
      formData.append('fatherphonenumber', fatherphonenumber)
      formData.append('motherphonenumber', motherphonenumber)
      formData.append('whatsappNumber', whatsappNumber)
      formData.append('emergencycontactNumber', emergencycontactNumber)
      formData.append('emergencyrelationname', emergencyrelationname)
      formData.append('previousgrade', previousgrade)
      formData.append('signature', signature)
      formData.append('photo', photo)
      formData.append('previousschoolhistory', previousschoolhistory)
      formData.append('aadhaarNumber', aadhaarNumber)
      formData.append('admissiongrade', admissiongrade);
      formData.append('vehicleRegisterNumber', vehicleRegisterNumber);
      formData.append('vehicleRoute', vehicleRoute);
  
      let { status, message, errors } = await registerStudent(formData)
      if (status === true) {
        
        toastAlert('success', message)
        setFormValue(initialFormValue)
        navigate('/students')
      }
    } catch (err) {
      console.log(err,'--err')
    }
}
  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return <AdmissionFormOne formValue={formValue} setFormValue={setFormValue}  handleNextClick={handleNextClick}  />;
      case 2:
        return <AdmissionFormTwo formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick}  handleNextClick={handleNextClick}  />;
      case 3:
        return <AdmissionFormFinal formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleSubmit={handleSubmit}  />;
      default:
        return null;
    }
  }

  return (
    <div className="container-one">
      <Sidebar />
      <div className="right-content">
      <Navbar pageTitle="New Student" />
      <div className='progress-bar-section'>
        {/* <FormProgressBar formValue={formValue} /> */}
        </div>
        {renderForm()}
      </div>
    </div>

  )
}
export default NewAdmission;