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
	delete: function(req, res){
		Project.destroy({
			id: req.params.id
		})
		.then( (project) => {
			req.addFlash('success', `${project[0].name} 已被刪除`);
			res.redirect('/admin/project');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/admin/project/create');
		});
	},

};
