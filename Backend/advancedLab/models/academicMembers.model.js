const mongoose = require("mongoose");
const slots = require('./slots.model.js').schema;

const academicMembers = mongoose.Schema({

    id: {
        type: String,
        unique: true
    },
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: '123456'
    },
    gender: String,
    role: String,
    salary: Number,
    day_off: String,
    department_id: String,
    sign_in: [Date],
    sign_out: [Date],
    annual_leave_balance: {
        type: Number,
        default: 2.5
    },
    accidential_leave_balance: { 
        type: Number, 
        default: 6 
    },
    ofiice_loc: String,
    schedule: [slots],
    total_hours_attended: {
        type: Number,
        default: 0
    },
    missing_days: [Date],
    missing_hours: Number,
    number_of_days_to_attend: Number

});

module.exports = mongoose.model('academicMembers', academicMembers);
