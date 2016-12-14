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
  sendEmail: function(UserContent) {
    var options = this.createMailContent(UserContent);
    sails.log(options);
    transporter.sendMail(options, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('訊息發送: ' + info.response);
      }
    });
  },

  //產生信件內容
  createMailContent: function(UserContent){
    var options = {
      //寄件者
      from: 'ntutcsieits@gmail.com',
      //收件者
      to: UserContent.email,
      //主旨
      subject: 'ITS 帳號驗證信', // Subject line
      //嵌入 html 的內文
      html: '<h2>請點選以下網址進行帳號驗證</h2> <p><a href="' + this.verifyhref(UserContent.account) +'">請點我</a> </p>',

    };
    return options;
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
