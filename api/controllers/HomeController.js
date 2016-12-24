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
		.then( (user) => {
			MailService.siteURL = `${req.protocol}://${req.get('host')}`;
			if(!user.email){
				req.addFlash('danger', `${user.name} 沒有信箱，無法寄信通知`);
			}else{
				var mailcontent = MailService.createMailContent.verify(user);
				MailService.sendEmail(mailcontent);
			}
			res.redirect('/auth/login');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/home/signup');
		});
	},

	verify: function(req, res){
		User.findOneById(req.params.id)
		.then( (user) => {
			if(user.account === req.params.account){
				if(!user.isVerified){
					user.isVerified = true;
					user.save();
					res.view('home/verifySuccessful', {
						user: user,
					});
				}
				else {
					res.redirect('/home');
				}
			}
			else {
				res.view('home/verifyFalid');
			}
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect('/home');
		});		
	},
};
