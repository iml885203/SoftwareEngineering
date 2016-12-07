/**
 * IssueController
 *
 * @description :: Server-side logic for managing issues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 let moment = require("moment");
 moment.locale('zh-tw');

module.exports = {

	index: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				res.redirect(`/project/${req.params.id}`);
			}

			Issue.find(project.issues)
			.populate('assignUser')
			.populate('createUser')
			.then((issues) => {
				res.view('issue/index', {
					project: project,
					issues: issues,
					pageTitle: project.name,
					active: 'issueIndex',
					moment: moment,
				});
			});
		});
	},

	create: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				res.redirect(`/project/${req.params.id}`);
			}
			res.view('issue/create', {
				project: project,
				pageTitle: project.name,
				active: 'issueCreate',
				states: Attr.issueState,
				priorities: Attr.issuePriority,
				tags: Attr.issueTag,
			});
		});

	},

	store: function(req, res){
		Issue.create(req.body)
		.then( (newIssue) => {
			res.redirect(`/project/${req.params.id}/issue`);
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect(`/project/${req.params.id}/issue/create`);
		});
	},

	show: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				res.redirect(`/project/${req.params.id}`);
			}

			Issue.findOneById(req.params.issueId)
			.populate('assignUser')
			.populate('createUser')
			.then((issue) => {
				// return res.json(issue);
				res.view('issue/show', {
					project: project,
					issue: issue,
					pageTitle: project.name,
					active: 'issueIndex',
					moment: moment,
				});
			});
		});


	},


};
