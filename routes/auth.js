const router = require("express").Router();
const AuthController = require("../controllers/authController");

const auth = require("../middleware/auth");

router.post("/signup/", AuthController.signup);
router.post("/login/", AuthController.login);
router.get("/confirm/:token", AuthController.confirm);
router.get("/logged", auth.loggedRequired, AuthController.getUserByToken)

module.exports = router;
