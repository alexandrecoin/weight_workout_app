const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const durationBeforeExpiration = 3600000;

const tokenSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now()
  },
  expiresAt: {
    type: String,
    default: Date.now()
  }
});

module.exports = mongoose.model('Token', tokenSchema);
