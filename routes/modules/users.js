const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true}), (req, res) => {
    // just let req in, so no need other things here
  });

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '還有欄位沒填寫哦!' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼 & 確認密碼欄位不相符!'})
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({email})
    .then(user => {
      if (user) {
        errors.push({ message: '此信箱已被註冊。'});
        return res.render('register', {errors, name, email, password, confirmPassword});
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => 
          User.create({name, email, password: hash})
        )
        .then(() => res.redirect('/'))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '成功登出!');
  res.redirect('/users/login');
});

module.exports = router;