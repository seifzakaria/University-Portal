const Joi = require('joi')

const validateViewCourseCoverage = Joi.object({
  academicMemberID: Joi.string().length(4).required(),
  status: Joi.string().required(),
});

const valdiateViewSlotsAssignment = Joi.object({
  id: Joi.string().length(4).required(),
 
});

const valdiateViewAllStaff = Joi.object({
  courseName: Joi.string().required(),
 
});

const validateAssignInstructorToSlot = Joi.object({
  id: Joi.string().length(3).required(),
  courseName : Joi.string().required(),
 
});

const validateUpdateAnAssignment = Joi.object({
    id: Joi.string().length(3).required(),
    courseName : Joi.string().required(),
   
  });

  const validateRemoveAnAssignedMember = Joi.object({
    id: Joi.string().length(4).required(), 
  });

  const validateAcademicMemberToCourseCoordinator = Joi.object({
    id: Joi.string().length(4).required(),
  });

module.exports = {
 validateViewCourseCoverage,
 valdiateViewSlotsAssignment,
 valdiateViewAllStaff,
 validateAssignInstructorToSlot,
 validateUpdateAnAssignment,
 validateRemoveAnAssignedMember,
 validateAcademicMemberToCourseCoordinator
}