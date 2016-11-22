/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//
	index: function(req, res){
		res.redirect('/admin');
	},

	//
	create: function(req, res){
		sails.log(req.session.passport.user);
		res.view('admin/project/create', {
			permissions: Attr.permission,
			userID: req.session.passport.user,
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
