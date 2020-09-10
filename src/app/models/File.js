import mongoose from 'mongoose';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import cloudinary from 'cloudinary';
import cloudinaryConfig from '~/config/cloudinary';

cloudinary.v2.config(cloudinaryConfig);

const FileSchema = new mongoose.Schema({
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
    cloudinary.v2.uploader.destroy(this.key);
  }

  if (process.env.NODE_ENV === 'development') {
    promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key),
    );
  }
});

export default mongoose.model('File', FileSchema);
