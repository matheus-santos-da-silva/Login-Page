const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* helpers functions */
const checkAuth = require('../helpers/auth').checkAuth;


router.get('/logout', checkAuth, UserController.ShowLogoutInterface);
router.post('/logout', UserController.logout);

module.exports = router;