import { fetchWithAuth } from '../../auth/authService';

const API_URL = 'http://localhost:4000/pacientes';

export async function obtenerPacientes() {
  const res = await fetchWithAuth(API_URL);
  return res.json();
}

export async function crearPaciente(pacientes) {
  const res = await fetchWithAuth(API_URL, {
    method: 'POST',
    body: JSON.stringify(pacientes)
  });
  return res.json();
}

export async function actualizarPaciente(id, pacientes) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pacientes)
  });
  return res.json();
}

export async function eliminarPaciente(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (res.status === 204) return {}; // No Content, respuesta vacía aceptable

  return res.json(); // solo si hay cuerpo
}