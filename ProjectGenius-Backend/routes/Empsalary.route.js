const employeId = require('../controller/employesalary.controller')
const express = require('express')
const router = express.Router();

router.post('/Employee-Salary',employeId.EmployeSalary)
router.get('/Employee-Display',employeId.EmployesalaryView)
router.put('/Employee-SalaryUpdate/:id',employeId.SalaryUpdate)
router.get('/Employee-SalaryDelete/:id',employeId.SalaryDelete)
module.exports=router;