const mongoose = require("mongoose");

const departments = mongoose.Schema({

    name: String,
    faculty_id: String,
    hod_id: String

});

module.exports = mongoose.model('departments', departments);