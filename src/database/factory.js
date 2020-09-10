/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to generate dummy data for the database, you can use
| them for automated testing construction.
|
*/

import { factory } from 'factory-girl';
import faker from 'faker';

import File from '~/app/models/File';

factory.define('File', File, {
  name: faker.system.fileName(),
  size: faker.random.number(),
  key: faker.random.alphaNumeric(15),
  url: faker.image.imageUrl(),
});

export default factory;
