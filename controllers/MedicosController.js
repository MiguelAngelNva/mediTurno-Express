const { Medico, Especialidad, Documento, Estado } = require('../models');

exports.getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll({
      include: [
        Especialidad,
        Documento,
        Estado
      ]
    });
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener médicos', detail: err.message });
  }
};

exports.createMedico = async (req, res) => {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear médico', detail: err.message });
  }
};

exports.createMedicoConEspecialidades = async (req, res) => {
  try {
    const { esp_ids, ...medicoData } = req.body;

    const medico = await Medico.create(medicoData);

    if (esp_ids && esp_ids.length > 0) {
      await medico.addEspecialidad(esp_ids); // Sequelize maneja la tabla intermedia
    }

    const medicoCompleto = await Medico.findByPk(medico.med_id, {
      include: [Especialidad, Documento, Estado]
    });

    res.status(201).json(medicoCompleto);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear médico con especialidades', detail: err.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id, {
      include: [Especialidad, Documento, Estado]
    });
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar médico', detail: err.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id, {
      include: [
        Especialidad,
        Documento,
        Estado
      ]
    });
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar médico', detail: err.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.update(req.body);
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar médico', detail: err.message });
  }
};

exports.updateEspecialidadesDelMedico = async (req, res) => {
  try {
    const { esp_ids } = req.body;

    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.setEspecialidades(esp_ids);

    const medicoActualizado = await Medico.findByPk(req.params.id, {
      include: Especialidad
    });

    res.json(medicoActualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar especialidades del médico', detail: err.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });

    await medico.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar médico', detail: err.message });
  }
};
