const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveAllocationSchema = new Schema({
    employeeId: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    medicalLeave: {
        type: Number,
        default: 0
    },
    casualLeave: {
        type: Number,
        default: 0
    },
    // 'maternityLeave': {
    //     type: String,
    //     default: 0
    // },
    paternityLeave: {
        type: Number,
        default: 0
    },
    annualLeave: {
        type: Number,
        default: 0
    },
    unpaidLeave: {
        type: Number,
        default: 0
    },
    active: {
        type: Number,
        default: 1
    },
});

module.exports = mongoose.model('LeaveAllocation', leaveAllocationSchema);
