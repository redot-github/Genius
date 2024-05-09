const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
    year: Number,
    months: [{
        month: {
            type: String,
            required: true
        },
        EmployeePaySlip: [{
            name: String,
            category: String,
            employeeId: String,
            currentSalary: String,
            grossSalary : String,
            month : String,
            year : String,
            totaldaysformonth: String,
            totalworkingdays: String,
            numofDays: String,
            Netsalary: String
        }]
    }]
});

module.exports = mongoose.model('Payroll', payrollSchema);
