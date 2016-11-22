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
			res.view('admin/user/index', {users: users});
		});
	},

  //顯示創建使用者頁面
  create: function(req, res){
    res.view('admin/user/create', { permissions: Attr.permission });
  },

	//創建使用者
  store: function(req, res){
		req.body.permission = (!!req.body.permission) ? req.body.permission : 'user';
		User.create(req.body)
		.then( () => {
			res.redirect('/user');
		})
		.catch( (err) => {
      handleErr.handleValidateError(req, err);
			res.redirect('/user/create');
		});
  },

	//顯示編輯使用者頁面
	edit: function(req, res){
		User.findOne({
			id: req.params.id,
		})
		.then( (user) => {
			res.view('admin/user/edit', {
        permissions: Attr.permission,
				user : user,
			});
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect('/admin/user');
		});
	},

	//變更使用者資料
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
			res.redirect('/admin/user');
		})
		.catch( (err) => {
			handleErr.handleValidateError(req, err);
			res.redirect(`/admin/user/edit/${req.params.id}`);
		});
	},

	//刪除使用者
	delete: function(req, res){
		User.destroy({
			id: req.params.id,
		})
		.then( () => {
			res.redirect('/admin/user');
		})
		.catch( err => res.serverError(err));
	}
};
