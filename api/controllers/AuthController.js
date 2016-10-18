/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		// User.register('asdf', 'password');
		User.login('asdf', 'password');
		res.view();
		return;
	}
};
