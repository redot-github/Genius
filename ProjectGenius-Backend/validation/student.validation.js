const isEmpty = require('is-empty');


const studentloginValid = (req, res, next) => {
    let errors = {};
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your Registered Teacher Id'
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const studentregisterValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your email'
    } 
    if (isEmpty(req.body.password)) {
        errors.password = 'Please Create Your Password'
    } else if (!passwordRegex.test(req.body.password)) {
        errors.password = 'Password must have One Uppercase,Lowercase,numbers and special characters, Minimum 8 to Maximum 16 characters';
    }
    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please Re-enter Your Confirmpassword'
    }
    if ((req.body.confirmpassword !== req.body.password)) {
        errors.confirmpassword = 'Password and Confirm Password are not same'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const changepasswordValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    console.log(req.body, '----req.body')
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    } 

    if (isEmpty(req.body.newpassword)) {
        errors.newpassword = 'Please enter your  new password'
    } else if (!passwordRegex.test(req.body.newpassword)) {
        errors.newpassword = 'Password should be atleast One Uppercase, Lowercase, numbers and special characters, Minimum 8 to Maxximum 16 letters alloewd only';
    }

    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please re-enter your new password'
    } else if (req.body.newpassword != req.body.confirmpassword) {
        errors.confirmpassword = 'Confirm Password Not Same';
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}
const forgetpasswordValid = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your email'
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}
const resetpasswordValid = (req, res, next) => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
 
    if (isEmpty(req.body.newpassword)) {
        errors.newpassword = 'Please enter your  new password'
    } else if (!passwordRegex.test(req.body.newpassword)) {
        errors.newpassword = 'Password should be atleast One Uppercase, Lowercase, numbers and special characters, Minimum 8 to Maxximum 16 letters alloewd only';
    }

    if (isEmpty(req.body.confirmpassword)) {
        errors.confirmpassword = 'Please re-enter your new password'
    } else if (req.body.newpassword != req.body.confirmpassword) {
        errors.confirmpassword = 'Confirm Password Not Same';
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }
    return next();
}
const findsectionValid = (req,res,next) =>{
    let errors = {};

    if (isEmpty(req.body.section)) {
      errors.section ='Please Select the Section'
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade ='Please Select the Classname'
    }
    if (isEmpty(req.body.date)) {
        errors.date ='Please Select the Date'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}
const findmarksectionValid = (req,res,next) =>{
    let errors = {};

    if (isEmpty(req.body.section)) {
      errors.section ='Please Select the Section'
    }
    if (isEmpty(req.body.admissiongrade)) {
        errors.admissiongrade ='Please Select the Classname'
    }
    if (isEmpty(req.body.exam)) {
        errors.exam ='Please Select the Exam Name'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}

module.exports = {
    studentloginValid,
    studentregisterValid,
    findsectionValid,
    findmarksectionValid,
    changepasswordValid,
    forgetpasswordValid,
    resetpasswordValid 
}