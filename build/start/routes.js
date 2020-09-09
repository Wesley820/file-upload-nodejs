"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _FileController = require('../app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);

const Route = _express.Router.call(void 0, );
const upload = _multer2.default.call(void 0, _multer4.default);

Route.post('/files', upload.single('file'), _FileController2.default.store);
Route.delete('/files/:id', _FileController2.default.delete);

exports. default = Route;
