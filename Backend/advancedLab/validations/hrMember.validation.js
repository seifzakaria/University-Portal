const { valid } = require("joi");
const Joi = require("joi");
const { update_department } = require("../controllers/hrMember.controller");

const addUserValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("M", "F").required(),
  role: Joi.string().valid("HR", "TA", "CI", "CC", "HOD").required(),
  salary: Joi.number().required(),
  day_off: Joi.string()
    .valid("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday")
    .required(),
  location_id: Joi.string().required(),
});

const validate_name = Joi.object({
  name: Joi.string().required(),
});
const validate_course = Joi.object({
  name: Joi.string().required(),
  newname:Joi.string().required()
});

const validate_addcourse_course = Joi.object({
  name: Joi.string().required(),
  department_id: Joi.string().required(), 
  course_coordinator_id:Joi.string().required()
});

const addlocationvalid=Joi.object({
  name: Joi.string().required(),
  loc_type: Joi.string().valid("Hall", "Office", "Tutorial", "Lab").required(),
  max_capacity:Joi.number().required(),
  current_capacity:Joi.number().required()

});

const updatevalidation=Joi.object({
  name: Joi.string().required(),
 newname:Joi.string().required(),
 loc_type:Joi.string().valid("Hall", "Office", "Tutorial", "Lab").required()
});

const update_faculty_validation=Joi.object({
  name: Joi.string().required(),
 newname:Joi.string().required()
});
const Add_Department_validation=Joi.object({
  name:Joi.string().required(),
  faculty_id:Joi.string().required(),
  hod_id:Joi.string().required()
});
const update_Department_validation=Joi.object({
  id:Joi.string().required(),
name: Joi.string(),
 newname:Joi.string(),
 faculty_id:Joi.string(),
 hod_id:Joi.string()

});
const update_Course_validation=Joi.object({
  id:Joi.string().required(),
  name: Joi.string(),
  department_id:Joi.string(),
  course_coordinator_id:Joi.string()

});
const update_salary_validation=Joi.object({
  id:Joi.string().required(),
  salary:Joi.number().required()
});
const update_user_validation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().valid("M", "F"),
  office_loc: Joi.string(),
 id:Joi.string().required()
})
const validat_id = Joi.object({
  id: Joi.string().required()

})
module.exports = {
  addUserValidation: addUserValidation,
  addlocationvalid:addlocationvalid,
  updatevalidation:updatevalidation,
  validate_name:validate_name,
  update_faculty_validation:update_faculty_validation,
  Add_Department_validation:Add_Department_validation,
  update_Department_validation:update_Department_validation,
  update_Course_validation:update_Course_validation,
  update_salary_validation:update_salary_validation,
  update_user_validation:update_user_validation,
  validate_course:validate_course,
  validate_addcourse_course:validate_addcourse_course,
  validat_id:validat_id
};