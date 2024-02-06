const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const router = require('./view/router');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use('/Vehicle', router); // http://localhost:4500/VRegisteration

mongoose.connect('mongodb://localhost:27017/Vehicle')
  .then(() => {
    console.log('DB Connected');
    app.listen(4500);
  });
