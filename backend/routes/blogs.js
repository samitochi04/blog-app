const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Routes
router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);
router.put('/:id', roleMiddleware('admin'), blogController.updateBlog);
router.delete('/:id', roleMiddleware('admin'), blogController.deleteBlog);

module.exports = router;
router.post('/', roleMiddleware('admin'), blogController.createBlog);

module.exports = router;