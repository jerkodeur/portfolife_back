require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

const routes = require('./routes/index');
const { getUserRole } = require('./services/verify');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Accept, Content-Type',
    'Access-Control-Allow-Origin'
  ]
};

app.use('*', cors(corsOptions));

app.options('*', cors(corsOptions));
app.all('*', cors(corsOptions), getUserRole);
app.use('/admins', cors(corsOptions), routes.admins);
app.use('/projects', cors(corsOptions), routes.projects);
app.use('/technos', cors(corsOptions), routes.technos);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...');
  } else {
    console.log(`server is listening on port ${process.env.PORT}`);
  }
});
