import React, { useEffect, useState } from 'react';
import { obtenerMedicos, crearMedico, actualizarMedico, eliminarMedico } from './MedicosService';

export default function MedicosPage() {
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({ productname: '', supplierid: '', categoryid: '', unit: '', price: '' });
  const [editandoId, setEditandoId] = useState(null);

  const cargar = async () => {
    const data = await obtenerProductos();
    setProductos(data);
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
      await actualizarProducto(editandoId, form);
    } else {
      await crearProducto(form);
    }
    setForm({ productname: '', supplierid: '', categoryid: '', unit: '', price: '' });
    setEditandoId(null);
    cargar();
  };

  const editar = (producto) => {
    setForm(producto);
    setEditandoId(producto.productid);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      await eliminarProducto(id);
      cargar();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Artículos</h2>

      <form onSubmit={guardar} className="mb-4 row g-3">
        <div className="col-md-3">
          <input name="productname" className="form-control" placeholder="Nombre" value={form.productname} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="supplierid" className="form-control" placeholder="Proveedor ID" value={form.supplierid} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="categoryid" className="form-control" placeholder="Categoría ID" value={form.categoryid} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="unit" className="form-control" placeholder="Unidad" value={form.unit} onChange={manejarCambio} required />
        </div>
        <div className="col-md-2">
          <input name="price" type="number" step="0.01" className="form-control" placeholder="Precio" value={form.price} onChange={manejarCambio} required />
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </form>

      <table className="table table-bordered table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Proveedor</th><th>Categoría</th><th>Unidad</th><th>Precio</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.productid}>
              <td>{p.productid}</td>
              <td>{p.productname}</td>
              <td>{p.supplierid}</td>
              <td>{p.categoryid}</td>
              <td>{p.unit}</td>
              <td>${p.price}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(p)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.productid)}>
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