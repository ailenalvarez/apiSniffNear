const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
    let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. Token no proporcionado' });
  }
    //esto solo en insomnia
    token = token.split( ' ')[1];
    jwt.verify(token, secretKey, (error, decoded) => {
      if( error) {
      return res.status(403).json({ msg: 'Token invalido'})
      }
      // Retorno el id del usuario
      req.usuario = decoded.usuario;
      next();
      })
}

module.exports = verificarToken;
