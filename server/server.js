const express = require('express');
const router = require('./router/router.js');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/static'));

app.listen(port, () => console.log('server listening on port: ' + port));

