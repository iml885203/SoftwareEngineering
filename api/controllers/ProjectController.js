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
				pageTitle: '全部專案',
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
				pageTitle: '我參與的專案',
			});
		})
	},
	//
	create: function(req, res){
		res.view('project/create', {
			permissions: Attr.permission,
			pageTitle: '新增專案',
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
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				res.redirect(req.url);
			}
			res.view('project/show', {
				project: project,
				pageTitle: project.name,
				active: 'info',
			});
		});
	}
};
