/**
 * MailService.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var nodemailer = require('nodemailer');
 var bcrypt = require('bcrypt-nodejs');
 var siteURL = '';

 var transporter = nodemailer.createTransport({
   service: 'Gmail',
   secure: false,
   auth: {
     user: "ntutcsieits@gmail.com",
     pass: "SoftwareEngineering"
   },
   tls:{
        rejectUnauthorized: false
    }
 });


module.exports = {
  //寄mail
  sendEmail: function(content) {
    transporter.sendMail(content, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('訊息發送: ' + info.response);
      }
    });
  },

  //產生信件內容
  createMailContent: {
    //驗證信
    verify: function(UserContent){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: UserContent.email,
        //主旨
        subject: 'ITS 帳號驗證信', // Subject line
        //嵌入 html 的內文
        html: `<h2>請點選以下網址進行帳號驗證</h2> <p><a href="${MailService.siteURL}/home/verify/${UserContent.account}/${UserContent.id}">請點我</a> </p>`,
      };
      return options;
    },

    //新增Issue時，要通知PM
    newIssue: function(issue,manager){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: manager.email,
        //主旨
        subject: 'Issue新增通知', // Subject line
        //嵌入 html 的內文
        html: `<h2>你所管理的Project 「${issue.belongProject.name}」 已新增了一筆Issue</h2>`
              + `<h3>請點選以下網址查看</h3>`
              + `<p><a href="${MailService.siteURL}/${issue.belongProject.id}/issue/${issue.id}">請點我</a> </p>`,
      };
      return options;
    },

    //Issue solved時，發信給PM
    solveIssue: function(issue,manager){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: manager.email,
        //主旨
        subject: 'Issue solved通知', // Subject line
        //嵌入 html 的內文
        html: `<h2>你所管理的Project 「${issue.belongProject.name}」 </h2>`
              + `<h2>Issue 「${issue.name}」 已解決</h2>`
              + `<h3>請點選以下網址查看</h3>`
              + `<p><a href="${MailService.siteURL}/${issue.belongProject.id}/issue/${issue.id}">請點我</a> </p>`,
      };
      return options;
    },

    //Issue 更改assignUser時，發信通知assignUser
    assignToYou: function(issue,you,assignUser){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: assignUser.email,
        //主旨
        subject: '你被指派了一個Issue', // Subject line
        //嵌入 html 的內文
        html: `<h2>你被 ${you.name} 指派了一個Issue「${issue.name}」 </h2>`
              + `<h2>在你所參與的Project 「${issue.belongProject.name}」 </h2>`
              + `<h3>請點選以下網址查看</h3>`
              + `<p><a href="${MailService.siteURL}/${issue.belongProject.id}/issue/${issue.id}">請點我</a> </p>`,
      };
      return options;
    },

    //申請加入專案
    applyToProject: function(user,project){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: project.manager.email,
        //主旨
        subject: `申請加入專案`, // Subject line
        //嵌入 html 的內文
        html: `工程師 ${user.name} 向您申請加入專案 「${project.name}」 </h2>`
              + `<h3>請點選以下網址查看</h3>`
              + `<p><a href="${MailService.siteURL}/project/admit/${user.id}/${project.id}">請點我</a> </p>`,

      };
      return options;
    },
  },

  checkverify: function(Content){
    User.findOneById(Content.id)
		.then((user)=>{
			if(user.account === Content.account)
        return true;
      return false;
		})
		.catch( (err) => {
			return false;
		});
  },

};
