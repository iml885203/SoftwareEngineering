/**
 * GitAutoController
 *
 * @description :: Server-side logic for managing gitautoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let exec = require('child_process').exec,
		bcrypt = require('bcrypt-nodejs'),
		hashPassword = '$2a$10$MJX0Jf9yxtQimuQA9K3BneF3QXHJwDK7NwfyAAdDkphlJ8naDLHfe';

module.exports = {
	generatePassword: function(req, res){
		if(typeof req.query.genpassword === 'undefined'){
			res.json('網址後面加上?genpassword=你的密碼');
		}
		else{
			let genSalt = bcrypt.genSaltSync();
			let hash = bcrypt.hashSync(req.query.genpassword, genSalt);
			res.json(`hashPassword = ${hash}`);
		}

	},

	master: function(req, res){
		if(typeof req.query.update != 'undefined'){
			if(bcrypt.compareSync(req.query.update, hashPassword)){
				let cmd = ['git reset --hard',
									'git fetch --all',
									'git checkout master',
									'git reset --hard origin/master'];
				let cmdCounter = 0;
				let runExec = function(cc){
					exec(cmd[cc], function(error, stdout, stderr) {
						sails.log(stdout);
						if(typeof cmd[cc + 1] != 'undefined'){
							runExec(cc + 1);
						}
					});
				}
				runExec(cmdCounter);
			}
		}
		res.json("update master");
	},
};
