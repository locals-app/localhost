const express = require('express');
const router = require('./router/router.js');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
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
  socket.on('message', (text) => {
    socket.broadcast.emit('message', {
      text,
      userId,
    });
  });
  console.log('====================================');
  console.log('socket connected');
  console.log('====================================');
});

server.listen(port, () => console.log('server listening on port: ' + port));

