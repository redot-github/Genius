const mongoose = require('mongoose');
const schema = mongoose.Schema;


const busAllocateModel = new schema({
    'driverId':String,
    'driverName':String,
    'attender':String,
    'vehicleRoute': String,
    'vehicleRegisterNumber': String,
    'active':{
        type:Number,
        default:1
    }
})

// module.exports = mongoose.model('busallocate',busAllocateModel)

let busAllocate = mongoose.model('busallocate', busAllocateModel, 'busallocate' )


module.exports = busAllocate;