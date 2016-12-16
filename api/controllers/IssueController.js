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
			.sort('createdAt DESC')
			.then((issues) => {
				res.view('issue/index', {
					project: project,
					issues: issues,
					pageTitle: project.name,
					active: 'issueIndex',
					moment: moment,
					labelType: Attr.labelType,
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
					Log.create({
						type: 'assign',
						issue: newIssue.id,
						createUser: req.user.id,
						targetUser: user.id,
					}).catch( (err) => {
						handleErr.handleValidateError(req, err);
						res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
					});
				});
			}
			//***新增Issue時，發信給PM***
			Issue.findOneById(newIssue.id)
  		.populate('belongProject')
  		.then( (issue) => {
        sails.log(issue);
          User.findOne({id:issue.belongProject.manager})
          .then( (manager) => {
							var mailcontent = MailService.createMailContent.newIssue(issue,manager);
							MailService.sendEmail(mailcontent);
      		});
  		});
			//***新增Issue時，發信給PM***
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
		.populate('belongProject')
		.populate('assignUser')
		.then((issue) => {
			Object.keys(req.body).forEach((key)=>{
				if(req.body[key] != issue[key]){
					let setting = Attr.issueFieldName[key];
					if(!!setting){
						if(setting.showValue){
							Log.create({
								type: 'change',
								content: `更改 ${setting.name}為${req.body[key]}`,
								issue: issue.id,
								createUser: req.user.id,
							})
							.catch( (err) => {
								handleErr.handleValidateError(req, err);
								res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
							});
						}
						else{
							Log.create({
								type: 'change',
								content: `更改了 ${setting.name}`,
								issue: issue.id,
								createUser: req.user.id,
							})
							.catch( (err) => {
								handleErr.handleValidateError(req, err);
								res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
							});
						}
					}
					else if(!!req.body[key] && key === 'assignUser'){
						Log.create({
							type: 'assign',
							issue: issue.id,
							createUser: req.user.id,
							targetUser: req.body[key],
							workTime: (!!req.body.workTime)?req.body.workTime:null
						})
						.catch( (err) => {
							handleErr.handleValidateError(req, err);
							res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
						});
						//***Issue 更改assignUser時，發信通知assignUser***
						User.findOneById(req.session.passport.user)
						.populate('manageProjects')
						.populate('joinProjects')
						.then( (you) => {
							User.findOne({id:issue.assignUser})
							.then( (assignUser) => {
								var mailcontent = MailService.createMailContent.assignToYou(issue,you,assignUser);
								MailService.sendEmail(mailcontent);
							});
						});						
					  //***Issue 更改assignUser時，發信通知assignUser***
					}
					//***Issue close時，發信給PM***
					if(key === 'state' && req.body[key] === 'solved'){
						User.findOne({id:issue.belongProject.manager})
						.then( (manager) => {
								var mailcontent = MailService.createMailContent.solveIssue(issue,manager);
								MailService.sendEmail(mailcontent);
						});
					}
				  //***Issue close時，發信給PM***

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
			.then((issue) => {
				Log.find({
					issue: req.params.issueId
				})
				.populate('createUser')
				.populate('targetUser')
				.then((logs) => {
					res.view('issue/show', {
						project: project,
						issue: issue,
						logs: logs,
						pageTitle: project.name,
						active: 'issueIndex',
						moment: moment,
						labelType: Attr.labelType,
					});
				})
			});
		});
	},

	addComment: function(req, res){
		Log.create({
			type: 'comment',
			content: req.body.content,
			issue: req.params.issueId,
			createUser: req.user.id,
		})
		.then(()=>{
			res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect(`/project/${req.params.id}/issue/${req.params.issueId}`);
		});
	}


};
