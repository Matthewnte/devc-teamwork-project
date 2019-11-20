const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.post('/', auth, articleCtrl.createArticle);
router.get('/:id', auth, articleCtrl.readOneArticle);
router.patch('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.post('/:id/comment', auth, articleCtrl.commentOnArticle);
router.post('/:id/comment/:commentId/inappropriate', auth, articleCtrl.flagArticleCommentAsInappropriate);
router.post('/:id/inappropriate', auth, articleCtrl.flagArticleAsInappropriate);

module.exports = router;