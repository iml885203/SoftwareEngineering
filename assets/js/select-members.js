$(function(){
  $('.js-select-members').each(function() {
    let $searchInput = $('.search', this);
    let $memberList = $('.list', this);
    let $selectedMemberList = $('.selected-list', this);
    let getData = $.get('/api/user/getMemberList');

    // setting list.js data
    getData.then((data) => {
      let options = {
        valueNames: [ 'account', 'name', 'id' ],
        item: '<li class="js-select-members-trigger"><span class="name"></span><span class="account badge"></span><input type="hidden" class="id" style="display: none;"/></li>',
        page: 5,
      };
      let values = data.users;
      let hackerList = new List('hacker-list', options, values);

      $('.js-select-members-trigger').click(selectMember);

      function selectMember() {
        let $member = $('.id', this);
        $member.attr('name', 'members').attr('value', $member.text());
        $selectedMemberList.append($(this));
        hackerList.remove('account', $('.account', this).text());
        $(this).click(unSelectMember);
      }
      function unSelectMember() {
        $selectedMemberList.append($(this));
        hackerList.add({
          'account': $('.account', this).text(),
          'name': $('.name', this).text(),
        });
        $(this).remove();
        $('.js-select-members-trigger').click(selectMember);
      }
    });

    $memberList.hide();
    $searchInput.keyup(HideOrShowMemberList);

    function HideOrShowMemberList() {
      if($(this).val() === ''){
        $memberList.hide();
      }
      else{
        $memberList.show();
      }
    }


  });
});
