$(function(){
  $('.js-issues-list').each(function() {
    var issuesList = new List('issues-list', {
      valueNames: [
        'name',
        'state',
        'priority',
        'tag',
        'assignUser',
      ],
      page: 5,
      plugins: [ ListPagination({
        innerWindow: 2,
        outerWindow: 1,
      })]
    });
    $(this).fadeIn();
    $('.sort').on('click', clickSort);

    function clickSort(){
      let $triangleTop = '<span class="glyphicon glyphicon-triangle-top"></span>';
      let $triangleBottom = '<span class="glyphicon glyphicon-triangle-bottom"></span>';
      if($('.glyphicon', this).length === 0 ||
         $('.glyphicon-triangle-top', this).length != 0){
        clearSortText();
        $(this).append($triangleBottom);
      }
      else{
        clearSortText();
        $(this).append($triangleTop);
      }
    }

    function clearSortText(){
      $('.sort').each(function(){
        let text = $(this).text();
        $(this).empty().text(text);
      });
    }
  });
});
