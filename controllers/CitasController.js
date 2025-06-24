const { Cita, Paciente, Medico, Lugar } = require('../models');

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [Paciente, Medico, Lugar]
    });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener citas', detail: err.message });
  }
};

exports.createCita = async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    res.status(201).json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cita', detail: err.message });
  }
};

exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id, {
      include: [Paciente, Medico, Lugar]
    });
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar cita', detail: err.message });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    await cita.update(req.body);
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cita', detail: err.message });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    await cita.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cita', detail: err.message });
  }
};
