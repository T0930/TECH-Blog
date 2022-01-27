const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
    console.log("SignUP",req.body)
    try {
      const userData = await User.create(req.body);
      console.log(userData)
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    } catch (err) {
        console.log(err,"err")
      res.status(400).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: 'Error with password or username information!'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: 'Error with password or username information!'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Welcome!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
 if (req.session.loggedIn) {
    res.session.destroy(() => {
        res.status(204).end();
    });
  } else {
      res.status(404).end();
  }
});

module.exports = router;