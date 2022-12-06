const { request } = require('express');
const academicMembers = require('../../models/academicMembers.model');
const courses = require('../../models/courses.model')
const requests = require('../../models/requests.model')

const { validateAssignInst,
    validateReassignInst,
    validateUnassignInst,
    validateViewStaffCourse,
    validateViewDayOffX,
    valdiateAcceptRequest,
    validateRejectRequest,
    validateViewCoverage} =
 require('../../validations/academic members/headOfDepartment.validation')

const assignInst = async (req, res) => {
    try { 

        let {id, course_name} = req.body;

        const validation = validateAssignInst.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!id || !course_name) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //courseInst exists
        const courseInstructor = await academicMembers.findOne({id: id});
        if (!courseInstructor) {
            return res.status(400).json({msg: "Id not found"});
        }
         //course names found
        const course = await courses.findOne({name: course_name});
        if (!course) {
            return res.status(400).json({msg: "Course name incorrect"});
        }
        //check that course is that of current user
        if (course.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "You arenot the coordinator of this course"});
        }
        //check if instructor already exists
        function funct(item) {
            try {
                if (item.id === id) {
                    flagFound = true;
                    return res.status(400).json({msg: "Instructor already added to course"});
                }
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        let flagFound =  false;
        course.instructors.forEach(funct);
        //assignInst
        if (!flagFound) {
            await courses.updateOne({name: course_name}, {$push: {instructors: courseInstructor}});
            const updatedCourse = await courses.findOne({name: course_name});
            res.json(updatedCourse);
        }
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const reassignInst = async (req, res) => {
    try { 

        let {id, course_name_remove, course_name_add} = req.body;

        const validation = validateReassignInst.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missung inputs
        if (!id || !course_name_remove || !course_name_add) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //courseInst exists
        const courseInstructor = await academicMembers.findOne({id: id});
        if (!courseInstructor) {
            return res.status(400).json({msg: "Id not found"});
        }
        //course names found
        const courseRemove = await courses.findOne({name: course_name_remove});
        if (!courseRemove) {
            return res.status(400).json({msg: "Course name remove not found"});
        }
        const courseAdd = await courses.findOne({name: course_name_add});
        if (!courseAdd) {
            return res.status(400).json({msg: "Course name add not found"});
        }
        //check that course is that of current user
        if (courseRemove.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "User is not the coordinator of the course to be removed from"});
        }
        if (courseAdd.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "User is not the coordinator of the course to be added to"});
        }
        //check if exists in course to be added to
        function funct(item) {
            try {
                if (item.id === id) {
                    flagInRem = true;
                }
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        function funct1(item) {
            try {
                if (item.id === id) {
                    flagInAdd = true;
                    return res.status(400).json({msg: "Instructor already added to course"});
                }
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        let flagInRem =  false;
        let flagInAdd =  false;
        courseRemove.instructors.forEach(funct);
        courseAdd.instructors.forEach(funct1);
        if (!flagInRem) {
            return res.status(400).json({msg: "Instructor not in course to be removed from"});
        }
        //unassignInst
        let updatedCourse1;
        if (flagInRem) {
            await courses.updateOne({name: course_name_remove}, {$pull: {instructors: courseInstructor}});
            updatedCourse1 = await courses.findOne({name: course_name_remove})
        }
        //assignInst
        let updatedCourse2;
        if (!flagInAdd) {    
            await courses.updateOne({name: course_name_add}, {$push: {instructors: courseInstructor}});    
            updatedCourse2 = await courses.findOne({name: course_name_add})
        }
        res.json({course_remove: updatedCourse1, course_add: updatedCourse2});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const unassignInst = async (req, res) => {
    try {
        let {id, course_name} = req.body;

        const validation = validateUnassignInst.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!id || !course_name) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //courseInst exists
        const courseInstructor = await academicMembers.findOne({id: id});
        if (!courseInstructor) {
            return res.status(400).json({msg: "ID not found"});
        }
        //course names found
        const course = await courses.findOne({name: course_name});
        if (!course) {
            return res.status(400).json({msg: "Course name not found"});
        }
        //check that course is that of current user
        if (course.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "User is not the coordinator of this course"});
        }
        //unassignInst
        await courses.updateOne({name: course_name}, {$pull: {instructors: courseInstructor}});
        const updatedCourse = await courses.findOne({name: course_name});
        res.json(updatedCourse);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewStaffAll = async (req, res) => {
    try {
        const staff = await courses.find({course_coordinator_id: req.userid}, 'instructors');
        if (!staff) {
            return res.status(400).json({msg: "No courses for this hod"});
        }
        let results = []
        function funct(item){
            try {
                results.push(item.instructors)
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        staff.forEach(funct)
        res.json(results);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewStaffCourse = async (req, res) => {
    try {
        let {course_name} = req.body;

        const validation = validateViewStaffCourse.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!course_name) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //course names found
        const course = await courses.findOne({name: course_name});
        if (!course) {
            return res.status(400).json({msg: "Course name not found"});
        }
        //check that course is that of current user
        if (course.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "User is not the coordinator of this course"});
        }
        const staff = await courses.findOne({name: course_name});
        res.json({course_name: staff.name, instructors: staff.instructors});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewDayOffAll = async (req, res) => {
    try {
        const days = await courses.find({course_coordinator_id: req.userid});
        if (!days) {
            return res.status(400).json({msg: "No instructors found"});
        }
        let results = []
        function funct(item){
            try {
                item.instructors.forEach(funct2)
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        function funct2(item){
            try {
                results.push({id: item.id, day_off: item.day_off})
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        days.forEach(funct)
        res.json(results);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewDayOffX = async (req, res) => {
    try {

        let {staff_id} = req.body;

        const validation = validateViewDayOffX.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!staff_id) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //check that staff exists in department
        const insts = await courses.find({course_coordinator_id: req.userid});
        if (!insts) {
            return res.status(400).json({msg: "No instructors in his department"});
        }
        let dayOff;
        function funct(item) {
            try {
                item.instructors.forEach(funct2)
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        function funct2(item) {
            try {
                if (item.id === staff_id) {
                    dayOff = item.day_off
                }
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        if (dayOff === null) {
            return res.status(400).json({msg: "This instructor doesnot teach courses in this hod's department"});
        }
        insts.forEach(funct);
        res.json({day_off: dayOff});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewRequests = async (req, res) => {
    try {
        const requestList = await requests.find({ $and: [{receiver_id: req.userid}, { $or: [{type: /leave/}, {type: "change day off"}]}]});
        if (!requestList) {
            return res.status(400).json({msg: "No requests of type leave or change day off issued for this hod"});
        }
        res.json(requestList);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const acceptRequest = async (req, res) => {
    try {
        let {request_id} = req.body;

        const validation = valdiateAcceptRequest.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!request_id) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //check that request exists
        const reqId = await requests.findOne({_id: request_id});
        if (!reqId) {
            return res.status(400).json({msg: "Request not found"});
        }
        //check that hod is the reciever
        if (reqID.receiver_id !== req.userid) {
            return res.status(400).json({msg: "Request not issued for this hod"});
        }
        await requests.updateOne({_id: request_id}, {$set: {status: "accepted"}});
        const request = await requests.findOne({_id: request_id})
        await academicMembers.updateOne({_id: request.sender_id}, {$pull: {missing_days: request.date_to_be_requested}})
        res.json(request);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const rejectRequest = async (req, res) => {
    try {
        let {request_id, reject_reason} = req.body;

        const validation = validateRejectRequest.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!request_id) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //check that request exists
        const reqId = await requests.findOne({_id: request_id});
        if (!reqId) {
            return res.status(400).json({msg: "Request not found"});
        }
        //check that hod is the reciever
        if (reqID.receiver_id !== req.userid) {
            return res.status(400).json({msg: "Request not issued for this hod"});
        }
        await requests.updateOne({_id: request_id}, {$set: {status: "rejected", reject_reason: reject_reason}});
        const request = await requests.findOne({_id: request_id})
        res.json(request);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewCoverage = async (req, res) => {
    try {
        let {course_name} = req.body;

        const validation = validateViewCoverage.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });

        //missing inputs
        if (!course_name) {
            return res.status(400).json({msg: "You are missing one of inputs"});
        }
        //check that course exists
        const course = await courses.findOne({name: course_name});
        if (!course) {
            return res.status(400).json({msg: "Course name not found"});
        }
        //check that course is that of current user
        if (course.course_coordinator_id !== req.userid) {
            return res.status(400).json({msg: "User is not the coordinator of this course"});
        }
        const slots = course.slots
        if (!slots) {
            return res.status(400).json({msg: "Course doesnot have any slots"});
        }

        const slotLength = slots.length;
        const assigned = 0;
        function funct(item) {
            try {
                if (item.status === "assigned") {
                    assigned++;
                }
            }
            catch (error) {
                res.status(500).json({error: error.message});
            }
        }
        slots.forEach(funct)
        const coverage = slotLength/assigned;
        res.json({coverage: coverage});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

const viewAssignments = async (req, res) => {
    try {
        const slots = await courses.find({course_cooridinator_id: req.userid}, 'slots');
        if (slots.length === 0) {
            return res.status(400).json({msg: "No teaching assignments for courses of this coordinator"});
        }
        res.json(slots);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }  
}

exports.assignInst = assignInst;
exports.reassignInst = reassignInst;
exports.unassignInst = unassignInst;
exports.viewStaffAll = viewStaffAll;
exports.viewStaffCourse = viewStaffCourse;
exports.viewDayOffAll = viewDayOffAll;
exports.viewDayOffX = viewDayOffX;
exports.viewRequests = viewRequests;
exports.acceptRequest = acceptRequest;
exports.rejectRequest = rejectRequest;
exports.viewCoverage = viewCoverage;
exports.viewAssignments = viewAssignments;