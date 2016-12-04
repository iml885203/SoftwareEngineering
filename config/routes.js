/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'home.index',

  //Auth
  'GET /auth/login': 'Auth.index',
  'POST /auth/login': 'Auth.login',
  'GET /auth/logout': 'Auth.logout',
  'GET /auth/show': 'Auth.show',
  //AuthApi
  'GET /auth/checkname': 'Auth.checkNameRepeat',
  //Project前台
  'GET /project': 'Project.index',
  'GET /project/myProject': 'Project.myProject',
  'GET /project/create': 'Project.create',
  'POST /project/create': 'Project.store',
  'GET /project/:id': 'Project.show',
  //Issue
  'GET /project/:id/issue/create': 'Issue.create',
  'GET /project/:id/issue/store': 'Issue.store',
  'GET /project/:id/issue': 'Issue.index',
  'GET /project/:id/issue/:issueId': 'Issue.show',

  // ----------
  // admin-----
  // ----------
  'GET /admin': 'admin/home.index',
  //User
  'GET /admin/user': 'admin/User.index',
  'GET /admin/user/create': 'admin/User.create',
  'POST /admin/user/create': 'admin/User.store',
  'GET /admin/user/edit/:id': 'admin/User.edit',
  'UPDATE /admin/user/edit/:id': 'admin/User.update',
  'DELETE /admin/user/delete/:id': 'admin/User.delete',

  //Project
  'GET /admin/project': 'admin/Project.index',
  // 'GET /admin/project/:id': 'admin/Project.show',
  'GET /admin/project/create': 'admin/Project.create',
  'POST /admin/project/create': 'admin/Project.store',
  // 'GET /admin/project/edit/:id': 'admin/Project.edit',
  // 'UPDATE /admin/project/edit/:id': 'admin/Project.update',
  'DELETE /admin/project/delete/:id': 'admin/Project.delete',

  // ----------
  // api-----
  // ----------
  'GET /api/user/getMemberList': 'api/User.getMemberList',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
