const router = require("express").Router();
const {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").post(addUser).get(getAllUsers);

// /api/users/:userId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

//add and remove a friends from user
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
