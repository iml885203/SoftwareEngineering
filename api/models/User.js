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
    account: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true,
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
    },
    email: {
      type: 'string',
      required: true,
    },
    isVerified:{
      type: 'boolean',
    },
    superLogin:{
      type: 'boolean',
    },

    //project
    manageProjects: {
      collection: 'project',
      via: 'manager',
    },
    joinProjects: {
      collection: 'project',
      via: 'members',
    },

    //Issue
    createIssue: {
      collection: 'issue',
      via: 'createUser',
    },
    assignIssue: {
      collection: 'issue',
      via: 'assignUser',
    },

    //log
    createLog: {
      collection: 'log',
      via: 'createUser',
    },
    targetLog: {
      collection: 'log',
      via: 'targetUser',
    },
  },

  validationMessages: {
    account: {
      required: 'account 必須輸入',
    },
    name: {
      required: 'name 必須輸入',
      unique: 'name 已被使用'
    },
    password: {
      required: 'password 必須輸入'
    },
    email: {
      required: 'email 必須輸入'
    },
  },

  beforeCreate: function(user, cb) {
    if(user.password === 'password'){
      user.superLogin = true;
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return cb(err);
        user.password = hash;
        cb();
      });
    });
  },

};
