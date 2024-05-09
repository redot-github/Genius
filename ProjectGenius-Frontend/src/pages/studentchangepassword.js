import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
//import Lib
import toastAlert from '../lib/toast';
import { removeAuthToken } from '../lib/localstorage';
//import Actions
import { changepassword } from '../actions/teacherAction';
//import pacakages
import isEmpty from 'is-empty';
import { STDchangepassword } from '../actions/student.action';

const initialFormValue = {
    password: '',
    newpassword:'',
    confirmpassword:'',
}

const StudentChangepassword = () => {
    // hooks
    const navigate = useNavigate();
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [inputErrors,setInputErrors] = useState({});
    //destructuring
    const { password, newpassword, confirmpassword } = formValue;

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
                password: password,
                newpassword: newpassword,
                confirmpassword: confirmpassword,
            }
            let { status, message, errors } = await STDchangepassword(data)
            if (status === true) {
                setFormValue(initialFormValue)
                setErrors({})
                toastAlert('success',message)
                removeAuthToken()
                navigate('/student-login')         
            } else if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      newpassword:errors.newpassword,
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
          <img className="tech" src="images/changepassword.png" />
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
              <h3>Change Password</h3>
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

export default StudentChangepassword;


