const express = require('express');
const { registerUser, loginUser } = require('../Controllers/UsersController');
const { validateUser, loginValidator } = require('../Validators/userValidator');

const router = express.Router();

router.post('/register_user', registerUser, validateUser);
router.post('/login', loginValidator, loginUser);

module.exports = router;