const mongoose = require("mongoose");

const requests = mongoose.Schema({

    type: String,
    sender_id: String,
    receiver_id: String,
    status: {
        type: String,
        default: "Pending"
    },
    date_to_be_requested: Date,
    slot_id: String,
    reason: String,
    dayOffReq: String,
    dayComp: Date, 
    reject_reason: String
    
});

module.exports = mongoose.model('requests', requests);