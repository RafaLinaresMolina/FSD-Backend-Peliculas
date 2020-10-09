const router = require("express").Router();
const OrderController = require("../controllers/Order");

const auth = require("../middleware/auth");

router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.get("/user/:id", OrderController.getByUserId);
router.post("/", OrderController.create);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

module.exports = router;
