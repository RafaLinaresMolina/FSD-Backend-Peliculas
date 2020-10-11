const router = require('express').Router();
const genreController = require('../controllers/genre');

const {Genre} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Genre);

const auth = require("../middleware/auth");

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:name', genreController.getByName);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, controller.deactivate);
router.put('/reactivate/:id', auth.loggedRequired, auth.adminRequired, controller.reactivate);
router.post('/genrefilm/', auth.loggedRequired, auth.adminRequired, genreController.createGenereFilm);
router.delete('/genrefilm/delete/:FilmId', auth.loggedRequired, auth.adminRequired, genreController.deleteGenresOfFilm);

module.exports = router;