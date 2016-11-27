/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//
	index: function(req, res){
		Project.find()
		.populate('manager')
		.then( (projects) => {
			res.view('project/index', {
				projects: projects
			});
		});
	},

	//
	myProject: function(req, res){
		//sails.log(req.session.passport);
		if(!!req.session.passport){
			Project.find({
				manager: req.session.passport.user
			},{
				members: req.session.passport.user
			})
			.populate('manager')
			.populate('members')
			.then( (projects) => {
				//sails.log(projects);
				res.view('project/myProject', {
					projects: projects,
				});
			})
		}
		else {
			//TODO
			res.redirect('/project');
		}
	},
};
