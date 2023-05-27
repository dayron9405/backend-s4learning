import { check } from 'express-validator';

module.exports = [
    check([
        'name',
        'phone',
        'address'
    ]).not().isEmpty().withMessage('Campo requerido')
]