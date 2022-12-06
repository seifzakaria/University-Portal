const Joi = require('joi')

const validateReplacementReq = Joi.object({
    date_to_be_requested: Joi.string().required(),
    receiver_id: Joi.string().required(),
    slot_id: Joi.string().required(), 
});

  const valdiateSlotLinkingReq = Joi.object({
    dateReq: Joi.date().required(),
    slot_id: Joi.string().required(), 
  });

  const validateDayOffReq = Joi.object({
    newDayOff: Joi.string().required(),
    reason: Joi.string().required(),  
  });
  
  const validateAnnualLeave = Joi.object({
    absentDate: Joi.date().required(),
    reason: Joi.string().required(), 
  });

  const validateCompLeaveReq = Joi.object({
    dayAbsent: Joi.date().required(),
    dayComp: Joi.date().required(),
    reason: Joi.string().required(), 
  });

  const valdiateAcciLeaveReq = Joi.object({
    absentDate: Joi.date().required(),
    reason: Joi.string().required(), 
  });

  const valdiateSickLeaveReq  = Joi.object({ 
    absentDate: Joi.date().required(),
    reason: Joi.string().required(),  
  });

  const valdiateMaternityLeave = Joi.object({
    absentDate: Joi.date().required(),
    reason: Joi.string().required(),  
  });

  const valdiateCancelReq = Joi.object({
    reqId: Joi.string().required(),
  });

module.exports = {
    validateReplacementReq,
    valdiateSlotLinkingReq,
    validateDayOffReq,
    validateAnnualLeave,
    validateCompLeaveReq,
    valdiateAcciLeaveReq,
    valdiateSickLeaveReq,
    valdiateMaternityLeave,
    valdiateCancelReq
}