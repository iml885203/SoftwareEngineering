/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    connection: 'someMongodbServer',
    type: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
    },
    workTime: {
      type: 'integer',
    },

    //issue
    issue: {
      model: 'issue',
      required: true,
    },

    //User
    createUser: {
      model: 'user',
      required: true,
    },
    targetUser: {
      model: 'user',
    },
  }
};
