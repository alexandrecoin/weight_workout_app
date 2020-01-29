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
    required: true,
    type: String,
    unique: true,
  },
  gender: {
    required: true,
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
  age: {
    required: true,
    type: Number,
  },
  weight: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
