import { isAuth } from '../../core/middlewares/auth.middleware';
import { UserController } from './controllers/user.controller';
import * as UserValidator from './validators/user.validator';
import { checkValidators } from '../../core/validators/check.validators';

const resourceName = 'user';
const controllerClass = UserController;

export default  [
  {
    method: 'get',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [isAuth],
    action: 'getUsers'
  },
  {
    method: 'post',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [UserValidator, checkValidators],
    action: 'createUser',
  },
];