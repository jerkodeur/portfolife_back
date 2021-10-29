const isDev = process.env.NODE_ENV === 'development';

// handle the errors
const requestErrors = (err, req, res, errStatus = 500) => {
  return res.status(errStatus).json({
    message:
      isDev || req.role === 'superadmin' ? err.message : 'Erreur Serveur',
    sql: isDev && err.sql
  });
};

module.exports = {
  requestErrors
};
