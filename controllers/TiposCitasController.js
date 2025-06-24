const { tipos_citas } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await tipos_citas.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar tipos de cita', detail: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await tipos_citas.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tipo de cita', detail: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const tipo = await tipos_citas.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar tipo de cita', detail: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const tipo = await tipos_citas.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    await tipo.update(req.body);
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tipo de cita', detail: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const tipo = await tipos_citas.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    await tipo.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tipo de cita', detail: err.message });
  }
};
