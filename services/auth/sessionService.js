const crypto = require('crypto');
const RefreshToken = require('../../models/refreshToken');
const authHelper = require('../../helpers/authHelper');

const refreshTtlDays = 2;

const issueSession = async (user) => {
   const accessToken = authHelper.signAccessToken({ id: user._id, roles: user.roles || [] });
   const refreshPlain = crypto.randomBytes(64).toString('base64url');
   const tokenHash = sha256(refreshPlain);
   // 
   const expiresAt = new Date(Date.now() + (refreshTtlDays * 24 * 60 * 60 * 1000));


   await RefreshToken.create({
      userId: user._id,
      tokenHash: tokenHash,
      expiresAt: expiresAt
   })

   return {
      accessToken,
      refreshToken: refreshPlain
   }
}

const sha256 = (input) => {
   return crypto.createHash('sha256').update(input).digest('hex');
}

const rotateRefresh = async (refreshPlain) => {
   const tokenHash = sha256(refreshPlain);

   const existingToken = await RefreshToken.findOne({ tokenHash });

   if (!existingToken) {
      throw new Error('Invalid or Expired refresh token.')
   };

   const userId = existingToken.userId;
   await RefreshToken.deleteOne({ _id: existingToken._id })

   const accessToken = authHelper.signAccessToken({ id: userId });

   const newPlain = crypto.randomBytes(64).toString('base64url');
   const newHash = sha256(newPlain);
   const expiresAt = new Date(Date.now() + (refreshTtlDays * 24 * 60 * 60 * 1000));
   await RefreshToken.create({
      userId: userId,
      tokenHash: newHash,
      expiresAt: expiresAt
   })

   return { userId, accessToken, refreshToken: newPlain }
};

const revokeRefresh = async (refreshPlain) => {
   if (!refreshPlain) {
      return;
   }
   const tokenHash = sha256(refreshPlain);
   await RefreshToken.deleteOne({ tokenHash })
};

const revokeAllForUser = async (userId) => {
   await RefreshToken.deleteMany({ userId })
}


module.exports = {
   issueSession,
   rotateRefresh,
   revokeRefresh,
   revokeAllForUser,
}



// 123445
// sha256 
// update => input => 43rtkjkdsjgk405340-5jkjdgdjg
