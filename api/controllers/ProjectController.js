/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 let md = require("node-markdown").Markdown;

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
				pageTitle: project.name,
				project: project,
				active: 'projectEdit',
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
				md: md,
			});
		});
	},

	transfer: function(req, res){
		Project.getById(req.params.id, function(err, project){
			if(err){
				handleErr.handleValidateError(req, err);
				return res.redirect(`/project/${req.params.id}`);
			}
			if(project.manager.id != req.user.id){
				return res.redirect(`/project/${req.params.id}`);
			}
			return res.view('project/transfer', {
				pageTitle: project.name,
				project: project,
				active: 'projectTransfer',
			});
		});
	},

	transferPM: function(req, res){
		Project.findOneById(req.params.id)
		.populate('members')
		.then((project) => {
			req.body.members = [];
			project.members.forEach(function(member){
				if(member.id != req.body.manager){
					req.body.members.push(member.id);
				}
			});
			Project.update({
				id: req.params.id,
			}, req.body)
			.then( (newProject) => {
        User.findOneById(req.session.passport.user)
        .then( (you) => {
          User.findOneById(req.body.manager)
          .then( (manager) => {
            MailService.siteURL = `${req.protocol}://${req.get('host')}`;
            if(!manager.email){
              req.addFlash('danger', `${manager.name} 沒有信箱，無法寄信通知`);
              return;
            }
            var mailcontent = MailService.createMailContent.trnasferPM(you,manager,newProject[0]);
            MailService.sendEmail(mailcontent);
            req.addFlash('success', `${newProject[0].name} 專案管理員已更改`);
            return res.redirect(`/project/${req.params.id}`);
          });
        });
			})
			.catch( (err) => {
	      handleErr.handleValidateError(req, err);
				return res.redirect(`/project/${req.params.id}/transfer`);
			});
		});

	},

  //申請進入專案
  apply: function(req, res){
    User.findOneById(req.session.passport.user)
		.populate('manageProjects')
		.populate('joinProjects')
		.then( (user) => {
      Project.findOneById(req.params.id)
      .populate('members')
      .populate('manager')
      .then( (project) => {
	        MailService.siteURL = `${req.protocol}://${req.get('host')}`;
          var isContained = false;
          for (var member in project.members) {
            if(user.id === member.id){
              isContained = true;
              break;
            }
          }
          if(isContained || req.session.passport.user === project.manager){
            req.addFlash('danger', '你已經參與此專案了');
    				return res.redirect(`/project/${req.params.id}`);
          }
          if(!project.manager.email){
            req.addFlash('danger', `專案PM ${project.manager.name} 沒有信箱，無法寄信通知`);
            return res.redirect(`/project/${req.params.id}`);
          }
          var mailcontent = MailService.createMailContent.applyToProject(user,project);
          sails.log(mailcontent);
          MailService.sendEmail(mailcontent);
          req.addFlash('success', '成功送出申請，請等待PM將您加入專案');
          return res.redirect(`/project/${req.params.id}`);
			})
      .catch( (err) => {
	      handleErr.handleValidateError(req, err);
				return res.redirect(`/project/${req.params.id}`);
			});
		});
	},

  //同意進入專案
  //userId, projectId
  admit: function(req, res){
    Project.findOneById(req.params.projectId)
    .populate('members')
    .populate('manager')
    .then( (project) => {
      if(req.session.passport.user != project.manager.id){
        req.addFlash('danger', '你不是專案管理員喔');
        return res.redirect(`/project/${req.params.projectId}`);
      }
      User.findOneById(req.params.userId)
  		.then( (user) => {
        sails.log(user);
          project.members.add(user);
          project.save(function(){
            req.addFlash('success', '成功加入使用者');
            return res.redirect(`/project/${req.params.projectId}`);
          });
  			})
    })
    .catch( (err) => {
      handleErr.handleValidateError(req, err);
      return res.redirect(`/project/${req.params.projectId}`);
    });

  },
};
