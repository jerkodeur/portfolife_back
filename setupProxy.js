const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/projects', {
      target: 'https://portfolife.herokuapp.com',
      changeOrigin: true
    })
  );
};
