const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

module.exports = {

  readScope: jwtAuthz([ 'read:all' ]),

  jwtCheck: jwt({
    secret: 'Vwx3MnEbWbwwYMJ9WzeaqVXXbk0bABOhVbhaUM9uApzwF-uV3FRNUGI63D2HscNx',
    audience: 'http://localhost:3000',
    issuer: "https://localhost-app.auth0.com",
    algorithms: ['HS256']
  }),

};

