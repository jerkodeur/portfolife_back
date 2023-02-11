require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

const routes = require('./routes/index');
const { getUserRole } = require('./services/verify');

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS, DELETE'
  );

  if (req.method === 'OPTIONS') {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
  }

  next();
});

app.all('*', getUserRole);
app.use('/admins', routes.admins);
app.use('/projects', routes.projects);
app.use('/technos', routes.technos);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...');
  } else {
    console.log(`server is listening on port ${process.env.PORT}`);
  }
});
