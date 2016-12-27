$(function(){
  $('.js-issues-list').each(function() {
    var issuesList = new List('issues-list', {
      valueNames: [
        'name',
        'createdAt',
        'state',
        'priority',
        'tag',
        'assignUser',
      ],
      page: 10,
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

    $('.filter-issue', this).on('click', function(){
      issuesList.filter();
      let filterAttr = $(this).data('attr');
      let filterVal = $(this).data('val');

      if(typeof filterAttr != 'undefined' && typeof filterVal != 'undefined'){
        issuesList.filter(function(issue){
          // console.log();
          if(issue.values()[filterAttr].trim() === filterVal){
            return true;
          }
          else{
            return false;
          }
        });
      }

    });
  });
});
