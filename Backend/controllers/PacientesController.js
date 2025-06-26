const { Paciente, Documento, Estado } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await Paciente.findAll({ include: [Documento, Estado] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Paciente', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await Paciente.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear paciente', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
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

exports.actualizar = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    await paciente.update(req.body);
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar paciente', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    await paciente.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paciente', detail: err.message });
  }
};
