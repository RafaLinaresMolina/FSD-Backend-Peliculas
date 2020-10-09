const router = require('express').Router();
const ActorAppearFilmController = require('../controllers/ActorAppearFilm');

router.get('/actorsfromfilm/:id', ActorAppearFilmController.getActorsFromFilmById);
router.get('/filmsplayedbyActor/:id', ActorAppearFilmController.getFilmsByActorId);

module.exports = router;