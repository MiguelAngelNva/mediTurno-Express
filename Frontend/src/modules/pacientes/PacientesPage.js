import React, { useEffect, useState } from 'react';
import { obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente } from './PacientesService';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({ 
    pac_primer_nombre: '', 
    pac_segundo_nombre: '', 
    pac_primer_apellido: '', 
    pac_segundo_apellido: '', 
    pac_telefono: '', 
    pac_correo:'',  
    doc_id:'', 
    est_id:'' });
  const [editandoId, setEditandoId] = useState(null);

  const cargar = async () => {
    try {
      console.log('Ejecutando cargar()');
      const data = await obtenerPacientes();
      console.log('Resultado final en cargar():', data);
      setPacientes(data);
    } catch (e) {
      console.error('## Fallo en cargar():', e);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (editandoId) {
      await actualizarPaciente(editandoId, form);
    } else {
      await crearPaciente(form);
    }
    setForm({ 
      pac_primer_nombre: '', 
      pac_segundo_nombre: '', 
      pac_primer_apellido: '', 
      pac_segundo_apellido: '', 
      pac_telefono: '', 
      pac_correo:'',  
      doc_id:'', 
      est_id:''
     });
    setEditandoId(null);
    cargar();
  };

  const editar = (pacientes) => {
    setForm(pacientes);
    setEditandoId(pacientes.pac_id);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar Paciente?')) {
      await eliminarPaciente(id);
      cargar();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Pacientes</h2>

      <form onSubmit={guardar} className="mb-4 row g-3">
        <div className="col-md-3">
          <input name="pac_primer_nombre" className="form-control" placeholder="Primer Nombre" value={form.pac_primer_nombre} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="pac_segundo_nombre" className="form-control" placeholder="Segundo Nombre" value={form.pac_segundo_nombre} onChange={manejarCambio} />
        </div>
        <div className="col-md-3">
          <input name="pac_primer_apellido" className="form-control" placeholder="Primer Apellido" value={form.pac_primer_apellido} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="pac_segundo_apellido" className="form-control" placeholder="Segundo Apellido" value={form.pac_segundo_apellido} onChange={manejarCambio} />
        </div>
        <div className="col-md-4">
          <input name="pac_telefono" className="form-control" placeholder="Teléfono" value={form.pac_telefono} onChange={manejarCambio} required />
        </div>
        <div className="col-md-4">
          <input name="pac_correo" type="email" className="form-control" placeholder="Correo" value={form.pac_correo} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="doc_id" className="form-control" placeholder="Documento ID" value={form.doc_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="est_id" className="form-control" placeholder="Estado ID" value={form.est_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-6">
          <button className="btn btn-success w-100">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </form>

      <table className="table table-bordered table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Documento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.pac_id}>
              <td>{p.pac_id}</td>
              <td>{p.pac_primer_nombre} {p.pac_segundo_nombre}</td>
              <td>{p.pac_primer_apellido} {p.pac_segundo_apellido}</td>
              <td>{p.pac_correo}</td>
              <td>{p.pac_telefono}</td>
              <td>{p.doc_id}</td>
              <td>{p.est_id}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(p)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.pac_id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}