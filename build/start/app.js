"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
|
| App is the class that constitutes the http server here are the
| middlewares and other configurations.
|
| To understand more about the express framework:
| https://expressjs.com/
|
*/

require('./bootstrap');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

var _cors3 = require('../config/cors'); var _cors4 = _interopRequireDefault(_cors3);
var _bodyParser = require('../config/bodyParser'); var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
require('../database');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, _cors4.default));
    this.app.use(_bodyparser2.default.json(_bodyParser2.default));
    this.app.use(
      '/files',
      _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads')),
    );
    this.app.use(_helmet2.default.call(void 0, ));
  }

  routes() {
    this.app.use(_routes2.default);
  }
}

exports. default = new App().app;
