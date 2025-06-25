const express = require('express'); 
const router = express.Router();
const MedicosController = require('../controllers/MedicosController');
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
    const { Especialidad, Documento, Estado } = require('../models');
    const especialidades = await Especialidad.findAll();
    const documentos = await Documento.findAll();
    const estados = await Estado.findAll();

    res.render('medicos/nuevo', {
        especialidades,
        documentos,
        estados
    });
});

// crear médico desde formulario
router.post('/crear', async (req, res) => {
    const { Medico } = require('../models');
    const { esp_ids, ...medicoData } = req.body;

    const medico = await Medico.create(medicoData);

    if (esp_ids) {
        // Si solo hay un ID, lo convertimos a array
        const espArray = Array.isArray(esp_ids) ? esp_ids : [esp_ids];
        await medico.addEspecialidades(espArray);
    }

    res.redirect('/medicos/vista');
});

// Vista: formulario para editar un médico
router.get('/:id/editar', async (req, res) => {
    const { Medico, Especialidad, Documento, Estado } = require('../models');
    const medico = await Medico.findByPk(req.params.id, {
        include: Especialidad
    });
    const especialidades = await Especialidad.findAll();
    const documentos = await Documento.findAll();
    const estados = await Estado.findAll();

    res.render('medicos/editar', {
        medico,
        especialidades,
        documentos,
        estados
    });
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

router.get('/', MedicosController.listar);
router.get('/:id', MedicosController.buscarPorId);
router.post('/', MedicosController.crear);
//router.post('/con-especialidades', MedicosController.createMedicoConEspecialidades);
//router.put('/:id/especialidades', MedicosController.updateEspecialidadesDelMedico);
router.put('/:id', MedicosController.actualizar);
router.delete('/:id', MedicosController.eliminar);

module.exports = router;