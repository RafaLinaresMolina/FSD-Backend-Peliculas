const router = require("express").Router();
const UserController = require("../controllers/user");
const { User } = require("../models");
const GenericController = require("../controllers/GenericController");
const controller = new GenericController(User);

const auth = require("../middleware/auth");

router.get(
  "/",
  auth.loggedRequired,
  auth.adminRequired,
  UserController.getAllUsers
);
router.get(
  "/:id",
  auth.loggedRequired,
  auth.adminRequired,
  UserController.getUserById
);
router.post(
  "/",
  auth.loggedRequired,
  auth.adminRequired,
  UserController.create
);
router.put("/:id", auth.loggedRequired, auth.adminRequired, controller.update);
router.delete(
  "/:id",
  auth.loggedRequired,
  auth.adminRequired,
  UserController.delete
);

module.exports = router;
