import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

//import actions
import { registerDriver } from '../actions/adminAction';

// import lib
import toastAlert from '../lib/toast';
//import components
import DriverPersonal from './components/driverpersonal';
import DriverContact from './components/drivercontact';
import DriverHistory from './components/driverhistory';
import DriverSalary from './components/driversalary';

const initialFormValue = {
    'firstName': '',
    'lastName': '',
    'currentsalary': '',
    'drivingexperience': '',
    'maritalstatus': '',
    'role': '',
    'licencetype': '',
    'dob': '',
    'age': '',
    'email': '',
    'placeofbirth': '',
    'aadhaarNumber': '',
    'permanentaddress': '',
    'temporaryaddress': '',
    'bloodgroup': '',
    'licencenumber': '',
    'phoneNumber': '',
    'licenceexpirydate': '',
    'whatsappNumber': '',
    'licencephoto': '',
    'driverphoto': '',
    'higherqualification': '',
    'grossSalary': '',
    'dearnessallowance':'',
    'dearnessallowanceAmount':'',
    'medicalallowance':'',
    'medicalallowanceAmount':'',
    'hraAllowance':'',
    'hraAllowanceAmount':'',
    'vehicleRoute': '',
    'vehicleRegistrationNumber': ''
}

const Driver = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const [formValue, setFormValue] = useState(initialFormValue);
  
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
      vehicleRegisterNumber
    } = formValue;
  
    const navigate = useNavigate();
  
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
        let formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('higherqualification', higherqualification);
        formData.append('drivingexperience', drivingexperience);
        formData.append('dob', dob);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('placeofbirth', placeofbirth);
        formData.append('permanentaddress', permanentaddress);
        formData.append('temporaryaddress', temporaryaddress);
        formData.append('bloodgroup', bloodgroup);
        formData.append('licenceexpirydate', licenceexpirydate);
        formData.append('phoneNumber', phoneNumber);
        formData.append('whatsappNumber', whatsappNumber);
        formData.append('licencenumber', licencenumber);
        formData.append('maritalstatus', maritalstatus);
        formData.append('role', role);
        formData.append('licencephoto', licencephoto);
        formData.append('driverphoto', driverphoto);
        formData.append('licencetype', licencetype);
        formData.append('aadhaarNumber', aadhaarNumber);
        formData.append('currentsalary', currentsalary);
        formData.append('grossSalary', grossSalary);
        formData.append('dearnessallowanceAmount', dearnessallowanceAmount);
        formData.append('dearnessallowance', dearnessallowance);
        formData.append('medicalallowance', medicalallowance);
        formData.append('medicalallowanceAmount', medicalallowanceAmount);
        formData.append('hraAllowanceAmount', hraAllowanceAmount);
        formData.append('hraAllowance', hraAllowance);
        formData.append('vehicleRoute', vehicleRoute);
        formData.append('vehicleRegisterNumber',vehicleRegisterNumber);
  
        let { status, message } = await registerDriver(formData);
        if (status === true) {
          toastAlert('success', message);
          setFormValue(initialFormValue);
          navigate('/driverview');
        } else if (status === false) {
           toastAlert('error',message)
          }
      } catch (err) {
        console.log(err);
      }
    };
  
    const renderForm = () => {
      switch (currentForm) {
        case 1:
          return <DriverPersonal formValue={formValue} setFormValue={setFormValue} handleNextClick={handleNextClick} />;
        case 2:
          return <DriverContact formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleNextClick={handleNextClick} />;
        case 3:
          return <DriverHistory formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleNextClick={handleNextClick} />;
        case 4:
          return <DriverSalary formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleSubmit={handleSubmit} />;
        default:
          return null;
      }
    };
  
    return (
      <div className="teacher">
        <Sidebar />
        <div className="teacher-content">
          <Navbar pageTitle="New Driver" />
          {renderForm()}
        </div>
      </div>
    );
  };
  
  export default Driver;