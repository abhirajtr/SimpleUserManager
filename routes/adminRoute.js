const { Router } = require('express');
const adminController = require('../controllers/adminController');
const isLogged = require('../middleware/middleware');
const router = Router();

router.get('/',isLogged, adminController.dashboard)

module.exports = router;