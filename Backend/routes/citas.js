const express = require('express'); 
const router = express.Router();
const CitasController = require('../controllers/CitasController');
const { Cita, Paciente, Medico, Lugar, TipoCita, Estado } = require('../models');

// 🖥 Vista: listado de citas
router.get('/vista', async (req, res) => {
  try {
    const citas = await Cita.findAll({ include: [Paciente, Medico, Lugar, TipoCita, Estado] });
    res.render('citas/index', { citas });
  } catch (err) {
    res.status(500).send('Error al cargar la vista de citas');
  }
});

// 🖥 Vista: formulario para nueva cita
router.get('/nueva', async (req, res) => {
  const { Paciente, Medico, Lugar, TipoCita, Estado } = require('../models');
  const pacientes = await Paciente.findAll();
  const medicos = await Medico.findAll();
  const lugares = await Lugar.findAll();
  const tipos = await TipoCita.findAll();
  const estados = await Estado.findAll();

  res.render('citas/nueva', {
    pacientes,
    medicos,
    lugares,
    tipos,
    estados
  });
});

// 🖥 Procesar creación de cita desde formulario
router.post('/crear', async (req, res) => {
  const { Cita } = require('../models');
  await Cita.create(req.body);
  res.redirect('/citas/vista');
});

// 🖥 Vista: formulario para editar una cita
router.get('/:id/editar', async (req, res) => {
  const { Paciente, Medico, Lugar, TipoCita, Estado } = require('../models');
  const cita = await Cita.findByPk(req.params.id);
  const pacientes = await Paciente.findAll();
  const medicos = await Medico.findAll();
  const lugares = await Lugar.findAll();
  const tipos = await TipoCita.findAll();
  const estados = await Estado.findAll();

  res.render('citas/editar', {
    cita,
    pacientes,
    medicos,
    lugares,
    tipos,
    estados
  });
});

// 🖥 Procesar actualización de cita
router.post('/:id/actualizar', async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    await cita.update(req.body);
    res.redirect('/citas/vista');
  } catch (err) {
    res.status(500).send('Error al actualizar la cita');
  }
});

// 🖥 Procesar eliminación de cita
router.post('/:id/eliminar', async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (cita) await cita.destroy();
    res.redirect('/citas/vista');
  } catch (err) {
    res.status(500).send('Error al eliminar la cita');
  }
});


// 🔁 API REST
router.get('/', CitasController.getCitas);
router.get('/:id', CitasController.getCitaById);
router.post('/', CitasController.createCita);
router.put('/:id', CitasController.updateCita);
router.delete('/:id', CitasController.deleteCita);

module.exports = router;
