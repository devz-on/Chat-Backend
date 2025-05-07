// === backend/sockets/chat.js ===
const Message = require('../models/Message');

const onlineUsers = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('register', (username) => {
      onlineUsers.set(username, socket.id);
      socket.username = username;
      io.emit('userStatus', Array.from(onlineUsers.keys()));
    });

    socket.on('sendMessage', async ({ sender, content, recipient }) => {
      const msg = new Message({ sender, content, recipient: recipient || null });
      await msg.save();

      if (recipient) {
        const recipientSocketId = onlineUsers.get(recipient);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('privateMessage', msg);
        }
      } else {
        io.emit('message', msg);
      }
    });

    socket.on('disconnect', () => {
      if (socket.username) {
        onlineUsers.delete(socket.username);
        io.emit('userStatus', Array.from(onlineUsers.keys()));
      }
      console.log('Socket disconnected:', socket.id);
    });
  });
};
