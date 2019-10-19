import Router from 'express';

import UserController from './app/controllers/UserController';

import SessionsController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionsController.store);

// Usando esse middleware aqui, ele só será usado nas rtoas que estão abaixo dessa linha
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
