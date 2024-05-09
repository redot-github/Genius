const express = require('express')
const router = express.Router()
const studentValid = require('../validation/student.validation')
const studentCtrl = require('../controller/student.controller')

router.route('/STDforgetpassword').post(studentValid.forgetpasswordValid,studentCtrl.forgetpassword);
router.route('/STDresetpassword').post(studentValid.resetpasswordValid,studentCtrl.resetpassword);
router.route('/STDchangepassword').post(studentValid.changepasswordValid, studentCtrl.changePassword);
router.route('/student-login').post(studentValid.studentloginValid,studentCtrl.studentLogin)
router.route('/student-signup').post(studentValid.studentregisterValid,studentCtrl.studentSignup)

module.exports = router;