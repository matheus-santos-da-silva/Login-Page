const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/register', UserController.showRegisterInterface);
router.post('/register', UserController.register);
router.get('/login', UserController.showLoginInterface);
router.post('/login', UserController.login);

module.exports = router;