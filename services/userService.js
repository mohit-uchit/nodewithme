const User = require('../models/user');
const bcrypt = require('bcrypt');
const authHelper = require('../helpers/authHelper');
const sessionService = require('./sessionService')

const register = async data => {
  const existingUser = await User.findOne({ email: data.email }, { email: 1 });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = await User.insertOne({
    email: data.email,
    password: await bcrypt.hash(data.password, 10),
  });

  return {
    id: newUser._id,
    email: newUser.email,
  };

  // one way => encrypt => bcrypt => encrypt =>decrypt
  // const verifyPass = await bcrypt.compare('1111111111111111111', hashedPassword)
};

const login = async data => {
  const existingUser = await User.findOne(
    { email: (data.email).toLowerCase() },
    { email: 1, password: 1 },
  );
  if (!existingUser) {
    throw new Error('The user has not registered yet.');
  }

  const verifyPass = await bcrypt.compare(data.password, existingUser.password);

  if (!verifyPass) {
    throw new Error('Incorrect Password');
  }

  const session = await sessionService.issueSession(existingUser);

  return {
    id: existingUser._id,
    tokens: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken
    },
  };
};

const updatePassword = async (userId, data) => {
  const existingUser = await User.findById(userId);
  if(!existingUser){
    throw new Error('User do not exists')
  }
  const updatedUser = await User.updateOne({
    _id: userId
  }, {
    password: await bcrypt.hash(data.password, 10)
  })
  
  console.log(await bcrypt.hash(data.password, 10))
  return updatedUser
}

module.exports = {
  register,
  login,
  updatePassword
};
