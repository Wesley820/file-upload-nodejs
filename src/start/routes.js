import { Router } from 'express';
import multer from 'multer';

import FileController from '@app/controllers/FileController';
import multerConfig from '@config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', async (request, response) => {
  return response.json({ greeting: 'Hello world' });
});

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/images', FileController.index);
routes.delete('/files/:id', FileController.delete);

export default routes;
