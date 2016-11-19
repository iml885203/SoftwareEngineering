/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt-nodejs');

module.exports = {
	//顯示全部使用者
	index: function(req, res){
		User.find().then(function(users){
			res.view('user/index', {users: users});
		});
	},

  //顯示創建使用者頁面
  create: function(req, res){
    res.view('user/create');
  },

	//創建使用者
  store: function(req, res){
		User.create({
			name: req.body.name,
			password: req.body.password,
			permission: (!!req.body.permission) ? req.body.permission : 'user'
		})
		.then( () => {
			res.redirect('/user');
		})
		.catch( err => res.view('user/create', { waring : JSON.stringify(err.Errors) }));
  },

	//顯示編輯使用者頁面
	edit: function(req, res){
		User.findOne({
			id: req.params.id,
		})
		.then( (user) => {
			res.view('user/edit', {
				user : user,
			});
		})
		.catch( err => res.serverError(err));
	},

	update: function(req, res){
		if(!!req.body.password){
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, null, function(err, hash) {
					req.body.password = hash;
				});
			});
		}
		User.update({
			id: req.params.id,
		},req.body)
		.then( () => {
			res.redirect('/user');
		})
		.catch( (err) => {
			req.addFlash('danger', JSON.stringify(err.Errors));
			res.redirect(`/user/edit/${req.params.id}`);
		});
	},

	delete: function(req, res, id){
		User.destroy({
			id: req.params.id,
		})
		.then( () => {
			res.redirect('/user');
		})
		.catch( err => res.serverError(err));
	}
};
