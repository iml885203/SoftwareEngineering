/**
 * Project.js
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
      unique: true,
    },
    manager: {
      model: 'user',
      required: true,
    },
    members: {
      collection: 'user',
      via: 'joinProjects',
      dominant: true,
    },
  }
};
