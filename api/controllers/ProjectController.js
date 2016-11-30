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
				projects: projects,
				projectTitle: '全部專案',
			});
		});
	},

	//
	myProject: function(req, res){
		//sails.log(req.session.passport);
		User.findOneById(req.session.passport.user)
		.populate('manageProjects')
		.populate('joinProjects')
		.then( (user) => {
			res.view('project/myProject', {
				manageProjects: user.manageProjects,
				joinProjects: user.joinProjects,
				projectTitle: '我參與的專案',
			});
		})
	},
	//
	create: function(req, res){
		res.view('project/create', {
			permissions: Attr.permission,
		});
	},
	//
	store: function(req, res){
		Project.create(req.body)
		.then( (newProject) => {
			res.redirect('/project');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/project/create');
		});
	},
	//顯示專案概觀
	show: function(req, res){
		Project.findOneById(req.params.id)
		.populate('manager')
		.populate('members')
		.then( (project) => {
			// res.redirect('/project');
			// res.json(project);
			res.view('project/show', {
				project: project,
				projectTitle: project.name,
			})
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/project');
		});
	}
};
