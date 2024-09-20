const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./db/connect');
const socketController = require('./controllers/socketController');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize Socket.IO
socketController(io);

// Sample GET route
app.get('/', (req, res) => {
    res.send('Welcome to the Talk Time server!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
