const { Router } = require('express');
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/middleware');
const router = Router();


router.use(middleware.isLoggedAdmin);
router.get('/', adminController.dashboard);
router.get('/addUser', adminController.renderAddUserPage);
router.post('/addUser', adminController.handleAddUser);
router.get('/editUser/:id', adminController.renderEditUserPage);
router.post('/editUser', adminController.handleEditUser);
router.post('/blockUser', adminController.handleBlockUser);
router.post('/unblockUser', adminController.handleUnblockUser);


module.exports = router;