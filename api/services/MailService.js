/**
 * MailService.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var nodemailer = require('nodemailer');
 var bcrypt = require('bcrypt-nodejs');

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
    //***
    //驗證信
    //***
    verify: function(UserContent){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: UserContent.email,
        //主旨
        subject: 'ITS 帳號驗證信', // Subject line
        //嵌入 html 的內文
        html: '<h2>請點選以下網址進行帳號驗證</h2> <p><a href="' + MailService.verifyhref(UserContent.account) +'">請點我</a> </p>',
      };
      return options;
    },
    //***
    //新增Issue時，要通知PM
    //***
    newIssue: function(issue,manager){
      var options = {
        //寄件者
        from: 'ntutcsieits@gmail.com',
        //收件者
        to: manager.email,
        //主旨
        subject: 'Issue新增通知', // Subject line
        //嵌入 html 的內文
        html: `<h2>請點選以下網址查看</h2> <p><a href="http://youare87.ddns.net/project/${issue.belongProject.id}/issue/${issue.id}">請點我</a> </p>`,
      };
      return options;
    },
  },

  verifyhref: function(account){
    var href = 'http://youare87.ddns.net/home/verify/' + account + '/';
    var verifycode = bcrypt.hashSync(account, bcrypt.genSaltSync(10));
    return href + verifycode;
  },

  checkverify: function(Content){
    if(bcrypt.compareSync(Content.account, Content.verifycode))
      return true;
    return false;
  },

};
