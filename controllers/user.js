const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../connectDB');

exports.creatUser = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const password = hash;
        const { firstName, lastName, email, gender, jobRole, department, address } = req.body;
        pool.query(`INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [firstName, lastName, email, password, gender, jobRole, department, address], (error, results) => {
            if (error) {
                return res.status(400).json({
                    error,
                })
            }
            const pwd = req.body.password;
            jwt.sign({ email, pwd }, 'reqbodypassword', (tokenError) => {
                if (tokenError) {
                    return res.status(500).json(tokenError);
                }
                const userToken = req.headers.authorization.split(' ')[1];
                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'User account successfully created',
                        token: userToken,
                        userId: results.rows[0].userid,
                    },
                })
            })
        })
    }).catch(
        (error) => {
          res.status(500).json({
            error,
          });
        },
    );
};

exports.signin = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    pool.query('SELECT email, password, userId FROM users WHERE email = $1', [user.email], (err, results) => {
        if (err) {
            throw err
        } else if (results.rowCount >= 1) {
            let resItem = '';
            const resArr = results.rows;
            resArr.forEach((item) => resItem = Object.values(item))
            bcrypt.compare(user.password, resItem[1]).then(
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
                                userId: resItem[2],
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