const { estados } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await estados.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar estados', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await estados.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear estado', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const estado = await estados.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
    res.json(estado);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar estado', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const estado = await estados.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
    await estado.update(req.body);
    res.json(estado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const estado = await estados.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
    await estado.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar estado', detail: err.message });
  }
};
