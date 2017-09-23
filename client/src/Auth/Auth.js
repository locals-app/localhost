// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'localhost-app.auth0.com',
    clientID: 'Mg4MZmQkghpTrMFJ4obiXXiqCD1zRL1t',
    redirectUri: 'http://localhost:3000/callback', //might need to change this  later on depending on router's configuration
    audience: 'https://localhost-app.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}