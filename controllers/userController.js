const User = require('../models/userModel.js');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Find the user by the user ID obtained from the JWT token
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { _id, name, email, followers, following } = user;

    return res.status(200).json({
      userId: _id,
      name,
      email,
      followers,
      following,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user being followed exists
    const userToFollow = await User.findById(id);

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already following the given user
    const currentUser = await User.findById(req.userId);
    if (currentUser.following.includes(id)) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Update the followers and following array for both users
    await User.findByIdAndUpdate(req.userId, { $push: { following: id } });
    await User.findByIdAndUpdate(id, { $push: { followers: req.userId } });

    return res.status(200).json({ message: 'Successfully followed user' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user being unfollowed exists
    const userToUnfollow = await User.findById(id);

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is not already following the given user
    const currentUser = await User.findById(req.userId);
    if (!currentUser.following.includes(id)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    // Update the followers and following array for both users
    await User.findByIdAndUpdate(req.userId, { $pull: { following: id } });
    await User.findByIdAndUpdate(id, { $pull: { followers: req.userId } });

    return res.status(200).json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
