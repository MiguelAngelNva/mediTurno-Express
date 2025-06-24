const { Paciente, Documento, Estado } = require('../models');

exports.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      include: [Documento, Estado]
    });
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pacientes', detail: err.message });
  }
};

exports.createPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear paciente', detail: err.message });
  }
};

exports.getPacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id, {
      include: [Documento, Estado]
    });
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar paciente', detail: err.message });
  }
};

exports.updatePaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.update(req.body);
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar paciente', detail: err.message });
  }
};

exports.deletePaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paciente', detail: err.message });
  }
};
