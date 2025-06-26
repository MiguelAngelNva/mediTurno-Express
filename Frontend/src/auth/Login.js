
// // src/Login.js
// import React, { useState } from 'react';


// import { auth, googleProvider } from './firebaseConfig';
// import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [esRegistro, setEsRegistro] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleCorreoPassword = async (e) => {
//     e.preventDefault();
//     try {
//       if (esRegistro) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigate('/pedidos'); // O menú principal
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGmailLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate('/pedidos'); // O menú principal
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const cerrarSesion = async () => {
//     await signOut(auth);
//     navigate('/');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow">
//             <h2 className="text-center mb-4">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleCorreoPassword}>
//               <div className="form-group mb-3">
//                 <label>Correo electrónico</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label>Contraseña</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-100 mb-2">
//                 {esRegistro ? 'Registrarse' : 'Ingresar'}
//               </button>
//             </form>

//             <button onClick={handleGmailLogin} className="btn btn-outline-danger w-100 mb-3">
//               <i className="bi bi-google"></i> Ingresar con Gmail
//             </button>

//             <div className="text-center">
//               <button className="btn btn-link" onClick={() => setEsRegistro(!esRegistro)}>
//                 {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
//               </button>
//             </div>

//             <div className="text-center mt-2">
//               <button onClick={cerrarSesion} className="btn btn-secondary">
//                 Salir
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { auth, googleProvider } from './firebaseConfig';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
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
      navigate('/pedidos');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGmailLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/pedidos');
    } catch (err) {
      setError(err.message);
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#00b894' }}>
      <div className="card p-4 shadow-lg animate__animated animate__fadeIn" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-4">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleCorreoPassword}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            <i className="bi bi-envelope-fill me-2"></i>
            {esRegistro ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <button onClick={handleGmailLogin} className="btn btn-outline-danger w-100 mb-3">
          <i className="bi bi-google me-2"></i> Ingresar con Gmail
        </button>

        <div className="text-center">
          <button className="btn btn-link" onClick={() => setEsRegistro(!esRegistro)}>
            {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>

        <div className="text-center mt-2">
          <button onClick={cerrarSesion} className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

