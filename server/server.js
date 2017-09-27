const express = require('express');
const router = require('./router/router.js');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../DB/db.js');
//instantiate server and socketIo
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

// const authCheck = jwt({
//   secret: new Buffer('Vwx3MnEbWbwwYMJ9WzeaqVXXbk0bABOhVbhaUM9uApzwF-uV3FRNUGI63D2HscNx', 'base64'),
//   audience: 'kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk'
// });
// const authCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 20,
//     // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
//     jwksUri: "https://localhost-app.auth0.com/.well-known/jwks.json"      
//   }),
//   // This is the identifier we set when we created the API
//   audience: 'identifier-localhost-app-api',
//   issuer: 'localhost-app.auth0.com',
//   algorithms: ['RS256']
// });
// app.use('/api', authCheck);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/authTest', express.static(__dirname + '/client/static/authTest.html'));
app.use('/api', router);
app.use(express.static(__dirname + '/../client/static'));

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.broadcast.emit('message', {
      text: message.text,
      userId: message.userId,
      id: message.id+1,
      conversationId: message.conversationId,
    });
    db.User.findOne({
      where: {username: message.userId}
    })
      .then((user) => {
        db.Message.create({
          text: message.text,
          userId: user.id,
          conversationId: message.conversationId,
        })
          .then((success) => {
            console.log('message added to DB');
          })
          .catch((err) => {
            console.log(err, 'message failed to add to DB');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

server.listen(port, () => console.log('server listening on port: ' + port));