// === backend/controllers/messageController.js ===
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { recipient } = req.query;
  const filter = recipient ? {
    $or: [
      { sender: req.user.username, recipient },
      { sender: recipient, recipient: req.user.username }
    ]
  } : { recipient: null };
  const messages = await Message.find(filter).sort({ timestamp: 1 });
  res.json(messages);
};

exports.deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message deleted' });
};