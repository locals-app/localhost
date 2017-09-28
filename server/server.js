// import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
let expressJWT = require('express-jwt');
let jwt = require('jsonwebtoken');
// import files
const authMiddleware = require('./auth.middleware');
const router = require('./router/router.js');
const db = require('../DB/db.js');
// instantiate server and socketIo
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
// middleware
// app.use('/api', authMiddleware.jwtCheck);    --> these checks are what will need to be figured out
// app.use('/api', authMiddleware.readScope);    --> these checks are what will need to be figured out
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//we should add the secret in a separate file and .gitignore it
app.use(expressJWT({ secret: ''}))
app.use('/api', router);
app.use(express.static(__dirname + '/../client/static'));
// socket.io chat
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
// fire up server
server.listen(port, () => console.log('server listening on port: ' + port));