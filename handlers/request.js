const isDev = process.env.NODE_ENV === 'development';

// handle the errors
const requestErrors = (req, err, res, errStatus = 500) => {
  const admin = isDev || req.role === 'superadmin';
  console.log(req.role, admin, process.env.NODE_ENV);
  return res.status(errStatus).json({
    message: err.message,
    sql: err.sql
  });
};

module.exports = {
  requestErrors
};
