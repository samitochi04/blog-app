const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/me', authMiddleware, userController.getUserInfo);


router.put('/me', authMiddleware, userController.updateUserInfo);


router.get('/', authMiddleware, roleMiddleware('admin'), userController.getAllUsers);


router.delete('/:id', authMiddleware, roleMiddleware('admin'), userController.deleteUser);

module.exports = router;
