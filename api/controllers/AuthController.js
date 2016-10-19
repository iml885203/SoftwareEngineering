/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	index: function(req, res){
    let errorMessage = '';
    if(typeof errorMessage != 'undefined'){
      errorMessage = req.session.errorMessage;
      req.session.errorMessage = undefined;
    }
		res.view('auth/index', { message: errorMessage });

		return;
	},

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

	logout: function(req, res){
		req.logout();
		res.redirect('/');
	},

  register: function(req, res){
    User.create({
      name: 'asdf',
      password: 'password'
    }).catch( err => sails.log.error(err));
    res.redirect('/');
  }
};
