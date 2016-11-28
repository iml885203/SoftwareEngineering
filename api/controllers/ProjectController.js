/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//
	index: function(req, res){
		sails.log('see project');
		Project.find().populate('manager').then(function(projects){
			res.view('project/index', {projects: projects});
		});
	},
	//
	myProject: function(req, res){
		sails.log(req.session.passport);
		if(!!req.session.passport){
			User.findOne({
				id: req.session.passport.user,
			})
			.then( (user) => {
				sails.log(user);
				res.view('project/myProject', {
					user : user,
					manageProjects : user.manageProject,
					joinProjects : user.joinProject,
				});
			})
		}
		else {
			//TODO
			res.redirect('/project');
		}
	},
	//
	create: function(req, res){
		res.view('project/create', {
			permissions: Attr.permission,
		});
	},
	//
	store: function(req, res){
		res.json({data: req.body});
		// Project.create(req.body)
		// .then( () => {
		// 	res.redirect('/project');
		// })
		// .catch( (err) => {
    //   handleErr.handleValidateError(req, err);
		// 	res.redirect('/project/create');
		// });
	},
};
