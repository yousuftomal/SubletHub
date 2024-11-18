const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  nationalID: { type: String, required: true },
  profilePhoto: { type: String },
  age: { type: Number },
  occupation: { type: String },
});

module.exports = mongoose.model('User', userSchema);
