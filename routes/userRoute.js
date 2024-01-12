const { Router } = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');
const router = Router();

router.use(middleware.isLoggedUser);
router.get('/', userController.dashboard);

module.exports = router;