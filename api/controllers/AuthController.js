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
		return res.view('auth/index', {pageTitle: '登入'});
	},

  //login request
	login: function(req, res){
		passport.authenticate('local', function(err, user, info) {
	    if ((err) || (!user)) {
				if(typeof info != 'undefined')
					req.addFlash('warning', info.message);
        return res.redirect(req.url);
	    }
	    req.logIn(user, function(err) {
        if (err) res.send(err);
        sails.log(user.name, 'Logined at', user.loginedAt);
				req.session.passport.username = user.name;
				req.session.passport.permission = user.permission;
        return res.redirect(req.session.loginBeforeURL || '/');
	    });
    })(req, res);
	},

  //logout request
	logout: function(req, res){
		req.logout();
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
  },

	//show user info
	show: function(req, res){
		User.findOneById(req.session.passport.user)
		.populate('manageProjects')
		.populate('joinProjects')
		.then( (user) => {
			res.view('auth/show', {
				user: user,
				pageTitle: '個人資料',
			});
		});
	}
};
