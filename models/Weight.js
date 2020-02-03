const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const weightSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = mongoose.model('Weight', weightSchema);
