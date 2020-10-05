const router = require('express').Router();
const genreController = require('../controllers/genre');

router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.get('/name/:name', genreController.getByName);
router.post('/', genreController.create);
router.put('/:id', genreController.update);
router.delete('/:id', genreController.delete);

module.exports = router;