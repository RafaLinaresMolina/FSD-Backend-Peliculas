const router = require("express").Router();
const OrderController = require("../controllers/Order");

const auth = require("../middleware/auth");

router.get("/", auth.loggedRequired, auth.adminRequired, OrderController.getAll);
router.get("/:id", auth.loggedRequired, auth.adminRequired, OrderController.getById);
router.get("/user/:id", auth.loggedRequired, auth.adminRequired, OrderController.getByUserId);
router.post("/", auth.loggedRequired, auth.adminRequired, OrderController.create);
router.put("/:id", auth.loggedRequired, auth.adminRequired, OrderController.updateStatus);

module.exports = router;
