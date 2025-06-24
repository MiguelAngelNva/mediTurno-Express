const { Medico } = require('../models');

exports.getMedicos = async (req, res) => {
  const medicos = await Medico.findAll();
  res.json(medicos);
};

exports.createMedico = async (req, res) => {
  const medico = await Medico.create(req.body);
  res.status(201).json(medico);
};

exports.getMedicoById = async (req, res) => {
  const medico = await Medico.findByPk(req.params.id);
  if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
  res.json(medico);
};

exports.updateMedico = async (req, res) => {
  const medico = await Medico.findByPk(req.params.id);
  if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
  await medico.update(req.body);
  res.json(medico);
};

exports.deleteMedico = async (req, res) => {
  const medico = await Medico.findByPk(req.params.id);
  if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
  await medico.destroy();
  res.status(204).send();
};