/**
 * Attr.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  permission: [
    'SuperAdmin',
    'UserAdmin',
    'ProjectAdmin',
    'IssueAdmin',
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
};
