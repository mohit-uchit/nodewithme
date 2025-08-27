const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      minLength: [5, 'The minimum length must be 5 chars.'],
      maxLength: [50, 'The maximum length is 50 chars.'],
      lowercase: true,
      trim: true, // ' test ',
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'The minimum length of password must be 6 chars.'],
    },
    roles: [{ type: String, default: ['student']}]
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
