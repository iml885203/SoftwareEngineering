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
    isSameName: function(name){
      return name === this.name;
    },
    updateLoginedAt: function(){
      this.loginedAt = new Date();
      this.save();
      return;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },

  CheckRepeatName: function(name, cb){
    User.find().then((users) => {
      let isRepeat = false;
      users.forEach((user) => {
        if(user.name === name) isRepeat = true;
      });
      cb(isRepeat);
    }).catch( err => sails.log.error(err));;
  }






};
