const router = require("express").Router();
const OrderController = require("../controllers/Order");

const auth = require("../middleware/auth");

router.get(
  "/",
  auth.loggedRequired,
  auth.adminRequired,
  OrderController.getAll
);
router.get(
  "/:id",
  auth.loggedRequired,
  auth.adminRequired,
  OrderController.getById
);
router.post(
  "/",
  auth.loggedRequired,
  auth.adminRequired,
  OrderController.create
);
router.put("/:id", auth.loggedRequired, auth.adminRequired, controller.update);
router.delete(
  "/:id",
  auth.loggedRequired,
  auth.adminRequired,
  OrderController.delete
);

module.exports = router;
