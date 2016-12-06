/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */

module.exports.seeds = {
  user: {
    data: [
      {
        account: 'admin',
        name: '大中天',
        password: 'password',
        permission: 'SuperAdmin',
      },
      {
        account: 'user1',
        name: '攻城屍1',
        password: 'password',
        permission: 'user',
      },
      {
        account: 'user2',
        name: '攻城屍2',
        password: 'password',
        permission: 'user',
      },
      {
        account: 'user3',
        name: '攻城屍3',
        password: 'password',
        permission: 'user',
      },
      {
        account: 'user4',
        name: '攻城屍4',
        password: 'password',
        permission: 'user',
      },
    ],
    overwrite: false
  },
}
