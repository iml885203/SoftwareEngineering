/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		res.view('home/index');
	},

	signup: function(req, res){
		res.view('home/signup', { permissions: Attr.permission });
	},

	store: function(req, res){
		req.body.permission = (!!req.body.permission) ? req.body.permission : 'user';
		req.body.isVerified = (!!req.body.isVerified) ? req.body.isVerified : 'false';
		User.create(req.body)
		.then( () => {
			var mailcontent = MailService.createMailContent.verify(req.body);
			MailService.sendEmail(mailcontent);
			res.redirect('/auth/login');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/home/signup');
		});
	},

	verify: function(req, res){
		if(MailService.checkverify(req.params)){
			User.findOne({
				account:req.params.account
			})
			.then( (user) => {
				if(!user.isVerified){
					user.isVerified = true;
					user.save();
					res.view('home/verifySuccessful');
				}
				else {
					res.redirect('/home');
				}
			})
			.catch( (err) => {
				handleErr.handleValidateError(req, err);
				res.redirect('/home');
			});
		}
		else {
			res.view('home/verifyFalid');
		}
	},
};
