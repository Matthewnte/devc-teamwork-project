const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'reqbodypassword');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.json({
                status: 'error',
                error: 'Not authorized',
            })
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            status: 'error',
            error: 'Not authorized',
        })
    }
};