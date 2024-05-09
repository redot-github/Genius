const mongoose = require('mongoose');
const { Schema } = mongoose;


const teacheradmissionSchema = new Schema ({
    'teacherId':String,
    'name' : String,
    'dob' :String,
    'age':Number,
    'email':String,
    'maritalstatus':String,
    'teachingexperience':String,
    'currentsalary':String,
    'grossSalary':String,
    'hraAllowance':String,
    'hraAllowanceAmount':String,
    'dearnessallowance':String,
    'dearnessallowanceAmount':String,
    'medicalallowance':String,
    'medicalallowanceAmount':String, 
    'teacherphoto':String,
    'placeofbirth':String,
    'phoneNumber':Number,
    'whatsappNumber':Number,
    'aadhaarNumber':String,
    'permanentaddress':String,
    'temporaryaddress':String,
    'bloodgroup':String,
    'higherqualification':String,
    'subjects':String,
    'teachingcertificates':String,
    'emergencycontactNumber':Number,
    'vaccination':String,
    'teachersignature':String,
    'fatherphonenumber':Number,
    'motherphonenumber': Number,
    'vehicleRegisterNumber':String,
    'vehicleRoute':String,
    'active':{
        type: Number,
        default: 1
    },
});


let teacheradmissionModel = mongoose.model('teacheradmission', teacheradmissionSchema, 'teacheradmission' )


module.exports = teacheradmissionModel;