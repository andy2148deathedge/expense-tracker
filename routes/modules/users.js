const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body;

  User.findOne({email})
    .then(user => {
      if (user) {
        console.log('此信箱已被註冊。');
        return res.render('register', {name, email, password, confirmPassword});
      }

      return User.create({name, email, password, confirmPassword})
        .then(() => res.redirect('/'))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});


module.exports = router;