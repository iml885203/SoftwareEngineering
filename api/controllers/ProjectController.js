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
		Project.find().then(function(projects){
			res.view('project/index', {projects: projects});
		});
	},
	
};
