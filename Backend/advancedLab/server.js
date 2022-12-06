require("dotenv").config();
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const staffMember = require('./routers/staffMember.router.js');
const hrMember = require('./routers/hrMember.router.js');
const academicMember = require('./routers/academic members/academicMember.router');
const headOfDepartment = require('./routers/academic members/headOfDepartment.router');
const courseInstructor = require('./routers/academic members/courseInstructor.router');
const courseCoordinator = require('./routers/academic members/courseCoordinator.router');

mongoose.connect(process.env.DATABASE_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB connection failed");
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/staffMember', staffMember)
app.use('/hrMember', hrMember)
app.use('/academicMember', academicMember)
app.use('/courseInstructor', courseInstructor)
app.use('/courseCoordinator', courseCoordinator)
app.use('/headOfDepartment', headOfDepartment)

module.exports = app;