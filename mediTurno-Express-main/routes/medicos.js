const express = require('express');
const router = express.Router();
const controller = require('../controllers/MedicosController')

router.get('/', controller.getMedicos);
router.post('/', controller.createMedico);
router.get('/:id', controller.getMedicoById);
router.put('/:id', controller.updateMedico);
router.delete('/:id', controller.deleteMedico);

module.exports = router;