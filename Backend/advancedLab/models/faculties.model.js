const mongoose = require("mongoose");

const faculties = mongoose.Schema({

  name: String

});

module.exports = mongoose.model('faculties', faculties);