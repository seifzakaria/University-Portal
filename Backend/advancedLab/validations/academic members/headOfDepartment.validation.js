const Joi = require('joi')

const validateAssignInst = Joi.object({
  id: Joi.string().length(4).required(),
  course_name: Joi.string().required(),
});

const valdiateReassignInst = Joi.object({
  id: Joi.string().required(),
  course_name_remove: Joi.string().required(),
  course_name_add: Joi.string().required(),
 
});

const valdiateUnassignInst = Joi.object({
    id: Joi.string().required(),
    course_name: Joi.string().required(),
  });

  const valdiateViewStaffAll = Joi.object({
    id: Joi.string().required(),
    course_name_remove: Joi.string().required(),
    course_name_add: Joi.string().required(),
   
  });

  const validateViewStaffCourse = Joi.object({
    course_name: Joi.string().required(), 
  });


  const valdiateViewDayOffX = Joi.object({
    staff_id: Joi.string().required(), 
  });

  const valdiateViewRequests = Joi.object({  
  });

  const valdiateAcceptRequest = Joi.object({
    request_id: Joi.string().required(), 
  });

  const valdiateRejectRequest = Joi.object({
    request_id: Joi.string().required(), 
  });

  const valdiateViewCoverage = Joi.object({
    course_name: Joi.string().required(),
  });



module.exports = {
 validateAssignInst,
 valdiateReassignInst,
 valdiateUnassignInst,
 valdiateViewStaffAll,
 validateViewStaffCourse,
 valdiateViewDayOffX,
 valdiateViewRequests,
 valdiateAcceptRequest,
 valdiateRejectRequest,
 valdiateViewCoverage
}