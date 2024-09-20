const Chat = require('../models/chatModel');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('sendMessage', async (data) => {
            const { from, message } = data;  // Only need 'from' and 'message'
            const chat = new Chat({ from, message });
            await chat.save();

            // Broadcast the message to all users in the group chat
            io.emit('receiveMessage', { from, message, timestamp: chat.timestamp });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
