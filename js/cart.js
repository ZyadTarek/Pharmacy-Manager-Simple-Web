$(function(){


    $('<div>').appendTo('#parent').addClass('card');
    $('<div>').appendTo('.card').addClass('card-header');
    $('<div>').appendTo('.card-header').addClass('my-2 mr-2 text-center').attr("id","title");
    $('<h3>').appendTo('#title').text('My Pharmacy Name');
    $('<strong>').appendTo('.card-header').text('Invoice: '+localStorage.date).attr("id","#date");
    // $('<span>').appendTo('.card-header').addClass('float-right').attr("id","status");
    // $('<strong>').appendTo('span').text('Status: Pending');
    $('<div>').appendTo('.card').addClass('card-body container');
    $('<div>').appendTo('.card-body').addClass('row mb-4');
    $('<div>').appendTo('.row.mb-4').addClass('col-sm-10');
    $('<h6>').appendTo('.col-sm-10').addClass('mb-3').text('Customer Details');
    $('<span>').appendTo('.card-body').addClass('float-right');
    $('<strong>').appendTo('.row.mb-4').text(`Username: ${localStorage.ActiveUser}`).addClass("px-3");
    $('<div>').appendTo('.col-sm-10').attr("id","details");
    $('<strong>').appendTo('#details').text("Name: "+localStorage.CustomerName);
    $('<p>').appendTo('#details').addClass('mt-2').text("Transaction Type: "+localStorage.TransactionType);
    $('<div>').appendTo('.card-body').addClass('table-responsive-sm');
    $('<table>').appendTo('.card-body').addClass('table table-striped');
    $('<thead>').appendTo('.card-body');
    $('<tr>').appendTo('thead');
    $('<th>').appendTo('tr').addClass('Indices center pr-5').text('#');
    $('<th>').appendTo('tr').addClass('Items pr-5').text('Item');
    $('<th>').appendTo('tr').addClass('Prices pr-5').text('Price');
    $('<th>').appendTo('tr').text('Quantity').addClass("q pr-5");
    $('<th>').appendTo('tr').addClass('UnitPrices pr-5').text('Unit Total Cost');
    $('<tbody>').appendTo('table');
    $('<tr>').appendTo('tbody');
    $('<tr>').appendTo('thead').attr("id","total");
    $('<td>').appendTo('#total').attr("id","totalAmount").addClass('py-3 pr-3');
    $('<strong>').appendTo('#totalAmount').text('Total Amount');
    $('<td>').appendTo('#total').text(localStorage.Total+" LE.").addClass('my-2');    
    var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction((tx)=>{
    tx.executeSql('Select item,quantity,price from Invoices where CustomerName = ? and type = ?',[localStorage.CustomerName,localStorage.TransactionType],function(tx,results){
    
    let unitpriceStr = localStorage.getItem("unitPrice")
    let sub = unitpriceStr.substr(1,unitpriceStr.length-2);
    let unitprice = sub.split(',');
    // alert(unitprice);

    for(let i = 0; i< results.rows.length;i++){
     $('<tr>').appendTo('.Indices.center.pr-5').addClass('center').attr("class","index").text(i+1);
     $('<tr>').appendTo('.Items.pr-5').addClass('left strong').attr("class","itemName").text(results.rows.item(i).item);
     $('<tr>').appendTo('.Prices.pr-5').addClass('left strong').attr("class","Price").text(results.rows.item(i).price);
     $('<tr>').appendTo('.UnitPrices').addClass('left strong').attr("class","UPrice").text(unitprice.shift());
     $('<tr>').appendTo('.q').addClass('left strong').attr("class","quantity").text(results.rows.item(i).quantity);

    }
     
    })
    })
    $('<div>').appendTo('.invoice').addClass('text-center logout').attr("id","logDiv");
     $('<button>').appendTo('#logDiv').addClass('w-100 btn btn-lg btn-outline-primary mt-5 text-light').text("Back to shop")
     .attr("id","back");
    //  $('<div>').appendTo('body').addClass('text-center logout');
     $('<a>').appendTo('#logDiv').text("Log out").attr("href","login.html").addClass('text-center')
     .css({"color":"#12a89d",});

    
     $('#back').click(function(){
         setTimeout(() => {
          window.location.href =  "file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/shop.html?";  
         }, 500);
     })
    // $('<button>').appendTo('.container.mt-5').addClass('w-100 btn btn-lg btn-outline-success mt-5').text("Done")
    // .attr("id","done").attr("data-toggle","modal").attr("data-target","mymodal");
  
    function generateModal(title,body){
        $('#mymodal').modal('show');
    }  

    $('#done').click(function(){
        setTimeout(() => {
            generateModal(" ","Transaction is done successfully!");
        }, 5000);
    })
    
}); 

 