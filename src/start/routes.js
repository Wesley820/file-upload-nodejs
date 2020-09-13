import { Router } from 'express';
import multer from 'multer';

import FileController from '@app/controllers/FileController';
import multerConfig from '@config/multer';

const Route = Router();
const upload = multer(multerConfig);

Route.get('/', async (request, response) => {
  return response.json({ greeting: 'Hello world' });
});

Route.post('/files', upload.single('file'), FileController.store);
Route.get('/files', FileController.index);
Route.delete('/files/:id', FileController.delete);

export default Route;
