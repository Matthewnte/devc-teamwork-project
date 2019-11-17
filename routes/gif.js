const express = require('express');

const multer = require('../middleware/multer-config');

const router = express.Router();
const gifCtrl = require('../controllers/gif');
const auth = require('../middleware/auth');

router.post('/', auth, multer, gifCtrl.creatGif);
router.get('/:id', auth, gifCtrl.viewOneGif);
router.delete('/:id', auth, gifCtrl.deleteGif);
router.post('/:id/comment', auth, gifCtrl.commentOnColleguesGif);

module.exports = router;