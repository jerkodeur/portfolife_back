const isDev = process.env.NODE_ENV === 'development';

// handle the errors
const requestErrors = (req, err, res, errStatus = 500) => {
  const admin = isDev || req.role === 'superadmin';
  return res.status(errStatus).json({
    message: admin ? err.message : 'Erreur serveur.',
    sql: admin ? err.sql : 'Erreur sql'
  });
};

module.exports = {
  requestErrors
};
