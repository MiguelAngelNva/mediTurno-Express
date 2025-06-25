// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import Login from '../auth/Login';
// import ProductosPage from '../modules/productos/ProductosPage';
// import { subscribeToAuthChanges, logout } from '../auth/authService';
// import { auth } from '../auth/firebaseConfig'; // Asegúrate de importar esto

// function Menu({ onLogout }) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//       <div className="container">
//         <Link className="navbar-brand" to="/articulos">Mi App</Link>
//         <div>
//           <Link className="btn btn-outline-light me-2" to="/articulos">Artículos</Link>
//           <button className="btn btn-danger" onClick={onLogout}>Salir</button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function AppRoutes({ usuario, onLogout }) {
//   return (
//     <>
//       {usuario && <Menu onLogout={onLogout} />}
//       <Routes>
//         <Route path="/" element={!usuario ? <Login /> : <Navigate to="/articulos" />} />
//         <Route path="/articulos" element={usuario ? <ProductosPage /> : <Navigate to="/" />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   const [usuario, setUsuario] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let tokenTimer = null;

//     const unsubscribe = subscribeToAuthChanges(async (user) => {
//       setUsuario(user);
//       setLoading(false);

//       if (user) {
//         const tokenResult = await user.getIdTokenResult();
//         const expTime = new Date(tokenResult.expirationTime).getTime();
//         const now = Date.now();
//         const remainingTime = expTime - now;

//         console.log(`Token expira en ${Math.floor(remainingTime / 1000)} segundos`);

//         // Programar cierre de sesión
//         tokenTimer = setTimeout(async () => {
//           alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
//           await logout();
//           setUsuario(null);
//           window.location.href = '/';
//         }, remainingTime);
//       }
//     });

//     return () => {
//       unsubscribe(); // limpiar suscripción
//       clearTimeout(tokenTimer); // limpiar temporizador
//     };
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     setUsuario(null);
//   };

//   if (loading) return <div className="text-center mt-5">Cargando...</div>;

//   return (
//     <Router>
//       <AppRoutes usuario={usuario} onLogout={handleLogout} />
//     </Router>
//   );
// }

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from '../auth/Login';
import CitasPage from '../modules/citas/CitasPage'; // ✅ Asegúrate que la ruta sea correcta
import { subscribeToAuthChanges, logout } from '../auth/authService';
import { auth } from '../auth/firebaseConfig';

function Menu({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/citas">MediTurno</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/citas">Citas</Link>
          <button className="btn btn-danger" onClick={onLogout}>Salir</button>
        </div>
      </div>
    </nav>
  );
}

function AppRoutes({ usuario, onLogout }) {
  return (
    <>
      {usuario && <Menu onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={!usuario ? <Login /> : <Navigate to="/citas" />} />
        <Route path="/citas" element={usuario ? <CitasPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenTimer = null;

    const unsubscribe = subscribeToAuthChanges(async (user) => {
      setUsuario(user);
      setLoading(false);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const expTime = new Date(tokenResult.expirationTime).getTime();
        const now = Date.now();
        const remainingTime = expTime - now;

        console.log(`Token expira en ${Math.floor(remainingTime / 1000)} segundos`);

        tokenTimer = setTimeout(async () => {
          alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          await logout();
          setUsuario(null);
          window.location.href = '/';
        }, remainingTime);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(tokenTimer);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUsuario(null);
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <Router>
      <AppRoutes usuario={usuario} onLogout={handleLogout} />
    </Router>
  );
}

