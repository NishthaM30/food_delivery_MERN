const { body } = require('express-validator');

const validateMenuItem = [
    body('restaurant_id').notEmpty().withMessage('Restaurant ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number '),
    body('image').optional().isURL().withMessage('Image URL must be valid'),
];

module.exports = { validateMenuItem }