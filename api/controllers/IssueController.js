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

			Issue.find({
				belongProject: project.id,
			})
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

			if(!!req.body.assignUser){
				User.findOneById(req.body.assignUser)
				.then((user) => {
					newIssue.logs.add({
						content: `指派給 ${user.name}`,
					});
					newIssue.save();
				});
			}

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
			.populate('logs')
			.populate('comments')
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

	addComment: function(req, res){
		Issue.findOneById(req.params.issueId)
		.then((issue) => {
			issue.comments.add(req.body);
			issue.save();
		 	res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
		});
	}


};
