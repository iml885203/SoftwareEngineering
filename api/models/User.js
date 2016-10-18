/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  connection: 'someMongodbServer',
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },

  },

  register: (name, password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    sails.log(hashPassword);
    User.create({
      username: name,
      password: hashPassword
    }).catch( err => sails.log.error(err));
  },

  login: (username, password) => {
    User.findOne({username: username}).then(user => {
      sails.log('username: ',user.username);
      sails.log('password: ',user.password);
      sails.log('login check: ',bcrypt.compareSync(password, user.password));
    });

    // return bcrypt.compareSync(myPlaintextPassword, hashPassword);
  },
};
