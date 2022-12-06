const academicMembers = require('../../models/academicMembers.model');
const courses = require('../../models/courses.model');
const departments = require('../../models/departments.model');
const requests = require('../../models/requests.model');
const slots = require('../../models/slots.model');

const {validateReplacementReq,
    valdiateSlotLinkingReq,
    validateDayOffReq,
    validateAnnualLeave,
    validateCompLeaveReq,
    valdiateAcciLeaveReq,
    valdiateSickLeaveReq,
    valdiateMaternityLeave,
    valdiateCancelReq
} = require('../../validations/academic members/academicMember.validation')


const viewSchedule = async (req, res) => {
    try {
        const schedule = await academicMembers.findOne({_id: req.userid});
        if (!schedule) {
            return res.status(400).json({msg: "No user sechedule found"});
        }
        res.json({Schedule: schedule.schedule});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const replacementReq = async (req, res) => {
    try {

        let {date_to_be_requested, receiver_id, slot_id} = req.body;

        const validation = validateReplacementReq.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message }); 

        //missing inputs
        if (!receiver_id || !slot_id || !date_to_be_requested) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }

        const slot = await slots.findOne({_id: slot_id})
        if (!slot) {
            return res.status(400).json({msg: "Invalid slot id"});
        }

        const receiver = await academicMembers.findOne({id: receiver_id})
        if (!receiver) {
            return res.status(400).json({msg: "Invalid receiver id"});
        }

        const requ = new requests ({type: "replacement", sender_id: req.userid, receiever_id: receiver.id, slot_id: slot_id, date_to_be_requested: date_to_be_requested});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewReplacementReq = async (req, res) => {
    try {

        const reqs = await requests.findOne({sender_id: req.userid, type: "replacement"});
        if (!reqs) {
            return res.status(400).json({msg: "No replacement requests for this user found"});
        }
        res.json(reqs);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const slotLinkingReq = async (req, res) => {
    try {

        let {dateReq, slot_id} = req.body;

        const validation = valdiateSlotLinkingReq.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!slot_id || !dateReq) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }

        const course_id = await slots.findOne({_id: slot_id}, 'course_id')
        if (!course_id) {
            return res.status(400).json({msg: "Invalid slot id"});
        }
        const course_coordinator_id = await courses.findOne({_id: course_id.course_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }

        const requ = new requests ({type: "slot linking", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, slot_id: slot_id, date_to_be_requested: dateReq});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const dayOffReq = async (req, res) => {
    try {

        let {newDayOff, reason} = req.body;

        const validation = validateDayOffReq.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!newDayOff) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "change day off", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, dayOffReq: newDayOff, reason: reason});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const annualLeaveReq = async (req, res) => {
    try {

        const {absentDate, reason} = req.body;

        const validation = validateAnnualLeave.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!absentDate) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //issued before day to be missed
        if (Date() > absentDate) {
            return res.status(400).json({msg: "You cannot issue an annual leave request for a day that passed"});
        }
        //available balance
        const balance = await academicMembers.findOne({_id: req.userid}, 'annual_leave_balance')
        if (!balance) {
            return res.status(400).json({msg: "Annual leave balance of user is null"});
        }
        if (balance < 1) {
            return res.status(400).json({msg: "Annual leave balance is less than 1 day"});
        }
        //issue request
        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "annual leave", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, date_to_be_requested: absentDate, reason: reason});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const compLeaveReq = async (req, res) => {
    try {

        let {dayAbsent, dayComp, reason} = req.body;

        const validation = validateCompLeaveReq.validate(req.body);
        if (validation.error)
        return res.status(400).json({ msg: validation.error.message });
        
        //missing inputs
        if (!reason || !dayAbsent || !dayComp) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        if (dayAbsent.getMonth() !== dayComp.getMonth()) {
            return res.status(400).json({msg: "Day missed and day compensated arenot in the same month"});
        }

        /*
        //check that he did go
        const sign_ins = await academicMembers.findOne({_id: req.userid}, 'sign_in')
        const sign_outs = await academicMembers.findOne({_id: req.userid}, 'sign_out')
        if (!sign_ins || !sign_outs) {
            return res.status(400).json({msg: "Sign ins or sign outs of user are missing"});
        }
        const check1 = sign_ins.forEach (
            async (req, res) => {
                try {
                    if (sign_ins === )
                        return true;
                }
                catch (error) {
                    res.status(500).json({error: error.message});
                }
            }
        )
        const check2 = sign_outs.forEach (
            async (req, res) => {
                try {
                    if (sign_outs === )
                        return true;
                }
                catch (error) {
                    res.status(500).json({error: error.message});
                }
            }
        )
        if (!check1 || !check2)
            return res.status(400).json({msg: "You didnot go on specified compensated day"});
        */

        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "compensation leave", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, reason: reason, date_to_be_requested: dayAbsent, dayComp: dayComp});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const acciLeaveReq = async (req, res) => {
    try {

        let {absentDate, reason} = req.body;

        const validation = valdiateAcciLeaveReq.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!absentDate) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //issued before day to be missed
        if (Date() > absentDate + 7) {
            return res.status(400).json({msg: "You cannot issue an annual leave request for a day that passed"});
        }
        //available balance
        const annbalance = await academicMembers.findOne({_id: req.userid}, 'annual_leave_balance')
        if (!annbalance) {
            return res.status(400).json({msg: "Annual leave balance of user is null"});
        }
        const accbalance = await academicMembers.findOne({_id: req.userid}, 'accidential_leave_balance')
        if (!accbalance) {
            return res.status(400).json({msg: "Accidental leave balance of user is null"});
        }
        if (annbalance < 1 || accbalance < 1) {
            return res.status(400).json({msg: "Leave balance is less than 1 day"});
        }
        //issue request
        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "accidental leave", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, reason: reason, date_to_be_requested: absentDate});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const sickLeaveReq = async (req, res) => {
    try {

        let {absentDate, reason} = req.body;

        const validation = valdiateSickLeaveReq.validate(req.body);
        if (validation.error)
            return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!absentDate) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //issued before day to be missed
        if (Date() > absentDate + 4) {
            return res.status(400).json({msg: "You cannot issue an annual leave request for a day that passed"});
        }
        //issue request
        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "sick leave", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, reason: reason, date_to_be_requested: absentDate});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const maternityLeaveReq = async (req, res) => {
    try {

        let {absentDate, reason} = req.body;

        const validation = valdiateMaternityLeave.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!absentDate) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        const department_id = await academicMembers.findOne({_id: req.userid}, 'department_id')
        if (!department_id) {
            return res.status(400).json({msg: "Department of current user is unknown"});
        }
        const course_coordinator_id = await departments.findOne({_id: department_id.department_id}, 'course_coordinator_id')
        if (!course_coordinator_id) {
            return res.status(400).json({msg: "Requested course doesnot have a course coordinator"});
        }
        const requ = new requests ({type: "sick leave", sender_id: req.userid, receiever_id: course_coordinator_id.course_coordinator_id, reason: reason,  date_to_be_requested: absentDate});
        const savedReq = await requ.save();
        res.json(savedReq);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewReqStatus = async(req, res) => {
    try {
        const submittedRequests = await requests.findOne({sender_id: req.userid}, 'status')
        if (!submittedRequests) {
            return res.status(400).json({msg: "No submitted requests"});
        }
        res.json(submittedRequests);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewAcceptedReq = async(req, res) => {
    try {
        const accRequests = await requests.findOne({sender_id: req.userid, status: "accepted"})
        if (!accRequests) {
            return res.status(400).json({msg: "No accepted requests"});
        }
        res.json(accRequests);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const viewRejectedReq = async(req, res) => {
    try { 
        const rejRequests = await requests.findOne({sender_id: req.userid, status: "rejected"})
        if (!rejRequests) {
            return res.status(400).json({msg: "No rejected requests"});
        }
        res.json(rejRequests);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const viewPendingReq = async(req, res) =>{
    try {
        const penRequests = await requests.findOne({sender_id: req.userid, status: "pending"})
        if (!penRequests) {
            return res.status(400).json({msg: "No pending requests"});
        }
        res.json(penRequests);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const cancelReq = async(req, res) => {
    try {
        let reqId = req.body;

        const validation = valdiateCancelReq.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!reqId) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        const reqStatus = await requests.findOne({_id: reqId}, 'status')
        if (!reqStatus) {
            return res.status(400).json({msg: "No request with this id"});
        }
        const reqDate = await requests.findOne({_id: reqId, sender_id: req.userid}, 'date_to_be_requested')
        if (!reqDate) {
            return res.status(400).json({msg: "This request isnot issued by this user"});
        }
        if (reqStatus != "pending" && Date()>reqDate) {
            return res.status(400).json({msg: "Cannot cancel this request as it isnot pending or date has passed"});
        }
        const reqType = await requests.findOne({_id: reqId}, 'type')
        if (!reqType) {
            return res.status(400).json({msg: "Request type missing"});
        }
        if (reqType === "compensation leave" || reqType === "accidental leave") {
            const annual_leave_balance = academicMembers.findOne({_id: req.userid}, 'annual_leave_balance')
            if (reqType === "compensation leave") {
                await academicMembers.updateOne({_id: req.userid}, {$set: {annual_leave_balance: annual_leave_balance.annual_leave_balance+1}})
            }
            if (reqType === "accidental leave") {
                const accidental_leave_balance = academicMembers.findOne({_id: req.userid}, 'accidental_leave_balance')
                await academicMembers.updateOne({_id: req.userid}, {$set: {annual_leave_balance: annual_leave_balance.annual_leave_balance+1, accidental_leave_balance: accidental_leave_balance.accidental_leave_balance+1}})
            }
        }
        await requests.remove({_id: reqId})
        res.json("Request cancelled");
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

exports.viewSchedule = viewSchedule;
exports.replacementReq = replacementReq;
exports.viewReplacementReq = viewReplacementReq;
exports.slotLinkingReq = slotLinkingReq;
exports.dayOffReq = dayOffReq;
exports.annualLeaveReq = annualLeaveReq;
exports.compLeaveReq = compLeaveReq;
exports.acciLeaveReq = acciLeaveReq;
exports.sickLeaveReq = sickLeaveReq;
exports.maternityLeaveReq = maternityLeaveReq;
exports.viewReqStatus = viewReqStatus;
exports.viewAcceptedReq = viewAcceptedReq;
exports.viewRejectedReq = viewRejectedReq;
exports.viewPendingReq = viewPendingReq;
exports.cancelReq = cancelReq