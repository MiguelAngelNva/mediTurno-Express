import { fetchWithAuth } from '../../auth/authService';

const API_URL = 'http://localhost:4000/citas';

// export async function obtenerCitas() {
//   const res = await fetchWithAuth(API_URL);
//   const data = await res.json();
//     console.log('✅ Datos recibidos de /citas:', data);
//   return res.json();
// }

export async function obtenerCitas() {
  try {
    const res = await fetchWithAuth(API_URL); 
    const data = await res.json();
/*    console.log('✅ Datos recibidos de /citas:', data);*/

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ Error en obtenerCitas:', error);
    return [];
  }
}

// export async function crearCita(cita) {
//   const res = await fetchWithAuth(API_URL, {
//     method: 'POST',
//     body: JSON.stringify(cita),
//   });
//   return res.json();
// }

export async function crearCita(cita) {
  const res = await fetchWithAuth(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // 👈 Esto es lo que debe llegar al fetch real
    },
    body: JSON.stringify(cita)
  });

  return res.json();
}


export async function actualizarCita(id, cita) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cita),
  });
  return res.json();
}

export async function eliminarCita(id) {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (res.status === 204) return {};
  return res.json();
}
