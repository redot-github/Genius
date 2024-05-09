import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

//import actions
import { registerTeacher } from '../actions/adminAction';

// import lib
import toastAlert from '../lib/toast';
//import components
import TeacherPersonal from './components/teacherpersonal';
import TeacherContact from './components/teachercontact';
import TeacherHistory from './components/teacherhistory';
import TeacherSalary from './components/teachersalary';

const initialFormValue = {
    'firstName': '',
    'lastName': '',
    'currentsalary': '',
    'grossSalary': '',
    'teachingexperience': '',
    'maritalstatus': '',
    'teachingcertificates': '',
    'subjects': '',
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
    'emergencycontactNumber': '',
    'phoneNumber': '',
    'vaccination': '',
    'whatsappNumber': '',
    'teachersignature': '',
    'teacherphoto': '',
    'higherqualification': '',
    'vehicleRoute': '',
    'vehicleRegistrationNumber': '',
    'dearnessallowance':'',
    'dearnessallowanceAmount':'',
    'medicalallowance':'',
    'medicalallowanceAmount':'',
    'hraAllowance':'',
    'hraAllowanceAmount':''
}

const Teacher = () => {
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
        grossSalary,
        hraAllowance,
        hraAllowanceAmount,
        dearnessallowance,
        dearnessallowanceAmount,
        medicalallowance,
        medicalallowanceAmount,
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
        vehicleRoute,
        vehicleRegisterNumber
    } = formValue;

    const navigate = useNavigate();

    const handleNextClick = () => {
        if (currentForm < 4) {
            setCurrentForm(currentForm + 1)
        }
    };

    const handlePreClick = () => {
        setCurrentForm(currentForm - 1)
    };

    const handleSubmit = async () => {

        try {
            let formData = new FormData();
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('higherqualification', higherqualification)
            formData.append('teachingexperience', teachingexperience)
            formData.append('dob', dob)
            formData.append('age', age)
            formData.append('email', email)
            formData.append('placeofbirth', placeofbirth)
            formData.append('permanentaddress', permanentaddress)
            formData.append('temporaryaddress', temporaryaddress)
            formData.append('bloodgroup', bloodgroup)
            formData.append('vaccination', vaccination)
            formData.append('phoneNumber', phoneNumber)
            formData.append('fatherphonenumber', fatherphonenumber)
            formData.append('motherphonenumber', motherphonenumber)
            formData.append('whatsappNumber', whatsappNumber)
            formData.append('emergencycontactNumber', emergencycontactNumber)
            formData.append('maritalstatus', maritalstatus)
            formData.append('teachingcertificates', teachingcertificates)
            formData.append('teachersignature', teachersignature)
            formData.append('teacherphoto', teacherphoto)
            formData.append('subjects', subjects)
            formData.append('aadhaarNumber', aadhaarNumber)
            formData.append('currentsalary', currentsalary);
            formData.append('grossSalary', grossSalary);
            formData.append('dearnessallowanceAmount', dearnessallowanceAmount);
            formData.append('dearnessallowance', dearnessallowance);
            formData.append('medicalallowance',medicalallowance );
            formData.append('medicalallowanceAmount', medicalallowanceAmount);
            formData.append('hraAllowanceAmount', hraAllowanceAmount);
            formData.append('hraAllowance', hraAllowance);
            formData.append('vehicleRoute', vehicleRoute);
            formData.append('vehicleRegisterNumber',vehicleRegisterNumber);

            let { status, message, errors } = await registerTeacher(formData)
            if (status === true) {

                toastAlert('success', message)
                setFormValue(initialFormValue)
                console.log(initialFormValue)
                navigate('/teacherview')  
            }

        } catch (err) {
           console.log(err)
        }
    }
    const renderForm = () => {
        switch (currentForm) {
            case 1:
                return <TeacherPersonal formValue={formValue} setFormValue={setFormValue} handleNextClick={handleNextClick} />;
            case 2:
                return <TeacherContact  formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleNextClick={handleNextClick} />;
            case 3:
                return <TeacherHistory formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleNextClick={handleNextClick} />;
            case 4:
                return <TeacherSalary formValue={formValue} setFormValue={setFormValue} handlePreClick={handlePreClick} handleSubmit={handleSubmit}  />;
            default:
                return null;
        }
    }
    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacher-content">
                <Navbar pageTitle="New Teacher" />
                {renderForm()}
            </div>
        </div>

    )
}
export default Teacher;