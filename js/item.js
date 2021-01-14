$(function(){
let ItemName,quantity,price;    
let pic = document.getElementById('Pic');       
var canvas = document.querySelector("#showscreenshot");
var video = document.querySelector("#videoElement");
var stop = document.getElementById('stop');
var take = document.getElementById('take');
var addbtn = document.querySelector('.itAdding');
let isAdded = false;

function AutoRefresh(t){
  setTimeout("location.reload(true);",t);
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
 navigator.mediaDevices.getUserMedia({ video: true, audio:false })
   .then(function (stream) {
     video.srcObject = stream;
   })
   .catch(function (error) {
     console.log("Something went wrong!");
   });
}       

console.log(video);
function stopf() {
     
 var stream = video.srcObject;
   var tracks = stream.getTracks();

   for (var i = 0; i < tracks.length; i++) {
     var track = tracks[i];
     track.stop();
   }

   video.srcObject = null;
 }
    
function takescreenshot () {
 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;
 canvas.getContext("2d").drawImage(video, 0, 0);
 // Other browsers will fall back to image/png
 pic.src = canvas.toDataURL("image/webp");
};

$('#take').click(takescreenshot);
$('#stop').click(stopf);
if(addbtn){
addbtn.addEventListener("click",function(){
ItemName = document.getElementById('name').value;
quantity = document.getElementById('Quantity').value;
price = document.getElementById('price').value; 
pic = document.getElementById('Pic').src;
alert('clicked');
var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
     db.transaction((tx)=>{
       alert(ItemName);
     tx.executeSql('select name from Items where name = ?',[ItemName],function(tx,results){
      alert(results.rows.length);
      for(let i = 0; i<= results.rows.length;i++){
        if( results.rows.length > 0){ 
        if(results.rows.item(0).name === ItemName){
      alert('if');
          tx.executeSql('update Items set quantity = quantity + ? , price = ? , picture = ? where name = ?',[quantity,price,pic,ItemName])
          isAdded = true;
           
          // tx.executeSql('insert into Items set quantity = ? , price = ? , picture = ? where name = ?',[quantity,price,pic,ItemName],function(tx,results){

      alert(results.rows.item(0).name);
      // alert('results');
      alert("Your Item is added sucessfully!");
      break;
    }
 
}   
else{
  alert('else');
tx.executeSql('Insert into Items(name,quantity,price,picture) values(?,?,?,?)',[ItemName,quantity,price,pic]);
isAdded = true;
alert("Your Item is added sucessfully!");
break;
}

    }
     });
    //  if(isAdded){
    //    window.location.href = "file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/shop.html?";
    //  }
})

})
}
let gotoshop = document.getElementById('gotoshop');
if(gotoshop){
gotoshop.addEventListener("click",function(){
  setTimeout(() => {
    window.location.href = "file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/shop.html?";
    
  }, 500);
})
}
})
