/*
|--------------------------------------------------------------------------
| Truncate
|--------------------------------------------------------------------------
|
| Used to clean all tables in the database, this type of file is useful for
| automated tests, so that before executing each test it clears any
| information from the database.
|
*/

import mongoose from 'mongoose';

export default function truncate() {
  return Promise.all(
    Object.keys(mongoose.connection.collections).map((collectionName) => {
      return mongoose.connection.collection(collectionName).deleteMany({});
    }),
  );
}
