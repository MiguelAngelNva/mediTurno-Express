import { fetchWithAuth } from '../../auth/authService';

const API_URL = 'http://localhost:4000/medicos';

export async function obtenerMedicos() {
  const res = await fetchWithAuth(API_URL);
  return res.json();
}

export async function crearMedico(medicos) {
  const res = await fetchWithAuth(API_URL, {
    method: 'POST',
    body: JSON.stringify(medicos)
  });
  return res.json();
}

export async function actualizarMedico(id, medicos) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(medicos)
  });
  return res.json();
}

export async function eliminarMedico(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (res.status === 204) return {}; // No Content, respuesta vacía aceptable

  return res.json(); // solo si hay cuerpo
}