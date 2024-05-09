const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveDateSchema = new Schema({
    date: String,
    approval: String,
    leaveType : String,
    // month : String,
    // fromDate : String,
});

const leaveSchema = new Schema({
    currentDate: String,
    employeeId: String,
    name: String,
    fromDate: String,
    toDate: String,
    numofDays: String,
    reason: String,
    approval: String,
    leaveType: String,
    reasonDecline: String,
    active: {
        type: Number,
        default: 1
    },
    leaveDates: [leaveDateSchema] 
});

module.exports = mongoose.model('LeaveForm', leaveSchema);
