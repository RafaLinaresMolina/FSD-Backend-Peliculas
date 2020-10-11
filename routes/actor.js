const router = require('express').Router();
const ActorController = require('../controllers/actor');
const ActorAppearFilmController = require('../controllers/ActorAppearFilm');
const {Actor} = require("../models");

const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Actor);

const auth = require('../middleware/auth')

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:name', ActorController.getByName);
router.post('/', auth.loggedRequired, auth.adminRequired, controller.create);
router.put('/:id', auth.loggedRequired, auth.adminRequired, controller.update);
router.delete('/:id', auth.loggedRequired, auth.adminRequired, ActorController.delete);
router.put('/reactivate/:id', auth.loggedRequired, auth.adminRequired, ActorController.reactivate);
router.get('/actorInFilms/:id', ActorAppearFilmController.getFilmsByActorId);
router.get('/filmActors/:id', ActorAppearFilmController.getActorsFromFilmById);
router.post('/actorsfromfilm/addactors', auth.loggedRequired, auth.adminRequired, ActorAppearFilmController.createActorFilm);
router.delete('/actorsfromfilm/removeactors/:ActorId', auth.loggedRequired, auth.adminRequired, ActorAppearFilmController.deleteActorsFilm);

module.exports = router;