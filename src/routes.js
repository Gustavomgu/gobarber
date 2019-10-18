import Router from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/teste', async (request, response) => {
  const user = await User.create({
    name: 'Gustavo',
    email: 'gustavomgu@hotmail.com',
    password_hash: '123456789',
  });

  response.json(user);
});

export default routes;
