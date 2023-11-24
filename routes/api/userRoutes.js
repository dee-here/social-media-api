const router = require("express").Router();
const {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} = require("../../controllers/userController");

// /api/users
router.route("/").post(addUser).get(getAllUsers);

// /api/users/:userId
router.route("/:userId")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

//add and remove a friends from user
router.route("/api/users/:userId/friends/:friendId");

module.exports = router;
