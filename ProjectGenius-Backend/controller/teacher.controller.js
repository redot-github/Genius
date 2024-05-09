const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// lib
const sendMail = require('../lib/emailGateway');
//Models
const Teacher = require('../models/teachersignup');
const Attendance = require('../models/attendance');
const GroupSection = require('../models/groupsection');
const TeacherAdmission = require('../models/teacheradmission');
const MarkSheet = require('../models/marksheet');
//config
const config = require('../config/index');
//control functions
const createteacher = async (req, res) => {
    let checkEmail = await TeacherAdmission.findOne({ 'teacherId': req.body.teacherId },{email:1,phone:1}).lean()
    let checkTeacherId = await Teacher.findOne({ 'teacherId': req.body.teacherId }).lean()
    if (!isEmpty(checkTeacherId)) {
        return res.status(400).json({ 'status': false, 'errors': { 'teacherId': 'Same TeacherId Id Already Exist' } })
    }
    //passwordhashing
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let Email = checkEmail.email
    let newUser = new Teacher({
        'teacherId': req.body.teacherId,
        'password': hash,
        'email':Email
    })
    await newUser.save();
    return res.status(200).json({ 'status': true, 'message': 'Registered successfully' })

}
const teacherLogin = async (req, res) => {
    try {
        const admin = await Teacher.findOne({ 'teacherId': req.body.teacherId }).lean();
        const teacher = await TeacherAdmission.findOne({ 'teacherId': req.body.teacherId }, { name: 1, teacherphoto: 1, teacherId: 1 }).lean();
        teacher.teacherphoto = `${config.IMAGE.TEACHER_FILE_URL_PATH}/${teacher.teacherphoto}`;
        if (!admin) {
            return res.status(400).json({ 'status': false, 'errors': { 'teacherId': 'Invalid User Id' } });
        }
        const comparePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!comparePassword) {
            return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
        }
        let payload = { _id: admin._id }
        let token = jwtSign(payload)
        return res.status(200).json({ 'status': true, 'message': 'Login Successfully', token, 'result': teacher });
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

    let checkUser = await Teacher.findOne({ '_id': req.user._id }).lean();
    if (!checkUser) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid User' });
    }
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);
    if (!comparePassword) {
        return res.status(400).json({ 'status': false, 'errors': { 'password': 'Your Old Password is Wrong.' } });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const changepassword = await Teacher.findOneAndUpdate({ _id: req.user._id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" })
}
const forgetpassword = async (req, res) => {
    let find = await Teacher.findOne({ 'email': req.body.email }).lean();
    if (isEmpty(find)) {
        return res.status(400).json({ 'status': false, 'message': 'Invalid EmailId' })
    }
    sendMail({
        to: req.body.email,
        content: `<a target="_self" href="http://localhost:3000/teacher-resetpassword/${find._id}"><span>To Reset your Password</span> >>> Click here</a>`
    })
    return res.status(200).json({ 'status': true, 'message': `Please Check the Message Received in : ${find.email}` })
}
const resetpassword = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const resetpassword = await Teacher.findOneAndUpdate({ _id: req.body._id }, { $set: { 'password': hash } });
    return res.status(200).json({ 'status': true, 'message': "Password changed successfully" })
}
const findSection = async (req, res) => {
    try {
        const { section, admissiongrade, date } = req.body;
        let checksection = await GroupSection.findOne({ section, admissiongrade }).lean()
        if (isEmpty(checksection)) {
            return res.status(400).json({ 'status': false, 'errors': { 'section': 'Selected Section Not Exist' } })
        }
        const result = await GroupSection.find({ section, admissiongrade }, { students: 1 }).lean();
        const attendanceData = await Attendance.findOne({ admissiongrade, section, date }, { attendance: 1 }).lean()
        return res.status(200).json({ 'status': true, 'result': result, 'result2': attendanceData });
    } catch (err) {
        console.log(err, '--err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const dailyattendance = async (req, res) => {
    try {
        const attendanceData = new Attendance({
            'admissiongrade': req.body.admissiongrade,
            'section': req.body.section,
            'date': req.body.date,
            'attendance': req.body.attendance
        })
        await attendanceData.save()
        return res.status(200).json({ 'status': true, 'message': `Attendence for ${req.body.date} submitted successfully` })
    } catch (err) {
        console.log(err, '---err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}

const dailyAttendanceUpdate = async (req, res) => {
    const id = req.params.id;
    const studentIdToUpdate = req.body.studentId; // Assuming you're sending the studentId in the request body
    const newStatus = req.body.status; // Assuming you're sending the new status in the request body
    const attendanceDate = req.body.date
    console.log(attendanceDate,'date....');

    try {
        if (!id || !studentIdToUpdate || !newStatus) {
            return res.status(400).json({ status: false, message: 'Missing required parameters' });
        }

        let updateAttendance = await Attendance.findOneAndUpdate(   
            { _id:id, admissiongrade: req.body.admissiongrade, section: req.body.section, date: attendanceDate, 'attendance.studentId': studentIdToUpdate },
            { $set: { 'attendance.$.status': newStatus } },
            { new: true }
        );
            console.log(updateAttendance,'updated Status...');
        if (updateAttendance) {
            return res.status(200).json({ status: true, message: 'Attendance updated successfully', result: updateAttendance });
        }
        return res.status(404).json({ status: false, message: "Attendance not updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const displayAttendance = async(req,res)=>{
    let dis
    try {
        dis = await Attendance.find()

    } catch (err) {
        console.log(err);
    }
    if(dis){
        return res.status(200).json({status:true, message:"Attendance viewed successfully",result:dis})
    }
     return res.status(404).json({status:false,message:'Attendance not found'})
}


const createmarksheet = async (req, res) => {
    try {
        const marksheetData = new MarkSheet({
            'admissiongrade': req.body.admissiongrade,
            'section': req.body.section,
            'exam': req.body.exam,
            'marks': req.body.marks
        })
        await marksheetData.save()
        return res.status(200).json({ 'status': true, 'message': `Marks for ${req.body.exam} submitted successfully` })
    } catch (err) {
        console.log(err, '---err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const updatemarksheet = async (req, res) => {
    try {
        const { admissiongrade, section, exam, marks } = req.body;
            const updatemarksheetData = await MarkSheet.findOneAndUpdate({ admissiongrade, section, exam }, { $set: { marks: marks } })
            return res.status(200).json({ 'status': true, 'message': `Marks Updated Successfully` })
    } catch (err) {
        console.log(err, '---err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const findmarksheet = async (req, res) => {
    try {
        const { admissiongrade, section, exam } = req.body;
        const MarksheetData = await MarkSheet.findOne({ admissiongrade, section, exam }).lean();
        if (isEmpty(MarksheetData)) {
            return res.status(400).json({ 'status': false, 'errors': { 'exam': 'Selected Exam Result Not Generated Yet' } })
        }
        return res.status(200).json({ 'status': true, 'result': MarksheetData })
    } catch (err) {
        console.log(err, '---err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const findmarksheetforanalysis = async (req, res) => {
    try {
        const { admissiongrade, section } = req.query;
        const MarksheetData = await MarkSheet.find({ admissiongrade, section }).lean();
        return res.status(200).json({ 'status': true, 'result': MarksheetData })
    } catch (err) {
        console.log(err, '---err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
const findSectionforMarks = async (req, res) => {
    try {
        const { section, admissiongrade, exam } = req.body;
        let checksection = await GroupSection.findOne({ section, admissiongrade }).lean()
        // console.log(checksection,'----sec')
        if (isEmpty(checksection)) {
            return res.status(400).json({ 'status': false, 'errors': { 'section': 'Selected Section Not Exist' } })
        }
        const SectionData = await GroupSection.findOne({ section, admissiongrade }, { students: 1 }).lean();
        const MarksheetData = await MarkSheet.findOne({ admissiongrade, section, exam }, { marks: 1 }).lean()
        return res.status(200).json({ 'status': true, 'result': SectionData, 'result2': MarksheetData });
    } catch (err) {
        console.log(err, '--err')
        return res.status(500).json({ 'status': false, 'message': 'Error on the Server' });
    }
}
module.exports = {
    createteacher,
    teacherLogin,
    jwtSign,
    jwtVerify,
    changePassword,
    findSection,
    dailyattendance,
    createmarksheet,
    findmarksheet,
    findSectionforMarks,
    findmarksheetforanalysis,
    updatemarksheet,
    forgetpassword,
    resetpassword,
    dailyAttendanceUpdate,
    displayAttendance
}