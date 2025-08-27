const mongoose = require('mongoose');

/**
 * Connects the database
 * @param {string} uri MongoDb URI string
 */
const connectDb = async uri => {
  try {
    console.log('connecting to database .....')
    await mongoose.connect(uri);
    console.log(' ✅ Connected to database');
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDb
