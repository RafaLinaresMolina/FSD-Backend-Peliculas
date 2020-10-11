const router = require("express").Router();
const profileController = require("../controllers/profile");
const { User } = require("../models");
const GenericController = require("../controllers/GenericController");
const controller = new GenericController(User);

const auth = require("../middleware/auth");

router.get("/", auth.loggedRequired, profileController.getProfileById);
router.put("/", auth.loggedRequired, profileController.update);
router.delete("/", auth.loggedRequired, profileController.delete);

module.exports = router;
