const express = require('express');
const bodyParser = require('body-parser');

const pool = require('./connectDB')
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

pool.connect()
.then(() => console.log('Connected successfully'))
.then(() => app.use('/auth', userRoutes))
.catch((error) => console.error(error))

module.exports = app;