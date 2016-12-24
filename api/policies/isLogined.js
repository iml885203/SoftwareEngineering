/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    if(typeof req.session.superLoginCount === 'undefined'){
      req.session.superLoginCount = 0;
    }
    if(req.url === '/project/create'){
      req.session.superLoginCount++;
    }
    req.session.loginBeforeURL = req.url;
    return res.redirect('/auth/login');
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
};
