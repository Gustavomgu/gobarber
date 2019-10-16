const { Router } = require('express');

const routes = new Router();

routes.get('/teste', (request, response) => {
  return response.json({ message : "Funcionou"});
});

module.exports = routes;