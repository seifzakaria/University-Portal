const mongoose = require("mongoose");

const locations = mongoose.Schema({

    name: String,
    loc_type: String,
    max_capacity: Number,
    current_capacity: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('locations', locations);