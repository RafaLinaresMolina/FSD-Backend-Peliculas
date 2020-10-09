const router = require("express").Router();
const OrderFilmController = require("../controllers/OrderFilm");

const auth = require("../middleware/auth");

router.get("/", OrderFilmController.getAll);
router.get("/:id", OrderFilmController.getByOrderId);
router.get("/user/:id", OrderFilmController.getByUserId);

module.exports = router;
