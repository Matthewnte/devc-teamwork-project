const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
const articleRoutes = require('./routes/article')

const app = express();

app.use(bodyParser.json());

app.use('/auth', userRoutes);
app.use('/gifs', gifRoutes);
app.use('/articles', articleRoutes);

module.exports = app;