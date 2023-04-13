const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userId } = req;

    const post = await Post.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const post = await Post.findOneAndDelete({ _id: id, user: userId });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate({
      path: 'comments',
      select: '-__v',
    });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { userId } = req;

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const post = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    const newComment = new Comment({
        text: comment,
        user: req.user.id,
        post: postId,
      });
  
      await newComment.save();
      post.comments.push(newComment._id);
      await post.save();
  
      res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: {
          id: newComment._id,
          text: newComment.text,
          user: newComment.user,
          post: newComment.post,
          createdAt: newComment.createdAt,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  exports.deleteComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
  
      if (!comment) {
        return res.status(404).json({ errors: [{ msg: 'Comment not found' }] });
      }
  
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
      }
  
      const post = await Post.findById(comment.post);
  
      post.comments = post.comments.filter((c) => c.toString() !== comment._id.toString());
      await post.save();
  
      await Comment.findByIdAndDelete(req.params.id);
  
      res.json({ success: true, message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

   
