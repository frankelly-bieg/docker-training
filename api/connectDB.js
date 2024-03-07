const mongoose = require('mongoose');

async function connectDB() {
  const MAX_RETRIES = 5;
  let retryCount = 0;

  const connectWithRetry = async () => {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/mydatabase';
    try {
      console.log('Connecting to MongoDB...', MONGO_URL)
      await mongoose.connect(MONGO_URL);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);

      if (retryCount < MAX_RETRIES) {
        const retryInterval = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Retrying connection in ${retryInterval / 1000} seconds...`);
        setTimeout(connectWithRetry, retryInterval);
        retryCount++;
      } else {
        console.error(`Failed to connect to MongoDB after ${retryCount} retries. Exiting...`);
        process.exit(1);
      }
    }
  };

  // connect
  connectWithRetry();
}

module.exports = connectDB;
