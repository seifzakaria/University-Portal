const Joi = require("joi");


const add_delete_Validation = Joi.object({
    slot_number: Joi.number().required(),
    location: Joi.string().required(),
    day: Joi.string().required(),
    course_id: Joi.string().required(),
  
})

const updateValidation = Joi.object({
    slot_number: Joi.number().required(),
    location: Joi.string().required(),
    day: Joi.string().required(),
    course_id: Joi.string().required(),
    

    new_slot_number: Joi.number().required(),
    new_location: Joi.string().required(),
    new_day: Joi.string().required(),
   
})

// const view_requests_Validation = Joi.object({
//     courseCoordinatorID: Joi.string().required(),
// })

const accept_reject_Validation = Joi.object({
    request_id: Joi.string().required()
})
module.exports = {updateValidation, add_delete_Validation, accept_reject_Validation}