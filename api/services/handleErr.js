module.exports = {
  handleValidateError: function(req, err){
    if(err.code === 'E_VALIDATION'){
      for(let key in err.Errors){
        req.addFlash('warning', err.Errors[key][0].message);
      }
    }
    else{
      sails.log.error(err);
      req.addFlash('warning', err);
    }
    return;
  }
}
