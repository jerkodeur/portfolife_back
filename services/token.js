const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const generateToken = (req, res) => {
  const token = jwt.sign(
    { id: req.id, pseudo: req.pseudo },
    process.env.SECRET,
    { algorithm: 'HS256' }
  );
  res.header('Access-Control-Expose-Headers', 'x-access-token');
  res.set('x-access-token', token);
  res.status(200).send({ auth: true });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(403).json(err);
      }
      // req.user = result;
      next();
    });
  } else {
    return res.status(400).send('No token provided');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
