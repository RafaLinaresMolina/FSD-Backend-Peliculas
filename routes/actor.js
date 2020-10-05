const router = require('express').Router();
const UserController = require('../controllers/actor');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.get('/name/:name', UserController.getByName);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;