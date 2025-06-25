import { auth } from './firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

let userListener = null;

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export async function getValidToken() {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const token = await user.getIdToken(true);
    if (isTokenExpired(token)) {
      await logout();
      return null;
    }
    return token;
  } catch {
    await logout();
    return null;
  }
}

export function subscribeToAuthChanges(callback) {
  if (userListener) userListener(); // remove previous
  userListener = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      if (isTokenExpired(token)) {
        await logout();
        callback(null);
      } else {
        localStorage.setItem('jwt', token);
        callback(user);
      }
    } else {
      localStorage.removeItem('jwt');
      callback(null);
    }
  });
}

export async function logout() {
  await signOut(auth);
  localStorage.removeItem('jwt');
}

export async function fetchWithAuth(url, options = {}) {
  const token = await getValidToken();
  if (!token) {
    throw new Error('Sesión expirada o inválida');
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
