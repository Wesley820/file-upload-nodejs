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
<<<<<<< HEAD
routes.get('/images', FileController.index);
=======
routes.get('/files', FileController.index);
>>>>>>> b3fca1bd9fea86009f8724cde7ab2afba5a58167
routes.delete('/files/:id', FileController.delete);

export default routes;
