const router = require("express").Router();
const OrderController = require("../controllers/Order");

const auth = require("../middleware/auth");

router.get("/", auth.loggedRequired, auth.adminRequired, OrderController.getAll);
router.get("/:id", auth.loggedRequired, auth.adminRequired, OrderController.getById);
router.get("/user/:id", auth.loggedRequired, auth.adminRequired, OrderController.getByUserId);
router.post("/", auth.loggedRequired, auth.adminRequired, OrderController.create);
router.put("/update/:id/status/:status", auth.loggedRequired, auth.adminRequired, OrderController.update);

module.exports = router;
