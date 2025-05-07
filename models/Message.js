// === backend/models/Message.js ===
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String, // null for group
  content: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', messageSchema);
