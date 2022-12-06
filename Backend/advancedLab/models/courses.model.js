const mongoose = require("mongoose");
const academicMembers = require('./academicMembers.model').schema;

const courses = mongoose.Schema({

    name: String,
    department_id: String,
    instructors: [academicMembers],
    course_coordinator_id: String

});

module.exports = mongoose.model('courses', courses);