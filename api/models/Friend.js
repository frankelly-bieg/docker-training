const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  name: String,
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
