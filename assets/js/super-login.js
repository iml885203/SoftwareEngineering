$(function(){

  $('.js-super-login').each(function(){
    let self = this;
    $(self).click(function(){
      let account = $(this).data('account');
      $('input[name="account"]').val(account);
      $('input[name="password"]').val('password');
      $('form[action="login"]').submit();
    });
  });
});
