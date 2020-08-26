const mongoose = require("mongoose");

const { Schema } = mongoose;

const newAdmin = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("admins", newAdmin);
