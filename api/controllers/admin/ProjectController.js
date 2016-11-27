/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//
	index: function(req, res){
		Project.find().populate('manager').then(function(projects){
			res.view('admin/project/index', {projects: projects});
		});
	},

	//
	show: function(req, res){
		// Project.findOne({
		// 	id: req.params.id,
		// })
		// .then( (project) => {
		// 	res.view('admin/project/show', {
    //     permissions: Attr.permission,
		// 		project : project,
		// 	});
		// })
		// .catch( (err) => {
		// 	handleErr.handleValidateError(req, err);
		// 	res.redirect('/admin/project');
		// });
		res.redirect('/admin');
	},

	//
	create: function(req, res){
		res.view('admin/project/create', {
			permissions: Attr.permission,
		});
	},

	//
	store: function(req, res){
		Project.create(req.body)
		.then( () => {
			res.redirect('/admin/project');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/admin/project/create');
		});
	},

	//
	edit: function(req, res){
		res.redirect('/admin');
	},

	//
	update: function(req, res){
		res.redirect('/admin');
	},

	//
	delete: function(req, res){
		res.redirect('/admin');
	},

};
