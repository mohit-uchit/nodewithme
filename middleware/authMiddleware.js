const authHelper = require('../helpers/authHelper');
const { isDenied } = require('../helpers/tokenDenyList');

const auth = async (req, res, next) => {
  try {
    const authz = req.headers.authorization || '';
    const token = authz.startsWith('Bearer') ? authz.slice(7) : null;
    if (!token) {
      return res.status(401).json({
        message: 'Missing Authorization Header',
      });
    }

    const payload = authHelper.verifyAccessToken(token);
    // { jti: , id: }
    if (await isDenied(payload.jti)) {
      return res.status(401).json({
        message: 'Token Expired',
      });
    }

    req.user = { id: payload.id, jti: payload.jti, roles: payload.roles || [] };
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};

module.exports = auth;