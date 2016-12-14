var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id } , function (err, user) {
      done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'account',
    passwordField: 'password'
  },
  function(account, password, done) {

    User.findOneByAccount(account, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: '找不到使用者' });
      }
      if (!user.isVerified && user.permission === 'user') {
        return done(null, false, { message: '尚未通過驗證，請去信箱點選驗證信' });
      }
      bcrypt.compare(password, user.password, function (err, res) {
          if (!res){
            return done(null, false, { message: '密碼輸入錯誤' });
          }
          user.updateLoginedAt();
          var returnUser = {
            name: user.name,
            loginedAt: user.loginedAt,
            id: user.id
          };

          return done(null, returnUser, {
            message: '登入成功'
          });
        });
    });
  }
));
