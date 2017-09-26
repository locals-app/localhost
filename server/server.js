const express = require('express');
const router = require('./router/router.js');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../DB/db.js');
//instantiate server and socketIo
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', router);
app.use(express.static(__dirname + '/../client/static'));

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('====================================');
    console.log('here is conversationId', message);
    console.log('====================================');
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

