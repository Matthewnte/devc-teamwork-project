const express = require('express');

const router = express.Router();

const userRoutes = require('./user');
const gifRoutes = require('./gif');

router.use('/auth', userRoutes);
router.use('/gifs', gifRoutes);

module.exports = router;