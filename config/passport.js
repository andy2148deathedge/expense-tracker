const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport mod
  app.use(passport.initialize());
  app.use(passport.session());

  // 設定策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, { message: '這個信箱沒有進行過註冊'});
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: '輸入的密碼不正確'});
            }

            return done(null, user);
          })
      })
      .catch(err => done(err, false));
  }));

  // 序列&反序列
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
};