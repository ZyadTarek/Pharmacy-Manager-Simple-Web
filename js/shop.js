$(function(){
let div = $('.last');
console.log(div);
let Id;
let Name;
let pic;
var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
db.transaction((tx)=>{
tx.executeSql('Select name,price,quantity,picture from Items',[],function(tx,results){
var len = results.rows.length,i;

// console.log(id);
// console.log(Name);
for(i = 0;i<len;i++){
 if(results.rows.item(i).name &&
 results.rows.item(i).picture){ 
    console.log(results.rows.item(i).name);
    console.log(results.rows.item(i).quantity);
    console.log(results.rows.item(i).picture);    
 let parent = document.getElementById('row');
 let newItem = document.createElement('div');
 parent.appendChild(newItem);
$('#row').children().addClass('col-md-4');
 let column = document.querySelectorAll('.col-md-4');
 console.log(column);
 let card = document.createElement('div');
 console.log(card);
//  let img = "<img/>";
 for(let j =0;j< column.length;j++){
 column[j].appendChild(card);
 $('.col-md-4').children().addClass('card mb-2');
//  console.log(img);
}

   }
  }
  $('<img/>').appendTo($('.card')).addClass('items');
  let imgs = document.querySelectorAll('.items');
  for(let k =0;k<results.rows.length;k++){
     if(imgs[k].getAttribute('class') == "items") 
   imgs[k].setAttribute('src',results.rows.item(k).picture);
//    $('img').last().attr("src",results.rows.item(k).picture);
  }
  $("<div>").appendTo($('.card')).addClass('card-body');
  $('<h4>').appendTo($('.card-body'));
  $('<h5>').appendTo($('.card-body'));
  let h4 = document.querySelectorAll('h4');
  let h5 = document.querySelectorAll('h5');
    for(let g =0;g<results.rows.length;g++){
    h4[g].innerHTML = results.rows.item(g).name;
    h5[g].innerHTML = "EGP "+results.rows.item(g).price;
   }
   $('<h6>').appendTo($('.card-body'));
   let h6 = document.querySelectorAll('h6');
     for(let f =0;f<results.rows.length;f++){
     h6[f].innerHTML = "In stock: "+ results.rows.item(f).quantity;
    }
    $('<div>').appendTo($('.card')).addClass('card-footer');
    $('<button>').appendTo($('.card-footer')).addClass('btn btn-primary cartBtn');
    $('.btn.btn-primary').html('<i class="bi bi-cart2"></i> ' +'Add to Cart').css({"background-color":"#12a89d"});
    let search;
    $('#searchbtn').click(function(){
        search = document.getElementById('search').value;
        // if($('h5').text() == search){
        console.log("Clicked")
        localStorage.search = search;
        // for(let v =0;v<results.rows.length;v++){
        //     if(search == results.rows.item(v).name){

        //     }
        //    }
       $('h4').each(function(){
         if((search) && ($(this).text() !== search)){
            $('.btn').addClass('Clicked');
            $(this).parent().parent().parent().remove();
        //   if($('.col-md-4')== undefined)  
        //  $('#row').html("<p>Sorry, This item is out of stock!</p>"); 

         }
         else if($(this).text() === search){
         $('#row').innerHTML = $(this).parent().parent(); 
         }

       })
       let counter = 0;
       let username;
    $(".cartBtn").click(function(){
        localStorage.price = Number($(this).parent().parent().children().find('h5').html().split(' ').pop());
        window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/order.html?";
    })

    // else{
    //     $('h5').parent().parent().parent().html('');
    // }
    })
    })
 })

 let RightArrow = document.querySelector('#right');
 if(RightArrow){
   RightArrow.addEventListener("click",function(){
  setTimeout(function(){
   window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/item.html?";

 },500)
  })
 }
         $('#cart').click(function(){
          window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/cart.html?";
         })
})