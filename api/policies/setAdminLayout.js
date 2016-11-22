module.exports = function(req, res, next) {
  res.locals.layout = 'admin/layout';
  return next();
};
