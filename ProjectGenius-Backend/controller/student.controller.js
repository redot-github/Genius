const studentadmission = require('../models/admission')
const studentsignup = require('../models/studentsignup')
const bcrypt = require('bcrypt');
// const studentsignup = require('../models/studentsignup');
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const isEmpty = require('is-empty');
const sendMail = require('../lib/emailGateway');



const studentSignup = async (req, res) => {
    try {
        let checkEmail = await studentadmission.findOne({ 'email': req.body.email }, { email: 1 }).lean();
        let checkstudentId = await studentsignup.findOne({ 'email': req.body.email },{ 'password': req.body.password }).lean();
        if (checkstudentId) {
            return res.status(400).json({ 'status': false, 'message': 'Same studentId Already Exist'  });
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        let email = checkEmail.email
        let newUser = new studentsignup({
            'password' : hash ,
            'email':email 
        });
        await newUser.save();
        return res.status(200).json({ 'status': true, 'message': 'Registered successfully' , newUser});
    } catch (error) {
        console.error("Error occurred during student signup:", error);
        return res.status(400).json({ 'status': false, 'message': 'Same studentId Already Exist'  });
    }
};




const studentLogin = async (req, res) => {
    try {
        const admin = await studentsignup.findOne({ 'email': req.body.email }).lean();
        const studentData = await studentadmission.findOne({ 'email': req.body.email }, { name: 1, email: 1 ,photo:1,studentId : 1}).lean();
        studentData.photo = `${config.IMAGE.USER_FILE_URL_PATH}/${studentData.photo}`;
        if (!admin) {
            return res.status(400).json({ 'status': false, 'errors': { 'email': 'Invalid User Id' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { email: admin.email, password: admin.password }
        let token = jwtSign(payload);
        return res.status(200).json({ 'status': true, 'message': 'Login Successfully', token, 'result': studentData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'status': false, 'message': 'Error on the server' });
    }
};

const jwtSign = (payload) => {
    let token = jwt.sign(payload, config.SECRET_KEY);
    return token;
}
const jwtVerify = (token) => {
    try {
        token = token.replace('Bearer ', '');
        let decoded = jwt.verify(token, config.SECRET_KEY);
        if (decoded) {
            return {
                'status': true,
                decoded
            }
        }
    } catch (err) {
        return {
            'status': false
        }
    }
}


const changePassword = async (req, res) => {

    let checkUser = await studentsignup.findOne({ 'id': req.body.id }).lean();
    if (!checkUser) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid User' });
    }
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);
    if (!comparePassword) {
        return res.status(400).json({ 'status': false, 'errors': { 'password': 'Your Old Password is Wrong.' } });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const changepassword = await studentsignup.findOneAndUpdate({ id: req.body.id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" })
}


const forgetpassword = async (req, res) => {
    let find = await studentsignup.findOne({ 'email': req.body.email }).lean();
    if(isEmpty(find)) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid EmailId' })
    }
    sendMail({
        to: req.body.email,
        content: `<a target="_self" href="http://localhost:3000/student-resetpassword/${find.id}"><span>To Reset your Password</span> >>> Click here</a>`
    })
    return res.status(200).json({ 'status': true, 'message': `Please Check the Message Received in : ${find.email}` })
}



const resetpassword = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const resetpassword = await studentsignup.findOneAndUpdate({ _id: req.body._id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" })
}

module.exports = {
    studentSignup,
    studentLogin,
    changePassword,
    forgetpassword,
    resetpassword,
}