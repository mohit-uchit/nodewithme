const responseHandle = require('../helpers/responseHandle');
const userService = require('../services/userService');

const register = async(req, res) => {
  try {
    const data = await userService.register(req.body);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const login = async(req, res) => {
  try {
    const data = await userService.login(req.body);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const updatePassword = async(req, res) => {
  try {
    const data = await userService.updatePassword(req?.headers?.authorization?.slice(7), req.body);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

module.exports = {
  register,
  login,
  updatePassword
};
