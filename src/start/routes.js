import { Router } from 'express';
import multer from 'multer';
import multerConfig from '~/config/multer';

import FileController from '~/app/controllers/FileController';

const Route = Router();
const upload = multer(multerConfig);

Route.post('/files', upload.single('file'), FileController.store);
Route.delete('/files/:id', FileController.delete);

export default Route;
