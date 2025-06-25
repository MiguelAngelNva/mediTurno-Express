const { Cita, Paciente, Medico, Sede, TipoCita, Estado } = require('../models');

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [Paciente, Medico, Sede, TipoCita, Estado]
    });
    res.json(citas);
  } catch (err) {
    console.error(' ## Error al obtener citas:', err);
    res.status(500).json({
      error: 'Error al obtener citas',
      detail: err.message
    });
  }
};


exports.createCita = async (req, res) => {
  try {
//    console.log('Body recibido en POST /citas:', req.body); 
    const cita = await Cita.create(req.body);
    res.status(201).json(cita);
  } catch (err) {
    console.error('## Error al crear cita:', err);
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
