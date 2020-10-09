const router = require('express').Router();
const filmController = require('../controllers/film');

const {Film} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Film);

const auth = require("../middleware/auth");

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/title/:name', filmController.getFilmByName);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, controller.delete);

module.exports = router;