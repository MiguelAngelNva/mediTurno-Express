const { documentos, ciudades } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await documentos.findAll({ include: ciudades });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar documentos', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await documentos.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear documento', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const item = await documentos.findByPk(req.params.id, { include: ciudades });
    if (!item) return res.status(404).json({ error: 'Documento no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar documento', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const item = await documentos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Documento no encontrado' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar documento', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const item = await documentos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Documento no encontrado' });
    await item.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar documento', detail: err.message });
  }
};
