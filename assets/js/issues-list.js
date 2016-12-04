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
      page: 2,
      plugins: [ ListPagination({
        innerWindow: 2,
        outerWindow: 1,
      })]
    });
  });
});
