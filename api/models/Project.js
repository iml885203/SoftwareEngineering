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
    info: {
      type: 'string',
      required: true,
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

    //issue
    issues: {
      collection: 'issue',
      via: 'belongProject',
    },
  },

  validationMessages: {
    name: {
      required: '名稱 必須輸入',
      unique: '名稱 已被使用'
    },
    info: {
      required: '專案描述 必須輸入',
    },
    manager: {
      required: '缺少專案管理員ＱＱ',
    },
  },

  getById: function(id, callback){
    Project.findOneById(id)
		.populate('manager')
		.populate('members')
    .populate('issues')
		.then( (project) => {
      if(!project){
        return callback(new Error('找不到此專案'), null);
      }
      return callback(null, project);
		})
		.catch( (err) => {
      return callback(err, null);
		});
  }
};
