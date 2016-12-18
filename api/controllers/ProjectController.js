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
			return res.view('project/index', {
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
			return res.view('project/myProject', {
				manageProjects: user.manageProjects,
				joinProjects: user.joinProjects,
				pageTitle: '我參與的專案',
			});
		})
	},
	//
	create: function(req, res){
		return res.view('project/create', {
			permissions: Attr.permission,
			pageTitle: '新增專案',
		});
	},
	//
	store: function(req, res){
		Project.create(req.body)
		.then( (newProject) => {
			return res.redirect('/project');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			return res.redirect('/project/create');
		});
	},

	edit: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				return res.redirect(`/project/${req.params.id}`);
			}
			if(project.manager.id != req.user.id){
				return res.redirect(`/project/${req.params.id}`);
			}
			return res.view('project/edit', {
				permissions: Attr.permission,
				pageTitle: '編輯專案',
				project: project,
			});
		});


	},
	//
	update: function(req, res){
		Project.update({
			id: req.params.id,
		}, req.body)
		.then( (newProject) => {
			req.addFlash('success', `${newProject[0].name} 專案編輯成功`);
			return res.redirect(`/project/${req.params.id}`);
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			return res.redirect(`/project/${req.params.id}/edit`);
		});
	},
	//顯示專案概觀
	show: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				return res.redirect(req.url);
			}
			return res.view('project/show', {
				project: project,
				pageTitle: project.name,
				active: 'info',
			});
		});
	}
};
