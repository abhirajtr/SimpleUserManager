const { Router } = require('express');
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/middleware');
const router = Router();

router.use(middleware.isLoggedAdmin);
router.get('/', adminController.dashboard)

module.exports = router;