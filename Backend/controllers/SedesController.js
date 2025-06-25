const { sedes, ciudades, estados } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await sedes.findAll({ include: [ciudades, estados] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar sedes', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nueva = await sedes.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear sede', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const sede = await sedes.findByPk(req.params.id, { include: [ciudades, estados] });
    if (!sede) return res.status(404).json({ error: 'Sede no encontrada' });
    res.json(sede);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar sede', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const sede = await sedes.findByPk(req.params.id);
    if (!sede) return res.status(404).json({ error: 'Sede no encontrada' });
    await sede.update(req.body);
    res.json(sede);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar sede', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const sede = await sedes.findByPk(req.params.id);
    if (!sede) return res.status(404).json({ error: 'Sede no encontrada' });
    await sede.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar sede', detail: err.message });
  }
};
