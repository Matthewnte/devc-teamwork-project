const express = require('express');

const router = express.Router();
const gifCtrl = require('../controllers/gif')

router.post('/', gifCtrl.creatGif);
router.post('/:id', gifCtrl.deleteGif);
router.post('/:id/comment', gifCtrl.commentOnGif);

module.exports = router;