import React, { useEffect, useState } from 'react';
import { obtenerMedicos, crearMedico, actualizarMedico, eliminarMedico } from './MedicosService';

export default function MedicosPage() {
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({ 
    med_primer_nombre: '', 
    med_segundo_nombre: '', 
    med_primer_apellido: '', 
    med_segundo_apellido: '', 
    med_telefono: '', 
    med_correo:'', 
    med_licencia: '', 
    doc_id:'', 
    est_id:'' });
  const [editandoId, setEditandoId] = useState(null);

  // const cargar = async () => {
  //   const data = await obtenerMedicos();
  //   setMedicos(data);
  // };
  const cargar = async () => {
    try {
  //    console.log('Ejecutando cargar()');
      const data = await obtenerMedicos();
  //    console.log('Resultado final en cargar():', data);
      setMedicos(data);
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
      await actualizarMedico(editandoId, form);
    } else {
      await crearMedico(form);
    }
    setForm({ 
      med_primer_nombre: '', 
      med_segundo_nombre: '', 
      med_primer_apellido: '', 
      med_segundo_apellido: '', 
      med_telefono: '', 
      med_correo:'', 
      med_licencia: '', 
      doc_id:'', 
      est_id:''
     });
    setEditandoId(null);
    cargar();
  };

  const editar = (medicos) => {
    setForm(medicos);
    setEditandoId(medicos.med_id);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar Médico?')) {
      await eliminarMedico(id);
      cargar();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Médicos</h2>

      <form onSubmit={guardar} className="mb-4 row g-3">
        <div className="col-md-3">
          <input name="med_primer_nombre" className="form-control" placeholder="Primer Nombre" value={form.med_primer_nombre} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="med_segundo_nombre" className="form-control" placeholder="Segundo Nombre" value={form.med_segundo_nombre} onChange={manejarCambio} />
        </div>
        <div className="col-md-3">
          <input name="med_primer_apellido" className="form-control" placeholder="Primer Apellido" value={form.med_primer_apellido} onChange={manejarCambio} required />
        </div>
        <div className="col-md-3">
          <input name="med_segundo_apellido" className="form-control" placeholder="Segundo Apellido" value={form.med_segundo_apellido} onChange={manejarCambio} />
        </div>
        <div className="col-md-4">
          <input name="med_telefono" className="form-control" placeholder="Teléfono" value={form.med_telefono} onChange={manejarCambio} required />
        </div>
        <div className="col-md-4">
          <input name="med_correo" type="email" className="form-control" placeholder="Correo" value={form.med_correo} onChange={manejarCambio} required />
        </div>
        <div className="col-md-4">
          <input name="med_licencia" className="form-control" placeholder="Licencia médica" value={form.med_licencia} onChange={manejarCambio} required />
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
            <th>Licencia</th>
            <th>Documento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map(m => (
            <tr key={m.med_id}>
              <td>{m.med_id}</td>
              <td>{m.med_primer_nombre} {m.med_segundo_nombre}</td>
              <td>{m.med_primer_apellido} {m.med_segundo_apellido}</td>
              <td>{m.med_correo}</td>
              <td>{m.med_telefono}</td>
              <td>{m.med_licencia}</td>
              <td>{m.doc_id}</td>
              <td>{m.est_id}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(m)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(m.med_id)}>
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