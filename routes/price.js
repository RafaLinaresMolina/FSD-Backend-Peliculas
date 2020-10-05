const router = require('express').Router();
const priceController = require('../controllers/price');

router.get('/', priceController.getAll);
router.post('/', priceController.create);
router.put('/:id', priceController.update);
router.delete('/:id', priceController.delete);

module.exports = router;