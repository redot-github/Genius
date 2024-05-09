const mongoose = require('mongoose');
const { Schema } = mongoose;


const driveradmissionSchema = new Schema ({
    'driverId':String,
    'name' : String,
    'dob' :String,
    'age':Number,
    'email':String,
    'maritalstatus':String,
    'drivingexperience':String,
    'currentsalary':String,
    'driverphoto':String,
    'placeofbirth':String,
    'phoneNumber':Number,
    'whatsappNumber':Number,
    'aadhaarNumber':String,
    'permanentaddress':String,
    'temporaryaddress':String,
    'bloodgroup':String,
    'higherqualification':String,
    'role':String,
    'licenceexpirydate':String,
    'licencetype':String,
    'licencenumber':String,
    'licencephoto':String,
    'grossSalary': String,
    'dearnessallowance':String,
    'dearnessallowanceAmount':String,
    'medicalallowance':String,
    'medicalallowanceAmount':String,
    'hraAllowance':String,
    'hraAllowanceAmount':String,
    'vehicleRegisterNumber':String,
    'vehicleRoute':String,
    'active':{
        type: Number,
        default: 1
    },
})

let driveradmissionModel = mongoose.model('driveradmission', driveradmissionSchema, 'driveradmission' )


module.exports = driveradmissionModel;