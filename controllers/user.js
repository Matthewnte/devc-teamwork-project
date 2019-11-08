const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../connectDB');

exports.creatUser = (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            res.status(403);
        }
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const newEmployee = {
                "firstName": "John",
                "lastName": "Doe",
                "email": "johndoe@gmail.com",
                "password": "123456",
                "gender": "male",
                "jobRole": "employee",
                "department": "hr",
                "address": "8 nvuigwe road",
            }
        })
    })
    res.status(201).json({
        status: 'success',
        data: {
            message: 'User account successfully created',
            token: 'randomstring',
            userId: 1,
        },
    })
};

exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY userId ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

exports.signin = (req, res, next) => {
    const user = {
        email: 'johndoe@gmail.com',
        password: '123456',
    }
    jwt.sign({ user }, user.password, (err, token) => {
        res.json({
            token,
        })
    })
};