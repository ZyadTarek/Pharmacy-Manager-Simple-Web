$(function(){
  function AutoRefresh(t){
    setTimeout("location.reload(true);",t);
  }
    $('<section>').appendTo('#access').addClass('container card my-1').attr("id","AccessSection");
    $('<div>').appendTo('.card').addClass('card-header');
    $('<div>').appendTo('.card-header').addClass('title my-2 mx-2 text-center').attr("id","title");
    $('<h3>').appendTo('.title').text('Accept users requests ');
    $('<div>').appendTo('.card').addClass('card-body');
    $('<p>').appendTo('#details').addClass('mt-2').text("Transaction Type: "+localStorage.TransactionType);
    $('<div>').appendTo('.card-body').addClass('table-responsive-sm text-center');
    $('<table>').appendTo('.card-body').addClass('table table-striped text-center');
    $('<thead>').appendTo('.card-body');
    $('<tr>').appendTo('thead');
    $('<th>').appendTo('tr').addClass('Indices center pr-5 pb-5').text('#').css({"line-height":"240%"});
    $('<th>').appendTo('tr').addClass('usernames center pr-5 pb-5').text('User Name').css({"line-height":"240%"});
    $('<th>').appendTo('tr').addClass('approve center pr-5 pb-5').text('Approve').css({"line-height":"300%"});
    $('<th>').appendTo('tr').addClass('reject center pr-5 pb-5').text('Reject').css({"line-height":"300%"});
    $('<tbody>').appendTo('table');
    $('<tr>').appendTo('tbody');
    var dbb = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
    dbb.transaction((tx)=>{
    tx.executeSql('Select name from Items order by rowid ',[],function(tx,results){
        $('#itemsNo').text(results.rows.length);
    })
})  
    var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction((tx)=>{
    tx.executeSql('Select username from Users where username != "Admin" order by rowid ',[],function(tx,results){
    $('#requestsNo').text(results.rows.length);
        for(let i = 0;i<results.rows.length;i++){
        // alert(results.rows.length);
     $('<tr>').appendTo('.Indices.center.pr-5').addClass('center mx-3').attr("class","index").text(i+1);
     $('<tr>').appendTo('.usernames.center.pr-5').addClass('left strong').attr("class","name").text(results.rows.item(i).username);
     $('<div>').appendTo('.approve.center.pr-5').addClass('row d-flex container success');
     $('<div>').appendTo('.reject.center.pr-5').addClass('row d-flex container danger');
    }
    $('<button>').appendTo('.success').addClass('btn btn-outline-success').attr("type","submit").text('Approve');
    $('<button>').appendTo('.danger').addClass('btn btn-outline-danger').attr("type","submit").text('Reject');
     

      $('.btn-outline-danger').click(function(){
        $(this).addClass('ClickedDanger');
        let dangerBtns = $('.btn-outline-danger');
        alert(dangerBtns.length);
        for(let i =1;i<=dangerBtns.length;i++){
          if($('.btn-outline-danger').eq(i-1).hasClass('ClickedDanger')){
            var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
            db.transaction((tx)=>{ 
           tx.executeSql('update Users set hasAccess = "no" where rowid = ?',[i+1]);
            $(this).removeClass('ClickedDanger');
          })
          AutoRefresh(1000);
          break;
          }

        }
        })
        $('.btn-outline-success').click(function(){
          $(this).addClass('ClickedSuccess');
          let dangerBtns = $('.btn-outline-success');
          alert(dangerBtns.length);
          for(let i =1;i<=dangerBtns.length;i++){
            if($('.btn-outline-success').eq(i-1).hasClass('ClickedSuccess')){
               alert(i);
              var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
              db.transaction((tx)=>{ 
             tx.executeSql('update Users set hasAccess = "yes" where rowid = ?',[i+1]);
             $(this).removeClass('ClickedSuccess');
            })
          AutoRefresh(1000);
            break;
            }
  
          }
          })
        
    })
  }) 
  $('#cart').click(function(){
    window.location.href = "file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/cart.html?";
  })
})