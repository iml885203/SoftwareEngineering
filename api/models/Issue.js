/**
 * Issue.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'someMongodbServer',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    info:{
      type: 'string',
      required: true,
    },
    state:{
      type: 'string',
      required: true,
      defaultsTo: 'new',
    },
    priority: {
      type: 'string',
      required: true,
    },
    tag: {
      type: 'string',
    },

    //User
    createUser: {
      model: 'user',
      required: true,
    },
    assignUser: {
      model: 'user',
    },

    //Project
    belongProject: {
      model: 'project',
      required: true,
    },

    //log
    logs: {
      collection: 'log',
      via: 'issue',
    },
    //comment
    comments: {
      collection: 'comment',
      via: 'issue',
    },
  }
};
