import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
//import Lib
import toastAlert from '../lib/toast';
//import Actions
import { STDresetpassword } from '../actions/student.action';
//import pacakages
import isEmpty from 'is-empty';

const initialFormValue = {
    newpassword:'',
    confirmpassword:'',
}

const StudentResetpassword = () => {
    // hooks
    const navigate = useNavigate();
    const {Id} = useParams()
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [inputErrors,setInputErrors] = useState({});
    //destructuring
    const {  newpassword, confirmpassword } = formValue;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null, // Clear the error for this input
      }));
        setFormValue({ ...formValue, ...{ [name]: value } })
    }
    const handleSubmit = async () => {
        try {
            let data = {
                _id:Id,
                newpassword: newpassword,
                confirmpassword: confirmpassword,
            }
            let { status, message, errors } = await STDresetpassword(data)
            if (status === true) {
                setFormValue(initialFormValue)
                setErrors({})
                toastAlert('success',message)
                navigate('/teacher-login')        
            } else if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      newpassword:errors.newpassword,
                      confirmpassword:errors.confirmpassword,
                    }))
                } else if (message) {
                    toastAlert('error', message)
                }
            }
        } catch (err) {
            console.log(err, '...err')
        }
    }
    const isValid = (errName) => {
      return !isEmpty(errName);
  }
    return(
        <div className="container1">
        <div className="leftcontent">
          <img className="ellipse" src={`${process.env.PUBLIC_URL}/images/Ellipse 17.svg`} alt=''/>
          <img className="ell" src={`${process.env.PUBLIC_URL}/images/Ellipse 17.png`}  alt=''/>
          <img className="tech" src={`${process.env.PUBLIC_URL}/images/checkemail.png`} alt=''/>
        </div>
        <div className="rightcontent">
          <div className="sign-in">
            <form className='loginform'>
              <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/images/Polygon 3.svg`} alt=''/>
                <span>
                  <h2>Genius</h2>
                </span>
              </div>
              <h3>Reset Password</h3>
                        <Form.Group controlId="formEmail" className="field">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Your New Password"
                                name="newpassword"
                                value={newpassword}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.newpassword) && isValid(inputErrors.newpassword)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.newpassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="field">
                            <Form.Label className='form-lable'>Confirm Password</Form.Label>
                            <Form.Control
                                 type='password'
                                placeholder="Re-Enter Your New Password"
                                name="confirmpassword"
                                value={confirmpassword}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.confirmpassword) && isValid(inputErrors.confirmpassword)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.confirmpassword}
                            </Form.Control.Feedback>
                        </Form.Group>
              <button type="button" className="log" onClick={handleSubmit}>Save</button>
            </form>
          </div>
        </div>
      </div>      
      
    )
}

export default StudentResetpassword;


