const express = require('express')
const isEmpty = require('is-empty')
const router = express.Router()
//config
const passportAuth = require('../config/passport')
//validation
const teacherValid = require('../validation/teacher.validation')
//controller
const teacherCtrl = require('../controller/teacher.controller')
//routes
//teacher-loginviewstudent
router.route('/teacher-register').post(teacherValid.teacherregisterValid,teacherCtrl.createteacher);
router.route('/teacher-login').post(teacherValid.teacherloginValid,teacherCtrl.teacherLogin);
router.route('/forgetpassword').post(teacherValid.forgetpasswordValid,teacherCtrl.forgetpassword);
router.route('/resetpassword').post(teacherValid.resetpasswordValid,teacherCtrl.resetpassword);
router.route('/changepassword').post(passportAuth, teacherValid.changepasswordValid, teacherCtrl.changePassword);
router.route('/findsection').post(teacherValid.findsectionValid,teacherCtrl.findSection);
router.route('/daily-attendance').post(teacherCtrl.dailyattendance);
router.route('/displayAttendance').get(teacherCtrl.displayAttendance);
router.route('/marksheet').post(teacherCtrl.createmarksheet);
router.route('/marksheet-update').post(teacherCtrl.updatemarksheet);
router.route('/find-marksheet').post(teacherValid.findmarksectionValid,teacherCtrl.findmarksheet);
router.route('/marksheetforanalysis').get(teacherCtrl.findmarksheetforanalysis);
router.route('/findsectionformarks').post(teacherValid.findmarksectionValid,teacherCtrl.findSectionforMarks);
router.route('/update-attendance/:id/:studentId').put(teacherCtrl.dailyAttendanceUpdate);



module.exports = router;