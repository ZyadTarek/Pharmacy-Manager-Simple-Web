$(function(){
 let ok = false;
 var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
function AutoRefresh(t){
  setTimeout("location.reload(true);",t);
}
db.transaction((tx)=>{
  let Adminpass = CryptoJS.MD5("123"); 
  tx.executeSql("Create table if not exists Users(username unique,password,hasAccess)");
  tx.executeSql("Create table if not exists Items(id unique ,name,quantity,price,picture)");
  tx.executeSql("Create table if not exists Invoices(date,CustomerName,type,item,price,quantity)");
  tx.executeSql('Insert into Users(username,password,hasAccess) values(?,?,?)',["Admin",Adminpass,"yes"]);
 });
    // get new user
    var newuser,newpass,hasAccess;
    let signupbtn = document.getElementById('signup');
    if(signupbtn){
    signupbtn.addEventListener("click",function(){
    console.log("Clicked");  
    newuser = document.getElementById('Nuser').value;
    newpass = CryptoJS.MD5(document.getElementById('Npass').value);
    // alert(require(newpass));
    hasAccess = "no";
    console.log(newuser);
    console.log(newpass);
    let reg = /admin/i;
    if((!(reg.test(newuser)))){
      ok = true;
    var db2 = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
    db2.transaction((tx2)=>{
     if(newuser && newpass){ 
    tx2.executeSql('Insert into Users(username,password,hasAccess) values(?,?,?)',[newuser,newpass,hasAccess]);
    alert(`Welcome ${newuser}`);
    ok = true;
    }
    else{
      alert(console.error());
    }  
   });
   
  }else{
    alert("Sorry, This user name already exists");
    AutoRefresh(0);

  }
 
   });
   signupbtn.addEventListener("focusin",function(){  
     if(ok){
    setTimeout(function(){
     window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/login.html?";

   },500)
  }
    })
 } 
   let leftArrow = document.querySelector('#left');
    if(leftArrow){
     leftArrow.addEventListener("click",function(){
     setTimeout(function(){
      window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/login.html?";

    },500)
     })
    }
  
    //login
    var user;
    var pass;
    let msg = '';
    let loginbtn = document.getElementById('loginbtn');
    let isSuccessful = false;
    if(loginbtn){
    loginbtn.addEventListener("click",function(e){
      user = document.getElementById('User').value;
      pass = CryptoJS.MD5(document.getElementById('Pass').value);
      alert(pass);
    console.log("Clicked");
    console.log(user);
      var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
      db.transaction((tx)=>{
      tx.executeSql('Select username,password,hasAccess from Users',[],function(tx,results){
      var len = results.rows.length,i;
      console.log(len);
      // console.log(results.rows.item(1).username);
      // console.log(results.rows.item(1).password);
      console.log(user);
      console.log(pass);
      for(i = 0;i<len;i++){
       if(user == results.rows.item(i).username && 
       pass == results.rows.item(i).password){ 
        if(results.rows.item(i).hasAccess != "yes"){
         msg = "Sorry, you stil do not have access to the system!";
         break; 
        }else{
        msg ="Login Suceeded";
        isSuccessful = true; 
        localStorage.ActiveUser = user;
         break;      
        }
       }else
         msg ="Username or Password is incorrect!";
         isSuccessful = false;
      }
      alert(msg);
      if(isSuccessful){
       if(user === "Admin")
        window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/dashboard.html?";
        else if (user !== "Admin") 
        window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/shop.html?";

      }
      });
          
    })
  })
}
$('#cart').click(function(){
  alert('You have to sign in firstly in order to access this feature');
})
$('#shop').click(function(){
  alert('You have to sign in firstly in order to access this feature');
})


})