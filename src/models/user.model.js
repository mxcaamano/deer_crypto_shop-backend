const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: String,
  phone: { type: String, required: true },
  imgURL: { type: String, required: true },
  isAdmin: Boolean
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;