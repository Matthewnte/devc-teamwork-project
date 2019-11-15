const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.post('/', auth, articleCtrl.createArticle);

module.exports = router;