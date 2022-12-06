const express = require('express')
const router = express.Router();

const {AddSlot, UpdateSlot, ViewRequests, DeleteSlot, AcceptRequest, RejectRequest} = require('../../controllers/academic members/courseCoordinator.controller');
const verify = require('../../auth/verifyToken')

router.post('/AddSlot', verify, AddSlot);
router.post('/UpdateSlot', verify, UpdateSlot);
router.post('/AcceptRequest', verify, AcceptRequest)
router.post('/RejectRequest', verify, RejectRequest)
router.get('/ViewRequests', verify, ViewRequests);
router.delete('/DeleteSlot', verify, DeleteSlot);
module.exports = router;