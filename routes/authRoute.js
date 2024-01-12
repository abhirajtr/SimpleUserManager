const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController')


router.get('/', authController.renderLoginPage);
router.get('/signup', authController.renderSignupPage);
router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);
router.get('/logout', authController.handleLogout);

module.exports = router;