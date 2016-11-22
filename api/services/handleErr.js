module.exports = {
  handleValidateError: function(req, err){
    if(err.code === 'E_VALIDATION'){
      let errMessage;
      for(let key in err.Errors){
        req.addFlash('warning', err.Errors[key][0].message);
      }
    }
    else{
      req.addFlash('warning', err);
    }
    return;
  }
}
