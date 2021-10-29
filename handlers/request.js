const isDev = process.env.NODE_ENV === 'development';

// handle the errors
const requestErrors = (err, req, res, errStatus = 500) => {
  const admin = isDev || req.role === 'superadmin';
  return res.status(errStatus).json({
    message: admin ? err.message : 'Erreur Serveur',
    sql: admin && err.sql
  });
};

module.exports = {
  requestErrors
};
