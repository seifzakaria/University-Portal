const express = require('express')
const router = express.Router();

const {viewCourseCoverage,
       viewSlotsAssignment, 
       viewAllStaff,
       assignInstructorToSlot,
       updateAnAssignment,
       removeAnAssignedMember,
       academicMemberToCourseCoordinator
      } = require('../../controllers/academic members/courseInstructor.controller');

const verifyToken = require("../../auth/verifyToken");

router.post('/viewCourseCoverage',  verifyToken,
viewCourseCoverage);

router.post('/viewSlotsAssignment', verifyToken,
 viewSlotsAssignment);

router.post('/viewAllStaff', verifyToken,
viewAllStaff);

router.post('/assignInstructorToSlot', verifyToken,
 assignInstructorToSlot);

router.post('/updateAnAssignment', verifyToken,
  updateAnAssignment);

router.delete('/removeAnAssignedMember', verifyToken,
removeAnAssignedMember);

router.post('/academicMemberToCourseCoordinator', verifyToken,
academicMemberToCourseCoordinator);

module.exports = router;