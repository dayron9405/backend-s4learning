import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
require('dotenv').config();
import { routesApp } from './routes';
// Swagger
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import { specsOptions } from "./swaggerOptions";
import mongoose from 'mongoose';

async function bootstrap() {
  // create express app
  const app = express();

  // Call midlewares
  app.use(
    cors({
      origin: true,
      methods: ['POST', 'PUT', 'OPTIONS', 'DELETE', 'GET', 'PATCH'],
      allowedHeaders: [
        'Authorization',
        'Origin',
        'Access-Control-Allow-Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'user-id',
        'x-request-public-key'
      ],
      credentials: false,
    })
  );
  //app.use(helmet());
  app.use(helmet({
    frameguard: false
  }))
  app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
  app.use((req, res, next) => {
    console.log(req.method.toUpperCase(), req.originalUrl);
    return next();
  });
  const URI_MD = process.env.URI_MD;
  const USER_MD = process.env.USER_MD;
  const PSS_MD = process.env.PSS_MD;
  const optionsMD = {
    // user: USER_MD,
    // pass: PSS_MD
  }
  mongoose.connect(`${URI_MD}`, optionsMD);
  const specs = swaggerJsdoc(specsOptions);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.get('/', (req, res) => {
    res.send('The server is running...');
  });
  routesApp(app);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

bootstrap();
