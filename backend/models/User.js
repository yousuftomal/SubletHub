const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  nationalID: { type: String, required: true },
  profilePhoto: { type: String },
  age: { type: Number },
  occupation: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  ads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }] // Ensure the relationship is defined

});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
