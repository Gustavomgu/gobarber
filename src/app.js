import 'dotenv/config';
// Só é possivel usar a sintaxe import por usar a biblioteca sucrase
import express from 'express';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import path from 'path';

// Tem que ser importado antes das rotas pois vai captar erros das rotas
import 'express-async-errors';
import routes from './routes';
import ConfigSentry from './config/sentry';

import './database/index';

class App {
  constructor() {
    this.server = express();

    Sentry.init(ConfigSentry);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Middlewares com quatro parametros são entendidos automaticamente como tratamento de exceção pelo express
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
