"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multerstoragecloudinary = require('multer-storage-cloudinary');
var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _cloudinary3 = require('./cloudinary'); var _cloudinary4 = _interopRequireDefault(_cloudinary3);

_cloudinary2.default.v2.config(_cloudinary4.default);

const fileDestination = _path2.default.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes = {
  local: _multer2.default.diskStorage({
    destination: (request, file, callback) => {
      callback(null, fileDestination);
    },
    filename: (request, file, callback) => {
      _crypto2.default.randomBytes(16, (error, hash) => {
        if (error) callback(error);
        const filename = `${hash.toString('hex')}.${file.originalname}`;
        callback(null, filename);
      });
    },
  }),
  cloudinary: new (0, _multerstoragecloudinary.CloudinaryStorage)({
    cloudinary: _cloudinary2.default.v2,
    params: {
      folder: 'images',
    },
  }),
};

exports. default = {
  dest: fileDestination,
  storage: storageTypes[process.env.STORAGE_TYPE || 'local'],
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};
