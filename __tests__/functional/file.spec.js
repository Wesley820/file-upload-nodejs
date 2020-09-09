import request from 'supertest';
import mongoose from 'mongoose';
import del from 'del';
import path from 'path';

import factory from '../../src/database/factory';
import app from '../../src/start/app';
import truncate from '../util/truncate';

describe('File', () => {
  afterAll((done) => {
    mongoose.connection.close();
    del([path.resolve(__dirname, '..', '..', 'tmp', 'uploads', '*')]);
    done();
  });

  afterEach(async () => truncate());

  // Test Store method
  test('should perform the image upload when the requirements are valid', async () => {
    const response = await request(app)
      .post('/files')
      .set('Content-Type', 'multipart/form-data')
      .accept('application/json')
      .attach(
        'file',
        path.resolve(__dirname, '..', '..', 'tmp', 'tests', 'valid-file.jpg'),
      );

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('_id');
  });

  test('should return error 500 when trying to send an invalid file', async () => {
    const response = await request(app)
      .post('/files')
      .set('Content-Type', 'multipart/form-data')
      .accept('application/json')
      .attach(
        'file',
        path.resolve(__dirname, '..', '..', 'tmp', 'tests', 'invalid-file.js'),
      );

    expect(response.status).toEqual(500);
  });

  test('should return error when trying to send a photo larger than 1mb', async () => {
    const response = await request(app)
      .post('/files')
      .set('Content-Type', 'multipart/form-data')
      .accept('application/json')
      .attach(
        'file',
        path.resolve(
          __dirname,
          '..',
          '..',
          'tmp',
          'tests',
          'invalid-size-file.jpg',
        ),
      );

    expect(response.status).toEqual(500);
  });

  test('should error 400 when sending request without image', async () => {
    const response = await request(app).post('/files');
    expect(response.status).toEqual(400);
  });

  // Test Delete method
  test('should delete a certain record from the database and delete its photo', async () => {
    const { _id: id } = await factory.create('File');
    const response = await request(app).delete(`/files/${id}`);

    expect(response.status).toEqual(200);
  });
});
