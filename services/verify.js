const bcrypt = require('bcryptjs');
const connexion = require('../conf');

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
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }
      req.id = result[0].id;
      req.pseudo = result[0].pseudo;
      next();
    }
  );
};

module.exports = {
  verifyPassword
};
