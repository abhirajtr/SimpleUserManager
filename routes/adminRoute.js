const { Router } = require('express');
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/middleware');
const router = Router();

router.get('/editUser/:id', adminController.renderEditUserPage);
router.post('/editUser', adminController.handleEditUser);
router.use(middleware.isLoggedAdmin);
router.get('/', adminController.dashboard);
router.get('/addUser', adminController.renderAddUserPage);
router.post('/addUser', adminController.handleAddUser);


module.exports = router;