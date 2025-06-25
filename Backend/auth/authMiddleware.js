const admin = require('./firebase');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('Token no proporcionado');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Mostrar contenido del token en consola
    console.log('Token decodificado:', decodedToken);

    // Mostrar fecha de expiración legible
    if (decodedToken.exp) {
      const expDate = new Date(decodedToken.exp * 1000); // exp está en segundos
      console.log('Token expira en:', expDate.toLocaleString());
    }

    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Error al verificar token:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
