const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({
            status: 'error',
            error: 'Not authorized',
        })
    }
}

router.post('/create-user', verifyToken, userCtrl.creatUser);
router.post('/login', userCtrl.signin);
router.get('/', userCtrl.getUsers);

module.exports = router;
