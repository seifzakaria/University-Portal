const express = require('express')
const router = express.Router();

const auth = require('../../auth/verifyToken')

const {
    assignInst, 
    reassignInst, 
    unassignInst, 
    viewStaffAll, 
    viewStaffCourse,
    viewDayOffAll, 
    viewDayOffX,
    viewRequests, 
    acceptRequest, 
    rejectRequest, 
    viewCoverage,
    viewAssignments
    } = require('../../controllers/academic members/headOfDepartment.controller');

// router.post('/assignInst',  assignInst);
// router.post('/reassignInst',   reassignInst);
// router.post('/unassignInst',   unassignInst);
// router.get('/viewStaffAll',   viewStaffAll);
// router.get('/viewStaffCourse',   viewStaffCourse);
// router.get('/viewDayOffAll',   viewDayOffAll);
// router.get('/viewDayOffX',   viewDayOffX);
// router.get('/viewRequests',   viewRequests);
// router.post('/acceptRequest',   acceptRequest);
// router.post('/rejectRequest',   rejectRequest);
// router.get('/viewCoverage',   viewCoverage);
// router.get('/viewAssignments',   viewAssignments);

router.post('/assignInst', auth, assignInst);
router.post('/reassignInst', auth, reassignInst);
router.post('/unassignInst', auth, unassignInst);
router.get('/viewStaffAll', auth, viewStaffAll);
router.get('/viewStaffCourse', auth, viewStaffCourse);
router.get('/viewDayOffAll', auth, viewDayOffAll);
router.get('/viewDayOffX', auth, viewDayOffX);
router.get('/viewRequests', auth, viewRequests);
router.post('/acceptRequest', auth, acceptRequest);
router.post('/rejectRequest', auth, rejectRequest);
router.get('/viewCoverage', auth, viewCoverage);
router.get('/viewAssignments', auth, viewAssignments);

module.exports = router;