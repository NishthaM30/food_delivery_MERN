const { body } = require('express-validator');

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('role').optional().isIn(['admin', 'customer', 'manager']).withMessage('Invalid role')
]

const loginValidator = [
    body('email').notEmpty().withMessage('Email is required').isLength({ min: 3 })
        .withMessage("Email must be at least 3 characters long"),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters')
]

module.exports = { validateUser, loginValidator }