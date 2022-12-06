const express = require('express')
const router = express.Router();

const auth = require('../../auth/verifyToken')

const {
    viewSchedule, 
    replacementReq, 
    viewReplacementReq, 
    slotLinkingReq, 
    dayOffReq, 
    annualLeaveReq,
    compLeaveReq,
    acciLeaveReq,
    sickLeaveReq,
    maternityLeaveReq,
    viewReqStatus,
    viewAcceptedReq,
    viewRejectedReq,
    viewPendingReq,
    cancelReq
    } = require('../../controllers/academic members/academicMember.controller');

router.get('/viewSchedule', auth, viewSchedule);
router.post('/replacementReq', auth, replacementReq);
router.get('/viewReplacementReq', auth, viewReplacementReq);
router.post('/slotLinkingReq', auth, slotLinkingReq);
router.post('/dayOffReq', auth, dayOffReq);
router.post('/annualLeaveReq', auth, annualLeaveReq);
router.post('/compLeaveReq', auth, compLeaveReq);
router.post('/acciLeaveReq', auth, acciLeaveReq);
router.post('/sickLeaveReq', auth, sickLeaveReq);
router.post('/maternityLeaveReq', auth, maternityLeaveReq);
router.get('/viewReqStatus', auth, viewReqStatus);
router.get('/viewAcceptedReq', auth, viewAcceptedReq);
router.get('/viewRejectedReq', auth, viewRejectedReq);
router.get('/viewPendingReq', auth, viewPendingReq);
router.delete('/cancelReq', auth, cancelReq);

module.exports = router;