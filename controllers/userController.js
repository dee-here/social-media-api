const { User, Thought } = require("../models");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .populate("friends")
        .populate("thoughts")
        .select("-__v");
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .populate("friends")
        .populate("thoughts")
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No User with this ID" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  addUser: async (req, res) => {
    try {
      // create a user
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      // update a user
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No User with this ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      // Delete a user
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      //delete all deleted users thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      //delete all users saved in friend with that id
      await User.updateMany(
        { friends: user._id },
        { $pull: { friends: user._id } }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    //get userId and Friends user id and update thats users friends array
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No User with this ID" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  deleteFriend: async (req, res) => {
    //remove a friend from a user
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No User with this ID" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
