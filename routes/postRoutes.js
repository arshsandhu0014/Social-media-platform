const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.post('/posts', authenticate, postController.createPost);
router.delete('/posts/:id', authenticate, postController.deletePost);
router.get('/posts/:id', authenticate, postController.getPost);
router.post('/posts/:id/like', authenticate, postController.likePost);
router.post('/posts/:id/unlike', authenticate, postController.unlikePost);
//router.post('/posts/:id/comment', authenticate, postController.commentOnPost);
router.get('/all_posts', authenticate, postController.getAllPosts);

module.exports = router;
