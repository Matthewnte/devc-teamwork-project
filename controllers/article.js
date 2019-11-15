const jwt = require('jsonwebtoken');
const pool = require('../connectDB');

exports.createArticle = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'reqbodypassword');
    const { email } = decodedToken.user;
    pool.query('SELECT userId FROM users WHERE email = $1', [email], (userIdError, userResult) => {
        const userId = userResult.rows[0].userid;
        const { title, article } = req.body;
        pool.query('INSERT INTO articles (user_id, title, body) VALUES ($1, $2, $3) RETURNING *', [userId, title, article], (error, results) => {
            if (error) {
                return res.status(400).json({
                    error,
                })
            }
            res.status(201).json({
                status: 'success',
                data: {
                    message: 'Article successfully posted',
                    articleId: results.rows[0].article_id,
                    createdOn: results.rows[0].publish_date,
                    title,
                },
            })
        })
    })
}

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'reqbodypassword');
    const { email } = decodedToken.user;
    pool.query('SELECT userId FROM users WHERE email = $1', [email], (userError, userResult) => {
        const userId = userResult.rows[0].userid;
        pool.query('SELECT user_id FROM articles WHERE article_id = $1', [id], (rowError, rowResult) => {
            const rowUserId = rowResult.rows[0].user_id;
            const { title, article } = req.body;
            if (userId === rowUserId) {
                pool.query('UPDATE articles SET title = $1, body = $2 WHERE article_id = $3 RETURNING *', [title, article, id], (error, result) => {
                    if (error) {
                        return res.status(400).json(
                            error,
                        )
                    }
                    res.status(200).json({
                        status: 'success',
                        data: {
                            message: 'Article successfully updated',
                            title: result.rows[0].title,
                            article: result.rows[0].body,
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
}