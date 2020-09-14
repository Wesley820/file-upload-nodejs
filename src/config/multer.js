import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import cloudinaryConfig from './cloudinary';

cloudinary.v2.config(cloudinaryConfig);

const fileDestination = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, fileDestination);
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) callback(error);
        const filename = `${hash.toString('hex')}.${file.originalname}`;
        callback(null, filename);
      });
    },
  }),
  cloudinary: new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'images',
    },
  }),
};

export default {
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
