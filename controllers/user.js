const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../connectDB');

exports.creatUser = (req, res) => {

};

exports.signin = (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    pool.query('SELECT email, password FROM users WHERE email = $1', [user.email], (err, results) => {
        if (err) {
            throw err
        } else if (results.rowCount >= 1) {
            let password = '';
            const emailArr = results.rows;
            emailArr.forEach((item) => password = Object.values(item))
            bcrypt.compare(user.password, password[1]).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Incorrect password',
                        })
                    }
                    jwt.sign({ user }, 'reqbodypassword', (error, token) => {
                        res.json({
                            status: 'success',
                            data: {
                                token,
                                userId: pool.query(`SELECT userId FROM users WHERE email = ${user.email}`),
                            },
                        })
                    })
                },
            ).catch(
                (error) => {
                    res.status(500).json({
                        error,
                    });
                },
            )
        } else {
            res.status(401).json({
                error: 'User not found',
            })
        }
    })
};