const { Especialidad } = require('../models');

exports.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener especialidades', detail: err.message });
  }
};

exports.createEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.create(req.body);
    res.status(201).json(especialidad);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear especialidad', detail: err.message });
  }
};

exports.updateEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) return res.status(404).json({ error: 'Especialidad no encontrada' });

    await especialidad.update(req.body);
    res.json(especialidad);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar especialidad', detail: err.message });
  }
};

exports.deleteEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) return res.status(404).json({ error: 'Especialidad no encontrada' });

    await especialidad.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar especialidad', detail: err.message });
  }
};
