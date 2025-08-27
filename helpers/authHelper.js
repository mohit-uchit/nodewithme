const jwt = require('jsonwebtoken');
const fs = require('fs');
const { randomUUID } = require('crypto');
const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');
const tokenIssuer = process.env.JWT_ISSUER;
// jwt 
// sign
// decode
// verify

// sign 
const signAccessToken = (payload) => {
  const jti = randomUUID();
   return jwt.sign(payload, privateKey, {
     algorithm: 'RS256',
     expiresIn: '30d',
     jwtid: jti,
     issuer: tokenIssuer
   })
}

// verify 
const verifyAccessToken = (token) => {
  return jwt.verify(token, publicKey, {
     algorithms: ['RS256'],
     issuer: tokenIssuer
  })
}

const decodeToken = (token) => {
  return jwt.decode(token, { complete: true})
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  decodeToken
}


// REDIS => 
  // Open-Source , RAM => fast performance , for less storage , token management , cronjobs, caching
// real-time analytics, pub-sub 
// In memory => database => memory 
// Database => mongodb, mysql => storage

// set => value set
// get => for getting stored values