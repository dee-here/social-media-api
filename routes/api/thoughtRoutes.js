const router = require("express").Router();
const {
  getAllThoughts,
  getThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;