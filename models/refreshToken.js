const mongoose = require('mongoose');

const refreshTokeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, index: true, required: true },
    tokenHash: { type: String, unique: true, index: true, required: true },
    expiresAt: { type: Date, index: true, required: true },
  },
  {
    timestamps: true,
  },
);

const RefreshToken = mongoose.model('RefreshToken', refreshTokeSchema);

module.exports = RefreshToken;
