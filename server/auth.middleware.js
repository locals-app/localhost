const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

module.exports = {

  readScope: jwtAuthz([ 'read:all' ]),

  jwtCheck: jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 20,
      jwksUri: "https://localhost-app.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000',
    issuer: "https://localhost-app.auth0.com",
    algorithms: ['RS256']
  }),

};