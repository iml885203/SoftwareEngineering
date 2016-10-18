var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(name, password, done) {

    User.findOneByName(name, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: '找不到使用者' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: '密碼數入錯誤'
            });
          var returnUser = {
            name: user.name,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: '登入成功'
          });
        });
    });
  }
));
