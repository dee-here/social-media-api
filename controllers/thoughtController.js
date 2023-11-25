const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().select("-__v");;
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getThought: async (req, res) => {
    try {
      const thought = await Thought.find({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "No Thought with this ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  addThought: async (req, res) => {
    try {
      // create a thought
      const thought = await Thought.create(req.body);
      const userId = req.body.userId;

      //push new thought into users thoughts array => update user
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No Thought with this ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "No thought with this ID" });
      }
      //remove the thought from users thoughts array
      const user = await User.findOneAndUpdate(
        { thoughts: thought._id },
        { $pull: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  addReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      const { reactionBody, username } = req.body;

      thought.reactions.addToSet({ reactionBody, username });

      const updatedThought = await thought.save();

      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
      console.log("reactionId : ", reactionId);

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
