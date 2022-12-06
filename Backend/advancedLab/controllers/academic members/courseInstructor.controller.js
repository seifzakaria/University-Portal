const coursesModel = require('../../models/courses.model');
const academicMembersModel = require('../../models/academicMembers.model');
const slotsModel = require('../../models/slots.model');
const { validateViewCourseCoverage, 
valdiateViewSlotsAssignment, 
valdiateViewAllStaff,
validateAssignInstructorToSlot, validateUpdateAnAssignment,
validateRemoveAnAssignedMember, 
validateAcademicMemberToCourseCoordinator } 
= require('../../validations/academic members/courseInstructor.validation');

const viewCourseCoverage = async (req, res) => {
  try {
      let {academicMemberID, status} = req.body;
      if (!academicMemberID || !status) {
          return res.status(400).json({msg: "You are missing one of inputs"});
      } 
      const validation = validateViewCourseCoverage.validate(req.body);
  if (validation.error)
    return res.status(400).json({ msg: validation.error.message });
      const course = await slotsModel.find({status:status});
      if (!course) {
          return res.status(400).json({msg: "This academic member isn't assigned to this course"});
      }
      const slots = await coursesModel.find({academic_member_id: academicMemberID}, 'slots');
      if (!slots) {
          return res.status(400).json({msg: "Course doesnot have any slots"});
      }
      const slotLength = slots.length;
      const assigned = 0;
      const count = slots.forEach (
          async (req, res) => {
              try {
                  if (slots.slots.status === "assigned")
                      count++;
              }
              catch (error) {
                  res.status(500).json({error: error.message});
              }
          }
      )
      const coverage = slotLength/assigned;
      res.json(coverage);
  }
  catch (error) {
      res.status(500).json({error: error.message});
  }  
}

const viewSlotsAssignment= async (req, res) => {
  try {
    let {id} = req.body;
    if (!id) {
        return res.status(400).json({msg: "Please enter your id"});
    }
    const validation = valdiateViewSlotsAssignment.validate(req.body);
    if (validation.error)
      return res.status(400).json({ msg: validation.error.message });
    const courseInstructor = await academicMembersModel.find({//role: 'courseInstructor',
     id:id});
    if (!courseInstructor) {
        return res.status(400).json({msg: "You arenot the instructor of this course"});
    }
    const findSchedule = await academicMembersModel.find({id:id}, 'schedule')
    const findSlotsAssignment = await slotsModel.find({academic_member_id:id}, 'status')
    if (findSlotsAssignment == 'assigned') {
      return res.json({ data:findSchedule })
    } 
    else{
      return res.json({error:'No assigned slots'})
    }
  } catch (exception) {
    res.status(500).json({error: error.message});
  }
}

const viewAllStaff = async (req, res) => {
  try {
    let courseName = req.body;
    const validation = valdiateViewAllStaff.validate(req.body);
    if (validation.error)
      return res.status(400).json({ msg: validation.error.message });
    //find all instructors of every course
    const findAllStaff = await coursesModel.find({name: courseName}, 'instructors')
    if (!findAllStaff) 
      return res.json({error:'No instructors for this course'})
    return res.json(findAllStaff)
  } catch (exception) {
    res.status(500).json({error: error.message});
  }
}

  const assignInstructorToSlot = async (req, res) => {
    try { 
      let {id, courseName} = req.body
      if(!id || !courseName){
        return res.json({error:'You are missing one of the inputs'})
      }
      const validation = validateAssignInstructorToSlot.validate(req.body);
      if (validation.error)
        return res.status(400).json({ msg: validation.error.message });
      const findCourse = await coursesModel.findOne({name:courseName})
      if(!findCourse){
        return res.json({msg: "Course isn't found"})
      }
      const findInstructor = await academicMembersModel.find({id:id}, 'name')
      if(!findInstructor){
        return res.json({msg: "Instructor isn't found"})
      }
      const findUnassignedSlots = await slotsModel.find({academic_member_id:id,status:'unassigned'})
      if(!findUnassignedSlots){
        return res.json({msg: "Instructor is already assigned to this slot"})
      }
      if(findCourse && findInstructor && findUnassignedSlots){     
      await slotsModel.update({academic_member_id:id},{status:'assigned'})
      //await coursesModel.update({name:courseName},{$push: {slots: findInstructor}})
      return res.json({msg:'Instructor has been assigned to this slot successfully'})   
      }
      else{
        return res.json({msg: ":("})
      }  
    }
    catch (error) {
      res.status(500).json({error: error.message});
  
    }   
}

const updateAnAssignment = async (req, res) => {
    try {
        //condition to check if the instructor.academicMember.email is equal to the email (input) given
        let {id, courseName} = req.body;
        if(!id){ 
          return res.json({error:"Please enter your id"})
        }
        if(!courseName){
          return res.json({error:"Please enter course name"})
        }
        const validation = validateUpdateAnAssignment.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });
        const check = await academicMembersModel.find({id:id});
        // const courseID = await coursesModel.find({name:courseName}, 'id')
        // console.log(courseID)
        const updatedCourse = await slotsModel.find({academic_member_id:id}, 'status') 
        console.log(updatedCourse)
        if(check && updatedCourse){ 
        await slotsModel.updateOne({status:'assigned'})
        return res.json({ 
          msg: 'Role is updated successfully'
        })      
      }
      else{
        return res.json({error:'Status is already assigned'})
      }
    }catch (exception) {
      res.status(500).json({error: error.message});
    }
  }

  const removeAnAssignedMember = async (req, res) => {
    try{
      let id = req.body
      if(!id){
        return res.json({error:'missing input'})
      }
      const validation = validateRemoveAnAssignedMember.validate(req.body);
      if (validation.error){
        return res.status(400).json({ msg: validation.error.message });
      }
      const courseInstructor = await academicMembersModel.find({id:id})
      if(!courseInstructor){
        return res.json({msg: "This member doesn't exist"})
      }
      const findAssignedCourses = await academicMembersModel.find({id:id}, 'courses')
      console.log(findAssignedCourses)
      if(findAssignedCourses===[]){
        return res.json({msg: "This member has no assigned courses"})
      }
   //   const findAcademicMembers = await coursesModel.find({name:findAssignedCourses.name}, 'instructors');
        const updatedCourse = await coursesModel.update({name: findAssignedCourses}, {$pull: {instructors: courseInstructor}});
        await updatedCourse.save();
        return res.json({msg: "This member has been removed"})
    } 
      // const getInstructorSlot = await slotsModel.find({academic_member_id:id})
      // console.log(getInstructorSlot)
      // if(getInstructorSlot){
      //   await slotsModel.update({academic_member_id:id},{academic_member_id:null}) 
      // }
      // else{
      //   return res.json({error: 'not found'})   
      // }  
  //     const slotsUpdated = await slotsModel.findByIdAndUpdate(
  //      {academic_member_id :id},
  //       { academic_member_id:null},
  //       { new: true, useFindAndModify: false }
  //     ) 
  //   if(slotsUpdated){
  //     return res.json({ statusCode: successCode, data: slotsUpdated })   
  //   }
  //   else{
  //     return res.json({ msg: ':(' })
  //   }
  // }
    catch(exception){
      res.status(500).json({error: error.message});
    }
  }

  const academicMemberToCourseCoordinator = async (req, res) => {
    try {
        let {id} = req.body;
        if (!id) {
            return res.status(400).json({msg: "missing input"});
        }
        const courseInstructor = await academicMembersModel.find({id: id});
        if (!courseInstructor) {
            return res.status(400).json({msg: "Instructor doesn't exist"});
        }
        const validation = validateAcademicMemberToCourseCoordinator.validate(req.body);
        if (validation.error)
          return res.status(400).json({ msg: validation.error.message });
       const InstructorRole = await academicMembersModel.find({id:id},'role')
        if (InstructorRole === 'CI') {
          return res.json({msg: 'This instructor is already a course coordinator'})
      } 
      else{
        await academicMembersModel.updateOne({role:'CI'})
        return res.json({msg:"This member has been assigned to be a course coordinator"})
     }
    } catch (exception) {
      res.status(500).json({error: error.message});
    }
  }

module.exports={viewCourseCoverage,
                viewSlotsAssignment,
                viewAllStaff,
                assignInstructorToSlot,
                updateAnAssignment,
                removeAnAssignedMember,
                academicMemberToCourseCoordinator
              };



//view all staff w remove an unassigned member