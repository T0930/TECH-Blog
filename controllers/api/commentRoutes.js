const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const createComment = Comment.create({...body, userId: req.session.userId})
        res.json(createComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;