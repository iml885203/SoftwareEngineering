/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//顯示成員清單
	getMemberList: function(req, res){
		let users = User.find({
      select: [
        'account',
        'name',
      ],
      where: {
        id: {'!': req.session.passport.user},
      }
    });
    users.then(function(users){
			res.json({users: users});
		});
	},
};
