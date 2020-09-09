"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to generate dummy data for the database, you can use
| them for automated testing construction.
|
*/

var _factorygirl = require('factory-girl');
var _faker = require('faker'); var _faker2 = _interopRequireDefault(_faker);

var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);

_factorygirl.factory.define('File', _File2.default, {
  name: _faker2.default.system.fileName(),
  size: _faker2.default.random.number(),
  key: _faker2.default.random.alphaNumeric(15),
  url: _faker2.default.image.imageUrl(),
});

exports. default = _factorygirl.factory;
