const router = require("express").Router();
const { authorized } = require("../auth/authmiddleware");
const Users = require("./usersmodel");


router.get("/", authorized,(req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:userId", authorized, (req, res, next) => {
  console.log(req.user);
  res.status(200).json(req.user);
});


router.patch("/:userId", authorized, (req, res, next) => {
  const { userId } = req.params;
  const changes = req.body;

  Users.updateUser(userId, changes)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Unable to find that user." });
      }
    })
    .catch(next);
});

router.delete("/:userId", authorized,(req, res, next) => {
  const { userId } = req.params;
  Users.deleteUser(userId)
    .then((user) => {
      if (user > 0) {
        res.status(200).json({ message: "The user has been deleted." });
      } else {
        res.status(404).jkson({ message: "The user could not be found." });
      }
    })
    .catch(next);
});

module.exports = router;
