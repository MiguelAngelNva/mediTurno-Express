
// src/Login.js
import React, { useState } from 'react';


import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCorreoPassword = async (e) => {
    e.preventDefault();
    try {
      if (esRegistro) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/pedidos'); // O menú principal
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGmailLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/pedidos'); // O menú principal
    } catch (err) {
      setError(err.message);
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleCorreoPassword}>
              <div className="form-group mb-3">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2">
                {esRegistro ? 'Registrarse' : 'Ingresar'}
              </button>
            </form>

            <button onClick={handleGmailLogin} className="btn btn-outline-danger w-100 mb-3">
              <i className="bi bi-google"></i> Ingresar con Gmail
            </button>

            <div className="text-center">
              <button className="btn btn-link" onClick={() => setEsRegistro(!esRegistro)}>
                {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>

            <div className="text-center mt-2">
              <button onClick={cerrarSesion} className="btn btn-secondary">
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
