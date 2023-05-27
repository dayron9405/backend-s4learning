import { check } from 'express-validator';

module.exports = [
    check([
        'name',
        'email',
        'password'
    ]).not().isEmpty().withMessage('Campo requerido')
]