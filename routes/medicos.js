const express = require('express'); 
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const { Medico, Especialidad } = require('../models');

// Vista: listado de médicos
router.get('/vista', async (req, res) => {
    try {
        const medicos = await Medico.findAll({ include: Especialidad });
        res.render('medicos/index', { medicos });
    } catch (err) {
        res.status(500).send('Error al cargar la vista');
    }
});

// Vista: formulario para crear nuevo médico
router.get('/nuevo', async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll();
        res.render('medicos/nuevo', { especialidades });
    } catch (err) {
        res.status(500).send('Error al cargar formulario');
    }
});

// crear médico desde formulario
router.post('/crear', async (req, res) => {
    try {
        const { esp_ids, ...medicoData } = req.body;
        const medico = await Medico.create(medicoData);
        if (esp_ids) await medico.addEspecialidades(esp_ids);
        res.redirect('/medicos/vista');
    } catch (err) {
        res.status(500).send('Error al crear médico');
    }
});

// Vista: formulario para editar un médico
router.get('/:id/editar', async (req, res) => {
    try {
        const medico = await Medico.findByPk(req.params.id, { include: Especialidad });
        const especialidades = await Especialidad.findAll();
        res.render('medicos/editar', { medico, especialidades });
    } catch (err) {
        res.status(500).send('Error al cargar formulario de edición');
    }
});

// actualizar médico desde formulario
router.post('/:id/actualizar', async (req, res) => {
    try {
        const { esp_ids, ...medicoData } = req.body;
        const medico = await Medico.findByPk(req.params.id);
        await medico.update(medicoData);
        await medico.setEspecialidades(esp_ids);
        res.redirect('/medicos/vista');
    } catch (err) {
        res.status(500).send('Error al actualizar médico');
    }
});

// eliminar médico
router.post('/:id/eliminar', async (req, res) => {
    try {
        const medico = await Medico.findByPk(req.params.id);
        if (medico) await medico.destroy();
        res.redirect('/medicos/vista');
    } catch (err) {
        res.status(500).send('Error al eliminar médico');
    }
});

router.get('/', medicoController.getMedicos);
router.get('/:id', medicoController.getMedicoById);
router.post('/', medicoController.createMedico);
router.post('/con-especialidades', medicoController.createMedicoConEspecialidades);
router.put('/:id/especialidades', medicoController.updateEspecialidadesDelMedico);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);

module.exports = router;