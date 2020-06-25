const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller');

router.route('/login').post(UserController.login);

router.route('/signup').post(UserController.signUp);

module.exports = router;
