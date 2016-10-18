/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

module.exports = {
	index: function(req, res){
		// User.create({
    //   name: name,
    //   password: hashPassword
    // }).catch( err => sails.log.error(err));
		// User.findOneByName('asdf', (err, user) => {
		// 	if(err) res.serverError(err);
		// 	sails.log(user.name, 'password pass:', user.checkPassword('password'));
		// })
		// let isUsed = false;
		// User.find().then(users => {
		// 	users.forEach(user => {
		// 		// sails.log(user.name, name, user.name === name);
		// 		if(user.isSameName('asdf')){
		// 			isUsed = true;
		// 			sails.log.info('username is used');
		// 			return;
		// 		}
		// 	});
		// 	sails.log.info(isUsed);
		//
		// });
		res.view('auth/index');

		return;
	},

	login: function(req, res){
		sails.log('login post');
		passport.authenticate('local', function(err, user, info) {
	    if ((err) || (!user)) {
        return res.view('auth/index', {
          message: info.message
        });
	    }
	    req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.redirect('/');
	    });
    })(req, res);
	},

	logout: function(req, res){
		req.logout();
		res.redirect('/');
	}
};
