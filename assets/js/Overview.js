var OverviewState = c3.generate({
      bindto:"#OverviewState",
      data: {
          // iris data from R
          columns: [
            ["A", 100],
            ["B", 100],
          ],
          type : 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }
  });

  var OverviewPriority = c3.generate({
        bindto:"#OverviewPriority",
        data: {
            // iris data from R
            columns: [
              ["C", 100],
              ["D", 100],
            ],
            type : 'pie',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
    });

    var OverviewTag = c3.generate({
          bindto:"#OverviewTag",
          data: {
              // iris data from R
              columns: [
                ["E", 100],
                ["F", 100],
              ],
              type : 'pie',
              onclick: function (d, i) { console.log("onclick", d, i); },
              onmouseover: function (d, i) { console.log("onmouseover", d, i); },
              onmouseout: function (d, i) { console.log("onmouseout", d, i); }
          }
      });
