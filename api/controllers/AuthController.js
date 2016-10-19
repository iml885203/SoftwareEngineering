/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  //login page
	index: function(req, res){
    let errorMessage = '';
    if(typeof errorMessage != 'undefined'){
      errorMessage = req.session.errorMessage;
      req.session.errorMessage = undefined;
    }
		res.view('auth/index', { message: errorMessage });

		return;
	},

  //login request
	login: function(req, res){
		passport.authenticate('local', function(err, user, info) {
	    if ((err) || (!user)) {
        req.session.errorMessage = info.message;
        return res.redirect('/auth/login');
	    }
	    req.logIn(user, function(err) {
        if (err) res.send(err);
        sails.log(user.name, 'Logined at', user.loginedAt);
        return res.redirect('/');
	    });
    })(req, res);
	},

  //logout request
	logout: function(req, res){
		req.logout();
		res.redirect('/');
	},

  //register new user
  register: function(req, res){
    User.create({
      name: 'asdf',
      password: 'password'
    }).catch( err => sails.log.error(err));
    res.redirect('/');
  },

  //api: check user name repeat
  checkNameRepeat: function(req, res){
    if(req.query.name === undefined){
      return res.badRequest('name null');
    }
    User.CheckRepeatName(req.query.name, (isRepeat) => {
      return res.json({isRepeat: isRepeat});
    });
  }
};
