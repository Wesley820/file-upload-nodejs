"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _util = require('util');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);
var _cloudinary3 = require('../../config/cloudinary'); var _cloudinary4 = _interopRequireDefault(_cloudinary3);

_cloudinary2.default.v2.config(_cloudinary4.default);

const FileSchema = new _mongoose2.default.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

FileSchema.pre('save', function () {
  if (process.env.STORAGE_TYPE === 'local') {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

FileSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 'cloudinary') {
    _cloudinary2.default.v2.uploader.destroy(this.key);
  }

  if (process.env.NODE_ENV === 'development') {
    _util.promisify.call(void 0, _fs2.default.unlink)(
      _path2.default.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key),
    );
  }
});

exports. default = _mongoose2.default.model('File', FileSchema);
