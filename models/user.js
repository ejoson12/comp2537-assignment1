const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const usersModel = mongoose.model('user', usersSchema);

module.exports = usersModel;