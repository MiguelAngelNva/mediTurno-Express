const { ciudades } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await ciudades.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar ciudades', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nueva = await ciudades.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ciudad', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const ciudad = await ciudades.findByPk(req.params.id);
    if (!ciudad) return res.status(404).json({ error: 'Ciudad no encontrada' });
    res.json(ciudad);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar ciudad', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const ciudad = await ciudades.findByPk(req.params.id);
    if (!ciudad) return res.status(404).json({ error: 'Ciudad no encontrada' });
    await ciudad.update(req.body);
    res.json(ciudad);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar ciudad', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const ciudad = await ciudades.findByPk(req.params.id);
    if (!ciudad) return res.status(404).json({ error: 'Ciudad no encontrada' });
    await ciudad.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar ciudad', detail: err.message });
  }
};
