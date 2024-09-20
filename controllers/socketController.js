const Message = require('../models/Message');

const socketController = (io) => {
  io.on('connection', async (socket) => {
    console.log('New client connected:', socket.id);

    try {
      // Send message history to the new client using async/await
      const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
      socket.emit('messageHistory', messages); // Emit messages to the client
    } catch (err) {
      console.error('Error fetching message history:', err);
    }

    // Listen for new messages
    socket.on('sendMessage', async (data) => {
      try {
        const newMessage = new Message({
          username: data.username,
          message: data.message,
        });
        const savedMessage = await newMessage.save(); // Save new message to DB
        io.emit('receiveMessage', savedMessage); // Emit new message to all clients
      } catch (err) {
        console.error('Error saving new message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketController;
