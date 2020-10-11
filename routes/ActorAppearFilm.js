const router = require('express').Router();
const ActorAppearFilmController = require('../controllers/ActorAppearFilm');

const auth = require("../middleware/auth");

router.get('/actorInFilms/:id', ActorAppearFilmController.getFilmsByActorId);
router.get('/filmActors/:id', ActorAppearFilmController.getActorsFromFilmById);
router.post('/actorsfromfilm/addactors', auth.loggedRequired, auth.adminRequired, ActorAppearFilmController.createActorFilm);
router.delete('/actorsfromfilm/removeactors', auth.loggedRequired, auth.adminRequired, ActorAppearFilmController.deleteActorsFilm);

ActorId
module.exports = router;