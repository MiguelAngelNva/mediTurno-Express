import React, { useEffect, useState } from 'react';
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from './CitasService';

export default function CitasPage() {
  const [citas, setCitas] = useState([]);
  const [form, setForm] = useState({
    cit_fecha: '',
    cit_hora: '',
    tip_cit_id: '',
    med_id: '',
    pac_id: '',
    sed_id: '',
    est_id: ''
  });
  const [editandoId, setEditandoId] = useState(null);

 const cargar = async () => {
  try {
//    console.log('Ejecutando cargar()');
    const data = await obtenerCitas();
//    console.log('Resultado final en cargar():', data);
    setCitas(data);
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
      await actualizarCita(editandoId, form);
    } else {
      await crearCita(form);
    }
    setForm({
      cit_fecha: '',
      cit_hora: '',
      tip_cit_id: '',
      med_id: '',
      pac_id: '',
      sed_id: '',
      est_id: ''
    });
    setEditandoId(null);
    cargar();
  };

  const editar = (cita) => {
    setForm(cita);
    setEditandoId(cita.cit_id);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar cita?')) {
      await eliminarCita(id);
      cargar();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Citas</h2>

      <form onSubmit={guardar} className="mb-4 row g-3">
        <div className="col-md-2">
          <input type="date" name="cit_fecha" className="form-control" value={form.cit_fecha} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input type="time" name="cit_hora" className="form-control" value={form.cit_hora} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="tip_cit_id" className="form-control" placeholder="Tipo Cita ID" value={form.tip_cit_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="med_id" className="form-control" placeholder="Médico ID" value={form.med_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="pac_id" className="form-control" placeholder="Paciente ID" value={form.pac_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-1">
          <input name="sed_id" className="form-control" placeholder="Sede ID" value={form.sed_id} onChange={manejarCambio} required />
        </div>
        <div className="col-md-1">
          <input name="est_id" className="form-control" placeholder="Estado ID" value={form.est_id} onChange={manejarCambio} required />
        </div>
        <div className="col-12">
          <button className="btn btn-success w-100">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </form>

      <table className="table table-bordered table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Sede</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(c => (
            <tr key={c.cit_id}>
              <td>{c.cit_id}</td>
              <td>{c.cit_fecha}</td>
              <td>{c.cit_hora}</td>
              <td>{c.tip_cit_id}</td>
              <td>{c.med_id}</td>
              <td>{c.pac_id}</td>
              <td>{c.sed_id}</td>
              <td>{c.est_id}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(c)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(c.cit_id)}>
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
