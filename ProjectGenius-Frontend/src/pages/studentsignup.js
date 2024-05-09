import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
//import Lib
import toastAlert from '../lib/toast';
//import Actions
import { teachersignup } from '../actions/teacherAction';
//import pacakages
import isEmpty from 'is-empty';
import { studentSignup } from '../actions/student.action';

const initialFormValue = {
    email: '',
    password: '',
    confirmpassword:'',
}

const StudentSignup = () => {
    // hooks
    const navigate = useNavigate();
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [inputErrors,setInputErrors] = useState({});
    //destructuring
    const { email, password, confirmpassword } = formValue;

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
                email: email,
                password: password,
                confirmpassword: confirmpassword,
            }
            let { status, message, errors } = await studentSignup(data)
            if (status === true) {
                setFormValue(initialFormValue)
                setErrors({})
                toastAlert('success',message)
                navigate('/student-login')         
            } else if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      email:errors.email,
                      password:errors.password,
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
          <img className="ellipse" src="images/Ellipse 17.svg" />
          <img className="ell" src="images/Ellipse 17.png" />
          <img className="tech" src="images/std-signup.png" />
        </div>
        <div className="rightcontent">
          <div className="sign-in">
            <form className='loginform'>
              <div className="logo">
                <img src="images/Polygon 3.svg" />
                <span>
                  <h2>Genius</h2>
                </span>
              </div>
              <h3>Student Sign Up</h3>
               <Form.Group controlId="formEmail" className="field">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="abcxyz@gmail.com"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.email) && isValid(inputErrors.email)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
               <Form.Group controlId="formEmail" className="field">
                            <Form.Label className='form-lable'>Password</Form.Label>
                            <Form.Control
                                 type='password'
                                placeholder="Enter Your Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.password) && isValid(inputErrors.password)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="field">
                            <Form.Label className='form-lable'>Confirm Password</Form.Label>
                            <Form.Control
                                 type='password'
                                placeholder="Enter Your Confirm Password"
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

export default StudentSignup;


