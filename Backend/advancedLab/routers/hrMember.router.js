const { Router } = require('express');
const express = require('express')
const router = express.Router();

const auth = require('.././auth/verifyToken')
const {view_misssinghours,view_missingdays,update_user,update_salary,delete_user,Add_loc,delete_loc,Add_faculty,Delete_faculty,update_faculty,update_loc,Add_Department,Delete_Department,update_department,Add_course,update_course,Delete_course, addUser,view_AttendenceRecord,  addSignIn,
    addSignOut, } = require('../controllers/hrMember.controller');

router.post('/AddLocation', auth, Add_loc);
router.delete('/DeleteLocation', auth, delete_loc);
router.post('/addfaculty', auth, Add_faculty);
router.delete('/DeleteFaculty', auth, Delete_faculty);
router.post('/updatefaculty', auth, update_faculty);
router.post('/updatelocation', auth, update_loc);
router.post('/Faculty/AddDepartment', auth, Add_Department);
router.delete ('/Faculty/DeleteDepartment', auth, Delete_Department);
router.post('/Faculty/UpdateDepartment', auth, update_department);
router.post('/Faculty/Department/AddCourse', auth, Add_course);
router.post('/Faculty/Department/UpdateCourse', auth, update_course);
router.delete('/Faculty/Department/DeleteCourse', auth, Delete_course);
router.post('/addUser',  auth, addUser);
router.delete('/DeleteUser', auth, delete_user);
router.post('/ViewAttendenceRecord', auth, view_AttendenceRecord);
router.post('/User/UpdateSalary', auth, update_salary);
router.post('/User/UpdateUser', auth, update_user);
router.post('/view_missingdays', auth, view_missingdays);
router.post('/view_missinghours', auth, view_misssinghours);
router.post("/addSignin",  auth, addSignIn);
router.post("/addSignout",  auth, addSignOut);

module.exports = router;