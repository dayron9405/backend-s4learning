import * as express from 'express';
const router = express.Router();
import { Application } from 'express-serve-static-core';

import usersRoutes from '../modules/users/users.routes';
import cursesRoutes from '../modules/contects/contacts.routes';

function configRoutes(app: Application, routesConfig: any) {
  routesConfig.forEach(route => {
    const controller = new route.controller();
    const controllerAction = controller[route.action].bind(controller);
    const middlewares = route.middlewares;
    function action(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const result = controllerAction(req, res, next);
      if (result instanceof Promise) {
        result.then(res => {
          if (!res.send || typeof res.send !== 'function') {
            res.json(res);
          }
        }).catch((err) => {
          res.json(err);
        });
      } else if (result.send && typeof result.send === 'function') {
        return result;
      } else {
        return res.json(result);
      }
    }
    if (middlewares && middlewares.length > 0) {
      app[route.method](route.path, route.middlewares, action);
    } else {
      app[route.method](route.path, action);
    }
  });
}

router.use((req, res, next) => {
  next();
});

export function routesApp(app: Application) {
  configRoutes(app, usersRoutes);
  configRoutes(app, cursesRoutes);
  app.use('/', router);
};