const router = require('express').Router();
const filmController = require('../controllers/film');

const {Film} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Film);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/title/:name', filmController.getFilmByName);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;