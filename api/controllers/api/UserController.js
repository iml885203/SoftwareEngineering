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
        id: {'!': req.user.id},
				permission: 'user'
      }
    });
    users.then(function(users){
			if(!!req.query.projectId){
				Project.getById(req.query.projectId, function(err, project){
					if(err){
						handleErr.handleValidateError(req, err);
						return res.status(404).end();
					}
					return res.json({
						users: users,
						projectMembers: project.members,
					});
				})
			}
			else{
				return res.json({users: users});
			}
		});
	},
};
