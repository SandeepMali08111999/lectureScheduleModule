const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'admin', 'instructor', 'user'
  email:{ type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', UserSchema);
