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
        pool.query('SELECT userId FROM users WHERE email = $1', [email], (userIdError, userIdRes) => {
            const userId = userIdRes.rows[0].userid;
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
};

exports.commentOnGif = (req, res, next) => {

};