const { medicos, documentos, estados } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await medicos.findAll({ include: [documentos, estados] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar médicos', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await medicos.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear médico', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const medico = await medicos.findByPk(req.params.id, { include: [documentos, estados] });
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar médico', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const medico = await medicos.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    await medico.update(req.body);
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar médico', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const medico = await medicos.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    await medico.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar médico', detail: err.message });
  }
};
