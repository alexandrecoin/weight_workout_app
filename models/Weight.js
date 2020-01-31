const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const weightSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Weight', weightSchema);
