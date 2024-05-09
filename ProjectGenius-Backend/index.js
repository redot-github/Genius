const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const adminRoutes =require('./routes/admin.route');
const teacherRoutes = require('./routes/teacher.route');
const parentRoutes = require('./routes/parent.route');
const EmployeRouter= require('./routes/Empsalary.route')
const leaveapplication = require('./routes/leaveform.router')
const studentrouter = require('./routes/student.route')

// config
const config = require('./config');
const app = express();
const PORT = config.PORT;
// app.use
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))
app.use('/admin', adminRoutes);
app.use('/admin', teacherRoutes);
app.use('/admin', parentRoutes);
app.use('/admin', EmployeRouter);
app.use('/admin',leaveapplication);
app.use('/admin',studentrouter)

const mongoConnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/task', { useNewUrlParser: true });
    console.log('MONGO DB CONNECTED SUCCESSFULLY!')
  } catch (error) {
    console.log(error);
  }
}

mongoConnect()

app.listen(PORT, () => {
  console.log('SERVER IS RUNNING on' + PORT)
})


