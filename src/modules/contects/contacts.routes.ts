import { isAuth } from '../../core/middlewares/auth.middleware';
import { ContactController } from './controllers/contect.controller';
import * as ContactValidator from './validators/contact.validator';
import { checkValidators } from '../../core/validators/check.validators';

const resourceName = 'contact';
const controllerClass = ContactController;

export default  [
  {
    method: 'get',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [isAuth],
    action: 'getContacts'
  },
  {
    method: 'post',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [ContactValidator, checkValidators],
    action: 'createContact',
  },
  {
    method: 'put',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [],
    action: 'updatedContact',
  },
  {
    method: 'patch',
    path: `/${resourceName}/`,
    controller: controllerClass,
    middlewares: [],
    action: 'disabledContact',
  }
];