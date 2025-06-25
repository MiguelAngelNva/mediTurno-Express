const { notificadores, citas } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await notificadores.findAll({ include: citas });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar notificadores', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await notificadores.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear notificador', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const item = await notificadores.findByPk(req.params.id, { include: citas });
    if (!item) return res.status(404).json({ error: 'Notificador no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar notificador', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const item = await notificadores.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Notificador no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar notificador', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const item = await notificadores.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Notificador no encontrado' });
    await item.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar notificador', detail: err.message });
  }
};
