const express = require('express');
const router = express.Router();
const PacientesController = require('../controllers/PacientesController');
const { Paciente, Documento, Estado } = require('../models');

// Vista: listado de pacientes
router.get('/vista', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({ include: [Documento, Estado] });
    res.render('pacientes/index', { pacientes });
  } catch (err) {
    res.status(500).send('Error al cargar la vista');
  }
});

// Vista: formulario para nuevo paciente
router.get('/nuevo', async (req, res) => {
  try {
    const documentos = await Documento.findAll();
    const estados = await Estado.findAll();
    res.render('pacientes/nuevo', {
      documentos,
      estados
    });
  } catch (err) {
    res.status(500).send('Error al cargar el formulario');
  }
});

// Crear paciente desde formulario
router.post('/crear', async (req, res) => {
  try {
    const { Paciente } = require('../models');
    const paciente = await Paciente.create(req.body);
    res.redirect('/pacientes/vista');
  } catch (err) {
    res.status(500).send('Error al crear paciente');
  }
});

// Vista: formulario para editar paciente
router.get('/:id/editar', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    const documentos = await Documento.findAll();
    const estados = await Estado.findAll();
    res.render('pacientes/editar', {
      paciente,
      documentos,
      estados
    });
  } catch (err) {
    res.status(500).send('Error al cargar edición');
  }
});

// Actualizar paciente desde formulario
router.post('/:id/actualizar', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    await paciente.update(req.body);
    res.redirect('/pacientes/vista');
  } catch (err) {
    res.status(500).send('Error al actualizar paciente');
  }
});

// Eliminar paciente
router.post('/:id/eliminar', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (paciente) await paciente.destroy();
    res.redirect('/pacientes/vista');
  } catch (err) {
    res.status(500).send('Error al eliminar paciente');
  }
});


// 🎯 Rutas API REST
router.get('/', PacientesController.listar);
router.get('/:id', PacientesController.buscarPorId);
router.post('/', PacientesController.crear);
router.put('/:id', PacientesController.actualizar);
router.delete('/:id', PacientesController.eliminar);

module.exports = router;
