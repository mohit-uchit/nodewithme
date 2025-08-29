const responseHandle = require('../helpers/responseHandle');
const userService = require('../services/userService');
const sessionService = require('../services/sessionService');
const authHelper = require('../helpers/authHelper');
const tokenDenyList = require('../helpers/tokenDenyList');

const cookiesOpts = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 2 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const data = await userService.register(req.body);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const data = await userService.login(req.body);
    res.cookie('refresh_token', data.tokens.refreshToken, cookiesOpts);
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const updatePassword = async (req, res) => {
  try {
    console.log(req.user)
    const data = await userService.updatePassword(
      req.user.id,
      req.body,
    );
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    const newTokens = await sessionService.rotateRefresh(refreshToken);
    res.cookie('refresh_token', newTokens.refreshToken, cookiesOpts);
    const data = { userId: newTokens.userId, token: newTokens.accessToken };
    return responseHandle.handleOk(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

const logOut = async (req, res) => {
  try {
    const rt = req.cookies?.refresh_token;
    if (rt) {
      await sessionService.revokeRefresh(rt);
    }

    res.clearCookie('refresh_token', cookiesOpts);
    const authz = req?.headers?.authorization || '';
    const token = authz.startsWith('Bearer') ? authz.slice(7) : null;

    if (token) {
      const decodedToken = authHelper.decodeToken(token);
      const now = Math.floor(Date.now() / 1000);
      const ttl = Math.max((decodedToken?.payload?.exp || now) - now, 1);
      if (decodedToken?.payload?.jti) {
        await tokenDenyList.deny(decodedToken.payload.jti, ttl);
      }
    }
    return responseHandle.handleOk(res, { message: 'LogOut successfully' });
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

module.exports = {
  register,
  login,
  updatePassword,
  refresh,
  logOut,
};
