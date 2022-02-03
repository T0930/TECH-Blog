const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const createPost = Post.create({...body, userId: req.session.userId})
        res.json(createPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updatePosts] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatePosts > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [updatePosts] = await Post.destroy(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatePosts > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;