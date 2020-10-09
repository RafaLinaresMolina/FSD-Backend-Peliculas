const router = require('express').Router();
const UserController = require('../controllers/actor');
const {Actor} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Actor);

const auth = require('../middleware/auth')

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:name', UserController.getByName);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, controller.delete);

module.exports = router;