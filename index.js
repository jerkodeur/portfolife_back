require('dotenv').config();

const cors = require('cors');
const proxy = require('express-http-proxy');
const express = require('express');

const app = express();

const routes = require('./routes/index');
const { getUserRole } = require('./services/verify');

app.use(express.urlencoded({ extended: true }));

app.use('/proxy', proxy('www.portfolife.herokuapp.com'));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS, DELETE'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', '*');
  }

  next();
});

app.all('*', cors(), getUserRole);
app.use('/admins', cors(), routes.admins);
app.use('/projects', cors(), routes.projects);
app.use('/technos', cors(), routes.technos);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...');
  } else {
    console.log(`server is listening on port ${process.env.PORT}`);
  }
});
