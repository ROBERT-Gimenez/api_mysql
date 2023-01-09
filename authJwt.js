const jwt = require("jsonwebtoken");
const config = require("./config/auth.config.js");
const {users} = require('./db');

// Clave secreta para firmar el JWT
const secret = 'BikeMaster22-secret-key';

// Crea el middleware
function verifyToken(req, res, next) {
  // Obtiene el token del encabezado de autorización
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'No token provided'
    });
  }

  // Verifica el token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Token is not valid'
      });
    }

    // Si el token es válido, guarda los datos de los reclamos en el objeto de solicitud
    // para que puedan ser utilizados en otras rutas
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;