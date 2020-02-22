const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    required: false,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
  username: {
    required: false,
    type: String,
    unique: true,
  },
  gender: {
    required: false,
    type: Boolean,
  },
  email: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
  confirmPassword: {
    required: true,
    type: String,
    minlength: 8,
  },
  age: {
    required: false,
    type: Number,
  },
  weight: {
    required: false,
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
