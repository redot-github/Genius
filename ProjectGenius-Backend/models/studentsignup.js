const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentsignupSchema  = new Schema ({
    'studentId':String,
    'email' : String,
    'password' : String,

})

let studentsignupModel = mongoose.model('studentsignup', studentsignupSchema , 'studentsignup' )


module.exports = studentsignupModel;