const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // login logic
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body;


});



module.exports = router;