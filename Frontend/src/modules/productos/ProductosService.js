import { fetchWithAuth } from '../../auth/authService';

const API_URL = 'http://localhost:4000/products';

export async function obtenerProductos() {
  const res = await fetchWithAuth(API_URL);
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetchWithAuth(API_URL, {
    method: 'POST',
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (res.status === 204) return {}; // No Content, respuesta vacía aceptable

  return res.json(); // solo si hay cuerpo
}

