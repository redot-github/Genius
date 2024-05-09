const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    'employeeId' : String,
    'name' : String,
    'salaryMonthYear' : String,
    'salary' : String,
    'grossSalary' : String,
    'lop' : String,
    'netSalary' : String,
    active : {
        type: Number,
        default: 1
    },
})

module.exports = mongoose.model('EmployeeSalary',userSchema)