import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
// import lib
import toastAlert from '../lib/toast';
//import Actions
import { STDforgetpassword } from '../actions/student.action';
//import pacakages
import isEmpty from 'is-empty';

const initialFormValue = {
    email: '',
}

const StudentForgetpassword = () => {
    // hooks
    const navigate = useNavigate();
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState('');
    const [inputErrors,setInputErrors] = useState('');
  
    const { email } = formValue;

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
                email: email
            }
            console.log(email,'email.................');
            let { status, message, errors} = await STDforgetpassword(data)
            if (status === true) {
                setFormValue(initialFormValue)
                setErrors({})
                toastAlert('success',message)   
            } else if (status === false) {
                if (errors) {
                    setErrors(errors)
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      email:errors.email
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

  console.log(errors,'---errors')

    return(
        <div className="container1">
        <div className="leftcontent">
          <img className="ellipse" src="images/Ellipse 17.svg" />
          <img className="ell" src="images/Ellipse 17.png" />
          <img className="tech" src="images/forgetpassword.png" />
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
              <h3>Forget Paasword</h3>
              <Form.Group controlId="formEmail" className="field">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your Registered Email Id"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                isInvalid={(inputErrors && inputErrors.email) && isValid(inputErrors.email)} 
                            />
                            <Form.Control.Feedback type="invalid">{inputErrors && inputErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
              <button type="button" className="log" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>      
      
    )
}

export default StudentForgetpassword;


