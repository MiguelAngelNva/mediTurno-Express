const { Medico, Especialidad } = require('../models');

exports.getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll({
      include: Especialidad // si querés incluir la relación muchos a muchos
    });
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener médicos', detail: err.message });
  }
};

exports.createMedico = async (req, res) => {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear médico', detail: err.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id, {
      include: Especialidad
    });
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar médico', detail: err.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.update(req.body);
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar médico', detail: err.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar médico', detail: err.message });
  }
};
