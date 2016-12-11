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

	edit: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				res.redirect(`/project/${req.params.id}`);
			}

			Issue.findOneById(req.params.issueId)
			.populate('assignUser')
			.then((issue) => {
				// return res.json(issue);
				res.view('issue/edit', {
					project: project,
					issue: issue,
					pageTitle: project.name,
					active: 'issueIndex',
					moment: moment,
					states: Attr.issueState,
					priorities: Attr.issuePriority,
					tags: Attr.issueTag,
				});
			});
		});
	},

	update: function(req, res){
		sails.log('update issue');
		Issue.findOneById(req.params.issueId)
		.then((issue) => {
			Object.keys(req.body).forEach((key)=>{
				if(req.body[key] != issue[key]){
					let setting = Attr.issueFieldName[key];

					if(!!setting){
						if(setting.showValue){
							Log.create({
								content: `${req.user.name} 更改 ${setting.name}為${req.body[key]}`,
								issue: issue.id,
							});
						}
						else{
							Log.create({
								content: `${req.user.name} 更改了 ${setting.name}`,
								issue: issue.id,
							});
						}
					}
					else if(key === 'assignUser'){
						User.findOneById(req.body[key])
						.then((user) => {
							sails.log(issue.id);
							Log.create({
								content: `指派給 ${user.name}`,
								issue: issue.id,
								workTime: (!!req.body.workTime) ? req.body.workTime : null,
							});
						});
					}

					issue[key] = req.body[key];
					issue.save();
				}
			});
			res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
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
