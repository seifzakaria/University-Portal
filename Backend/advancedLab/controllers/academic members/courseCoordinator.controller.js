// FINAL 

const mongoose = require('mongoose');
const requestsModel = require('../../models/requests.model');
const slotsModel = require('../../models/slots.model');
const academicMembersModel = require('../../models/academicMembers.model');
const inputValidation = require("../../validations/academic members/courseCoordinator.validation");

const AddSlot= async (req,res)=>{
try{ 

    const validation = inputValidation.add_delete_Validation.validate(req.body);
    
    if(validation.error)    
        return res.status(400).json(validation.error);
        
    //return res.status(400).json({msg: "Missing or invalid inputs."});
    
    const { slot_number, location, day, course_id } = req.body; 

    const newSlot = new slotsModel({ 
        slot_number : slot_number,
        location : location,
        day : day,
        course_id : course_id,
        academic_member_id : req.userid  
    }) 

    await newSlot.save();
    return res.json({msg:"Slot added."});
    }
    catch (error){
        console.log(error.message)
        res.status(500).json({error: "Error"});
        }   
}


const UpdateSlot= async (req,res)=>{
    try{ 
        
        const validation = inputValidation.updateValidation.validate(req.body)
        
        if(validation.error)    
            return res.status(400).json({msg: "Missing or invalid inputs."});
        
        const { slot_number, location, day, course_id, new_slot_number, new_location, new_day } = req.body; 

        const slotFound = await slotsModel.findOne({slot_number: slot_number, location: location, day: day, course_id: course_id, academic_member_id: req.userid })
        
        if(slotFound == null) 
            return res.status(404).json({error:"This slot does not exist."});

        const slotSelected = await slotsModel.updateOne({slot_number: slot_number, location: location, day: day,course_id: course_id, academic_member_id: req.userid  },
            {$set:{slot_number: new_slot_number, location: new_location, day: new_day }});
        
        const newSlot = await slotsModel.findOne({slot_number: new_slot_number, location: new_location, day: new_day});
        console.log(newSlot)    
           
        const academicMemberPull = await academicMembersModel.updateOne({_id: slotFound.academic_member_id},{$pull:{schedule: slotFound}})
        const academicMemberPush = await academicMembersModel.updateOne({_id: slotFound.academic_member_id},{$push:{schedule: newSlot}})
          
        
        
        return res.json({msg: "Slot updated."});
    }
    catch (error){
        res.status(500).json({error: error.message});
        }   
}

const DeleteSlot= async (req,res)=>{
    try{ 
        const validation = inputValidation.add_delete_Validation.validate(req.body)
        
        if(validation.error){
            return res.status(400).json({msg: "Missing or invalid inputs."});
        }    
        const { slot_number, location, day, course_id } = req.body; 
        
        const slotFound = await slotsModel.findOne({slot_number: slot_number, location: location, day: day, course_id: course_id, academic_member_id: req.userid })

        if(slotFound == null){
            return res.status(404).json({error: "This slot does not exist."});
        }
        
        await slotsModel.findOneAndDelete({slot_number: slot_number, location: location, day: day, course_id: course_id, academic_member_id: req.userid})
        
        return res.json({msg: "Removed successfully!"})
             
    }
    catch (error){
        res.status(500).json({error: "Error"});
        }   
}

const ViewRequests= async (req,res)=>{
    try{ 

        const requests = await requestsModel.find({type: "slot_linking", receiver_id: req.userid })    // CHECK TYPE WRITTEN CORRECT OR NOT!

        if(requests.length === 0){ 
            return res.status(404).json({msg: "There are no active requests."});
        }
        return res.json(requests)
    }
    catch (error){
        res.status(500).json({error: "Error"});
        }   
}

const AcceptRequest= async (req,res)=>{
    try{
        const validation = inputValidation.accept_reject_Validation.validate(req.body)
        if(validation.error){
            return res.status(400).json({msg: "Missing or invalid inputs."});
        }    
        const { request_id } = req.body; 
        const requests = await requestsModel.findOne({type: "slot_linking", receiver_id: req.userid, _id: request_id })    // CHECK TYPE WRITTEN CORRECT OR NOT!
      
        if(requests == null){
            return res.status(404).json({msg: "There are no active requests."});
        }   
        if(requests.status.toLowerCase().localeCompare("accepted") === 0){
            return res.json({msg: "Request already accepted!"})
        }

        const requestSelected = await requestsModel.updateOne({type: "slot_linking", receiver_id: req.userid, _id: request_id},
            {$set:{status: "Accepted" }});   
        
        const slotFound = await slotsModel.findById(requests.slot_id);
        await academicMembersModel.updateOne({_id: requests.receiver_id},{$push:{schedule:slotFound}})
        
        return res.json({msg: "Request status updated!"})
        }
    catch (error){
        res.status(500).json({error: error.message});
        
        //res.status(500).json({error: "Error"});
        }   
}


const RejectRequest = async (req,res)=>{
    try{
        const validation = inputValidation.accept_reject_Validation.validate(req.body)
        if(validation.error){
            return res.status(400).json({msg: "Missing or invalid inputs."});
        }    
        const { request_id } = req.body; 
        const requests = await requestsModel.findOne({type: "slot_linking", receiver_id: req.userid, _id: request_id })    // CHECK TYPE WRITTEN CORRECT OR NOT!
      
        if(requests.length == null){
            return res.status(404).json({msg: "There are no active requests."});
        }   

        if(requests.status.toLowerCase().localeCompare("rejected") === 0){
            return res.json({msg: "Request already rejected!"})
        }
        const requestSelected = await requestsModel.updateOne({type: "slot_linking", receiver_id: req.userid, _id: request_id},
            {$set:{status: "Rejected" }});   
        
        return res.json({msg: "Request status updated!"})

    }
    catch (error){
        res.status(500).json({error: "Error"});
        }   
}

exports.AddSlot = AddSlot;
exports.UpdateSlot = UpdateSlot;
exports.DeleteSlot = DeleteSlot;
exports.ViewRequests = ViewRequests;
exports.AcceptRequest = AcceptRequest;
exports.RejectRequest = RejectRequest;