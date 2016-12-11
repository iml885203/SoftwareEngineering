/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    connection: 'someMongodbServer',
    content: {
      type: 'string',
      required: true,
    },
    workTime: {
      type: 'integer',
    },

    //issue
    issue: {
      model: 'issue',
      required: true,
    },
  }
};
