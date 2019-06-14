var express = require('express');
var UserCtr = require('./controller/user');

function setRoutes(app) {
  const router = express.Router();
  const userCtr = new UserCtr();

  // user
  app.route('/user/test').get(userCtr.test);

}

module.exports = setRoutes;
