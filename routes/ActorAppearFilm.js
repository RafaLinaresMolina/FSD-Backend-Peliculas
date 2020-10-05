const router = require('express').Router();
const ActorAppearFilmController = require('../controllers/ActorAppearFilm');

router.get('/actorsfromfilms/:id', ActorAppearFilmController.getActorsFromFilmById);
router.get('/filmsfromactors/:id', ActorAppearFilmController.getFilmsByActorId);

module.exports = router;