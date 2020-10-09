const router = require('express').Router();
const genreController = require('../controllers/genre');

const {Genre} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Genre);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:name', genreController.getByName);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;