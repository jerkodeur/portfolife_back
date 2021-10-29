require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

const routes = require('./routes/index');
const { getUserRole } = require('./services/verify');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors('*'));

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
