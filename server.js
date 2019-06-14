var express = require('express');
var setRoutes = require('./route');
var config = require('./config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 3200;
const DB_BASE_URL = 'mongodb://127.0.0.1:27017/angelhack';
const MAX_BODY_SIZE = 1024 * 1024 * 20;

const app = express();
app.use(bodyParser.json({ limit: MAX_BODY_SIZE, type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.bodyParser({limit: '50mb'}));
app.use(cookieParser());

mongoose.connect(DB_BASE_URL, { useNewUrlParser: true });
const mongodb = mongoose.connection;
mongoose.Promise = global.Promise;

var startServer = async () => {
  
  app.listen(SERVER_PORT, () => {
    console.log('PM TASK LISTENING ON PORT ' + SERVER_PORT);
  });

  await app.use('/*', function (req, res, next) {
    console.log(new Date() + ' ' + req.originalUrl);
    config(req, res, next);
  });

};

mongodb.once('open', (e) => {
  console.log('CONNECTED TO MONGODB!');
  startServer();
  setRoutes(app);
});

mongodb.on('error', function (err) {  
  console.error('CONNECT TO MONGODB ERROR!', err);
}); 