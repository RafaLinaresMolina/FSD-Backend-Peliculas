const router = require('express').Router();
const {Price} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Price);
const auth = require("../middleware/auth");

router.get('/', controller.getAll);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, controller.deactivate);
router.delete('/reactivate/:id', auth.loggedRequired, auth.adminRequired, controller.reactivate);

module.exports = router;