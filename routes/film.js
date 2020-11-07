const router = require('express').Router();
const filmController = require('../controllers/film');

const {Film} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Film);

const auth = require("../middleware/auth");

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/film/fulldata/', filmController.getAllFilms);
router.get('/supersearch/value/:name', filmController.getAllFilmsBySuperSearch)
router.get('/title/:name', filmController.getFilmByName);
router.get('/genre/name/:name', filmController.getFilmByGenreName);
router.get('/genre/:id', filmController.getFilmByGenreId);
router.get('/actor/name/:name', filmController.getFilmByActorName);
router.get('/actor/:id', filmController.getFilmByActorId);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, filmController.delete);
router.put('/reactivate/:id', auth.loggedRequired, auth.adminRequired, filmController.reactivate);


module.exports = router;