const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const pool = require('../connectDB');

cloudinary.config({
    cloud_name: 'daygucgkt',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.creatGif = (req, res) => {
    cloudinary.uploader.upload(req.body.image, (err, results) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'reqbodypassword');
        const { email } = decodedToken.user;
        pool.query('SELECT userId FROM users WHERE email = $1', [email], (userIdError, userResult) => {
            const userId = userResult.rows[0].userid;
            const { title } = req.body;
            pool.query('INSERT INTO gifs (user_id, title, image_url) VALUES ($1, $2, $3) RETURNING *', [userId, title, results.url], (error, gifResults) => {
                if (error) {
                    return res.status(400).json({
                        error,
                    })
                }
                res.status(201).json({
                    status: 'success',
                    data: {
                        gifId: gifResults.rows[0].gif_id,
                        message: 'GIF image successfully posted',
                        createdOn: gifResults.rows[0].publish_date,
                        title,
                        imageUrl: results.url,
                    },
                })
            })
        })
    })
};

exports.deleteGif = (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'reqbodypassword');
    const { email } = decodedToken.user;
    pool.query('SELECT userId FROM users WHERE email = $1', [email], (userIdError, userResult) => {
        const userId = userResult.rows[0].userid;
        pool.query('SELECT user_id FROM gifs WHERE gif_id = $1', [id], (rowError, rowResult) => {
            const rowUserId = rowResult.rows[0].user_id;
            if (userId === rowUserId) {
                pool.query('DELETE FROM gifs WHERE gif_id = $1', [id], (error) => {
                    if (error) {
                        return res.status(400).json({
                            error,
                        })
                    }
                    res.status(201).json({
                        data: {
                            message: 'gif post successfully deleted',
                        },
                    })
                })
            } else {
                res.status(401).json({
                    error: 'Only owner of post can delete post',
                })
            }
        })
    })
};

exports.commentOnColleguesGif = (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'reqbodypassword');
    const { email } = decodedToken.user;
    const { comment } = req.body;
    pool.query('SELECT userId FROM users WHERE email = $1', [email], (userError, userResult) => {
        const userId = userResult.rows[0].userid;
        pool.query('SELECT title FROM gifs WHERE gif_id = $1', [id], (gifError, gifResults) => {
            const gifTitle = gifResults.rows[0].title;
            pool.query('INSERT INTO gif_comments (user_id, body, gif_id) VALUES ($1, $2, $3) RETURNING *', [userId, comment, id], (err, results) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    })
                }
                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'comment successfully created',
                        createdOn: results.rows[0].publish_date,
                        gifTitle,
                        comment,
                    },
                })
            })
        })
    })
};