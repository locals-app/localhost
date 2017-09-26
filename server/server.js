const express = require('express');
const router = require('./router/router.js');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../DB/db.js');
//instantiate server and socketIo
const cors = require('cors');

const authCheck = jwt({
  secret: new Buffer('Vwx3MnEbWbwwYMJ9WzeaqVXXbk0bABOhVbhaUM9uApzwF-uV3FRNUGI63D2HscNx', 'base64'),
  audience: 'kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk'
});

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

// var a = {
//   "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EUkdPRE5CT0VJNVFqQkZSalV6TkVRNU16QXlPVGN4TmtORFJUTXdSVUV5TUVWRFFrTkZOdyJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC1hcHAuYXV0aDAuY29tLyIsInN1YiI6ImthUVRCamc2bTFWV1h1anVXcmpZTkRhaEhwRHlKQkVrQGNsaWVudHMiLCJhdWQiOiJpZGVudGlmaWVyLWxvY2FsaG9zdC1hcHAtYXBpIiwiZXhwIjoxNTA2NDg3MjI5LCJpYXQiOjE1MDY0MDA4MjksInNjb3BlIjoiIn0.gjlltZJ-1ZFuUqKwJUBViSaH63AikmCnZ1kDnxzkpu6dgZ4i4eMn5GX-Q0K8-CMo0IILx6Q6cJmzRvGz2dVnGxj5QCORRfMoMR_w1EM9CMmxPjl4w0Ek6wgx0Ypo-y0LlIfwawk98_y7DafKHiZbB_3Lwc9FZy7oEt8QtdO_jvL0vAjD46NQOJZWhENOFr5nGX4P8bSym9OIUylQZKYcL-esYtdAGKugSXITMnWg7U4mOFpra5aRDFapRwPVliFRheGnnrrqka6nke5ODG9VLGZ7-wcpdBeXaRTeew7qit2aYFBeimwKBu6Gl8KQDCvQDheoooya4qO9n1Bh7I7lqg",
//   "expires_in":86400,
//   "token_type":"Bearer"
// }