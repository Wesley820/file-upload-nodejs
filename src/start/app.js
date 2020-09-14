/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
|
| App is the class that constitutes the http server here are the
| middlewares and other configurations.
|
| To understand more about the express framework:
| https://expressjs.com/
|
*/

import './bootstrap';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import path from 'path';

import corsConfig from '@config/cors';
import bodyConfig from '@config/bodyParser';
import sentryConfig from '@config/sentry';

import 'express-async-errors';
import routes from './routes';
import '@database';

class App {
  constructor() {
    this.app = express();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(cors(corsConfig));
    this.app.use(bodyParser.json(bodyConfig));
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads')),
    );
    this.app.use(helmet());
  }

  routes() {
    this.app.use(routes);

    if (process.env.DSN_SENTRY) {
      this.app.use(Sentry.Handlers.errorHandler());
    }
  }

  exceptionHandler() {
    this.app.use(async (error, request, response, next) => {
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ) {
        const errors = await new Youch(error, request).toJSON();
        return response.status(500).json(errors);
      }

      return response.status(500).send('Internal Server Error');
    });
  }
}

export default new App().app;
