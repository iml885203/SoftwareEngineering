/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
  connection: 'someMongodbServer',
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
    loginedAt: {
      type: 'datetime',
    },
    updateLoginedAt: function(){
      this.loginedAt = new Date();
      this.save();
      return;
    }
  },

  validationMessages: {
      name: {
          required: 'name 必須輸入',
          unique: 'name 已被使用'
      },
      password: {
          required: 'password 必須輸入'
      }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return cb(err);
        user.password = hash;
        cb();
      });
    });
  },

};
