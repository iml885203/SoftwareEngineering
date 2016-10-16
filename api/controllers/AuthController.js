/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		// User.create({
		// 	username: 'user',
		// 	password: 'password'
		// }).catch( err => sails.log.error(err));
		res.view();
		return;
	}
};
