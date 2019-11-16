const pool = require('../connectDB');

exports.viewFeeds = (req, res) => {
    pool.query('SELECT * FROM articles UNION SELECT * FROM gifs ORDER BY publish_date DESC', (error, results) => {
        if (error) {
            return res.status(400).json({
                error,
            })
        }
        const data = results.rows.map((row) => {
            if (!row.body.match(/http:.{2}res.cloudinary.com.+/)) {
                return {
                    id: row.article_id,
                    createdOn: row.publish_date,
                    title: row.title,
                    article: row.body,
                    authorId: row.user_id,
                }
            }
            return {
                id: row.article_id,
                createdOn: row.publish_date,
                title: row.title,
                url: row.body,
                authorId: row.user_id,
            }
        })
        res.status(200).json({
            status: 'success',
            data,
        })
    })
}