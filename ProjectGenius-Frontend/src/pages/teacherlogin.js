import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
// import lib
import { setAuthRec, setAuthToken } from '../lib/localstorage';
import toastAlert from '../lib/toast';
//import Actions
import { teacherlogin } from '../actions/teacherAction';
//import config
import { setAuthorization } from '../config/axios'
//import pacakages
import isEmpty from 'is-empty';

const initialFormValue = {
    teacherId: '',
    password: '',
}

const TeacherLogin = () => {
    // hooks
    const navigate = useNavigate();
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [inputErrors,setInputErrors] = useState({});
  
    const { teacherId, password } = formValue;
    console.log(formValue,'id..,pass..');

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
                teacherId: teacherId,
                password: password
            }
            let { status, message, errors, token, result} = await teacherlogin(data)
            if (status === true) {
                setFormValue(initialFormValue)
                setErrors({})
                setAuthToken(`Bearer ${token}`);
                setAuthorization(`Bearer ${token}`);
                toastAlert('success',message)
                setAuthRec(result)     
                navigate('/teacher-attendance')
            } else if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      teacherId:errors.teacherId,
                      password:errors.password
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
          <img className="tech" src="images/teacher-login.png" />
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
              <h3>Teacher Sign In</h3>
               <Form.Group controlId="formEmail" className="field">
                            <Form.Label>TeacherId</Form.Label>
                            <Form.Control
                                type="teacherId"
                                placeholder="Enter Your TeacherId"
                                name="teacherId"
                                value={teacherId}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.teacherId) && isValid(inputErrors.teacherId)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.teacherId}
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
              <button type="button" className="log" onClick={handleSubmit}>Login</button>
            </form>
          </div>
        <p>Don't Have an Account..!<Link to={'/teacher-signup'} >SignUp Here</Link></p>
        <p>Forget Password..!<Link to={'/teacher-forgetpassword'} >Click Here</Link></p>
        </div>
      </div>      
      
    )
}

export default TeacherLogin;


