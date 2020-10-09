const router = require('express').Router();
const UserController = require('../controllers/actor');
const {Actor} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Actor);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:name', UserController.getByName);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;