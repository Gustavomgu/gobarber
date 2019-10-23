import Router from 'express';

import multer from 'multer';
import UserController from './app/controllers/UserController';

import SessionsController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';

import ProviderController from './app/controllers/ProviderController';

import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionsController.store);

// Usando esse middleware aqui, ele só será usado nas rtoas que estão abaixo dessa linha
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

export default routes;
