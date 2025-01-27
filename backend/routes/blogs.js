const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', roleMiddleware('admin'), blogController.createBlog);

module.exports = router;