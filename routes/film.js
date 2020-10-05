const router = require('express').Router();
const filmController = require('../controllers/film');

router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.get('/title/:name', filmController.getFilmByName);
router.post('/', filmController.create);
router.put('/:id', filmController.update);
router.delete('/:id', filmController.delete);

module.exports = router;