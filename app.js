const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');

const app = express();

app.use(bodyParser.json());

console.log('Successfully connected to postresql')
app.use('/auth', userRoutes);
app.use('/gifs', gifRoutes);

module.exports = app;