const router = require('express').Router();

const {Price} = require("../models");
const GenericController = require('../controllers/GenericController');
const controller = new GenericController(Price);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;