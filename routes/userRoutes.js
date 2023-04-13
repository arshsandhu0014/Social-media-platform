const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

// Get user profile
router.get('/user', authenticate, userController.getUserProfile);

// Follow a user
router.post('/follow/:id', authenticate, userController.followUser);

// Unfollow a user
router.post('/unfollow/:id', authenticate, userController.unfollowUser);

module.exports = router;
