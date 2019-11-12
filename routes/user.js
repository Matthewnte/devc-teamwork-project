const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/create-user', auth, admin, userCtrl.creatUser);
router.post('/signin', userCtrl.signin);

module.exports = router;
