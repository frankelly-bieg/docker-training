const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connectDB');
const Friend = require('./models/Friend');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // Create a new user
  app.post('/friend', async (req, res) => {
    try {
      const friend = await Friend.create(req.body);
      res.status(201).json(friend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all users
  app.get('/friends', async (req, res) => {
    try {
      // all friends
      const friends = await Friend.find();
      res.json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
});
