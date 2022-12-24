const jwt = require("jsonwebtoken");
const config = require("./config/auth.config.js");
const {users} = require('./db');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

  isAdmin = (req, res, next) => {
    users.findByPk(req.userId).then(user => {

          if (user.rol_id === 2) {
            next();
            return;
          }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
  };

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;