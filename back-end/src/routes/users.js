const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router();

/* Post user to DB */
router.post('/', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).redirect('/');
  } catch (err) {
    return res.status(400).render('signup', { page: 5, token: undefined, error:true });;
  }
});

// GET login //
router.get('/login', async (req, res) => {
  res.render('login', { page: 5, token: undefined, error:false });
});

// GET signup //
router.get('/signup', async (req, res) => {
  res.render('signup', { page: 6, token: undefined, error:false });
});

/* Login user */
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).cookie('Authorization', token).redirect('/');
  } catch (err) {
    res.status(500).render('login', { page: 5, token: undefined, error:true });;
  }
})

//log out
router.get('/logout', auth, async (req, res) => {
  try {
    //removes token from the token array
    req.user.tokens = req.user.tokens.filter((token) => {

      //walk array of tokens
      //if token in array not equal to token logging out, keep it
      return token.token !== req.token
    })

    await req.user.save()
    res.clearCookie('Authorization').render('logout', { page: 1, token: undefined });;
  } catch (err) {
    res.status(400).send(err)
  }
})


/* Get user information */
router.get('/me', auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
})


/* Delete the loggin-in user's account */
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (err) {
    res.status(400).send(err)
  }
})


/* Get all users (for dev purposes) */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send(err);
  }
})

module.exports = router;