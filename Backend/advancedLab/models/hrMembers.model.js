const mongoose = require("mongoose");

const hrMembers = mongoose.Schema({

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
    salary: Number,
    day_off: {
        type: String,
        default: "Saturday"
    },
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
    total_hours_attended: {
        type: Number,
        default: 0
    },
    missing_days: [Date],
    missing_hours: Number,
    number_of_days_to_attend: Number
    
});

module.exports = mongoose.model('hrMembers', hrMembers);