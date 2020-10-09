const router = require('express').Router();
const UserController = require('../controllers/actor');
const {Actor} = require("../models");
const GenericController = require('../controllers/generic');
const controller = new GenericController(Actor);

router.get('/', controller.getAll);
router.get('/:id', UserController.getById);
router.get('/name/:name', UserController.getByName);
router.post('/', UserController.create);
router.put('/:id', controller.update);
router.delete('/:id', UserController.delete);

module.exports = router;