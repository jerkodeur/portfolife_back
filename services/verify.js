const bcrypt = require('bcryptjs');
const connexion = require('../conf');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const verifyPassword = (req, res, next) => {
  const { email, password } = req.body;
  connexion.query(
    'SELECT * from admin WHERE email = ?',
    email,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          sql: err.sql
        });
      }
      if (!result[0] || !bcrypt.compareSync(password, result[0].password)) {
        return res
          .status(401)
          .json({ message: `Identifiants incorrects ${email} ${password}` });
      }
      req.id = result[0].id;
      req.pseudo = result[0].pseudo;
      req.role = result[0].role;
      next();
    }
  );
};

const getUserRole = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, result) => {
      if (err) return console.log(err);
      req.role = result.role;
    });
  }
  next();
};

module.exports = {
  getUserRole,
  verifyPassword
};
