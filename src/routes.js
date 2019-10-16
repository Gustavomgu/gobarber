import Router from 'express';

const routes = new Router();

routes.get('/teste', (request, response) => {
  return response.json({ message : "Hello bootcamp 2!"});
});

export default routes;