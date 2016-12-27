$(function(){
  $('.c3').each(function() {
    let projectId = $(this).data('projectid');
    let target = $(this).data('target');
    let thisId = $(this).attr('id');
    $.get(`/api/project/${projectId}/?target=${target}`, function(data){
      OverviewTag = c3.generate({
        bindto: `#${thisId}`,
        data: {
          columns: data,
          type : 'pie',
        },
        tooltip: {
          format: {
            value: function (value, ratio, id, index) { return `${value}個`; }
          }
        },
      });
    });
  });
});
