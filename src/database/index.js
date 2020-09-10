import mongoose from 'mongoose';
import dbConfig from '~/config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnect = mongoose.connect(dbConfig.url, dbConfig.options);
  }
}

export default new Database();
