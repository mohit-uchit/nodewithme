const User = require('../models/user');
const bcrypt = require('bcrypt');
const authHelper = require('../helpers/authHelper');

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
    { email: data.email },
    { email: 1, password: 1 },
  );
  if (!existingUser) {
    throw new Error('The user has not registered yet.');
  }

  const verifyPass = await bcrypt.compare(data.password, existingUser.password);

  if (!verifyPass) {
    throw new Error('Incorrect Password');
  }

  const token = await authHelper.signAccessToken({
    id: existingUser._id,
  });

  return {
    id: existingUser._id,
    token,
  };
};

const updatePassword = async (token, data) => {
  if (!token) {
    throw new Error('Missing Token.')
  }

  const verify = authHelper.verifyAccessToken(token);
  if (!verify) {
    throw new Error('Unauthorised Access')
  }

  const existingData = await User.findById(verify.id);

  if (!existingData) {
    throw new Error('User does not exist')
  }

  const updatedUser = await User.updateOne({
    _id: verify.id
  }, {
    password: await bcrypt.hash(data.password, 10)
  })
  
  console.log(await bcrypt.hash(data.password, 10))
  return updatedUser
}

const logout = async () => {

}

module.exports = {
  register,
  login,
  updatePassword
};
