const mongoose = require("mongoose");

const slots = mongoose.Schema({

    slot_number: Number,
    location: String,
    day: String,
    time: String,
    academic_member_id: String,
    status: {
        type: String,
        default: "unassigned"
    },
    course_id: String
})

module.exports = mongoose.model('slots', slots);