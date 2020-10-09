const router = require('express').Router();
const UserController = require('../controllers/user');

const {User} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(User);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.create);
router.put('/:id', controller.update);
router.delete('/:id', UserController.delete);

module.exports = router;