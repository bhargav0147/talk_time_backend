const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://bhargavpatel6832:PbeQHUmJZRiXZzLV@talktime.t7lfy.mongodb.net/?retryWrites=true&w=majority&appName=TalkTime', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
