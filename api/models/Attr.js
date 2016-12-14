/**
 * Attr.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  permission: [
    'SuperAdmin',
    'user',
  ],

  issueState: [
    'new',
    'assigned',
    'solved',
    'end',
    'sleep',
  ],

  issuePriority: [
    'normal',
    'important',
    'critical',
  ],

  issueTag: [
    'BUG',
    'feature',
    'patch',
  ],

  issueFieldName: {
    'name': {
      'name': '標題',
      'showValue': false,
    },
    'info': {
      'name': '描述',
      'showValue': false,
    },
    'state': {
      'name': '狀態',
      'showValue': true,
    },
    'priority': {
      'name': '重要性',
      'showValue': true,
    },
    'tag': {
      'name': '標籤',
      'showValue': true,
    },
  },

  labelType: {
    'normal' : 'default',
    'important' : 'warning',
    'critical' : 'danger',
    'BUG' : 'danger',
    'feature' : 'info',
    'patch' : 'success',
    'new' : 'primary',
    'assigned' : 'primary',
    'solved' : 'success',
    'end' : 'warning',
    'sleep' : 'default',
  }
};
