$(function(){
    let CustName,type,option,itemName,quantity,date,price; 
    itemName = document.getElementById('item');
    price = document.getElementById('price');
    itemName.value = localStorage.search;
    price.value = localStorage.price; 
    $('#item').prop("disabled",true);
    $('.btn').click(function(){
        console.log('Clicked');
        CustName = document.getElementById('cust').value;
        type = document.getElementById('select');
        option= type.options[type.selectedIndex].text;
        itemName = document.getElementById('item').value;
        price = document.getElementById('price').value;
        quantity = document.getElementById('quan').value;
        date = document.getElementById('date').value;
        localStorage.date = date;
        localStorage.CustomerName = CustName;
        localStorage.TransactionType = option;
        console.log(CustName,option,itemName,quantity,date);
        var db = openDatabase('Pharmacy Management', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction((tx)=>{
        tx.executeSql('select quantity from Items where name = ?',[itemName],function(tx,results){
        if(results.rows.item(0).quantity <= 0){
        alert('Sorry, This item isout of stock!');
        // tx.executeSql('delete from Items where name = ?',[itemName]);
        }else{       
        tx.executeSql('insert into Invoices(date,CustomerName,type,item,price,quantity) values(?,?,?,?,?,?)',[date,CustName,option,itemName,price,quantity]);
        if(option === "Sell")
        tx.executeSql('update Items set quantity = quantity - ? where name = ?',[quantity,itemName]);
        else 
        tx.executeSql('update Items set quantity = quantity + ? where name = ?',[quantity,itemName]);
        }
        tx.executeSql('select price,quantity from Invoices where CustomerName = ?',[CustName],function(tx,results){
        let unitPrice = [],total = 0;
        for(let j = 0;j<results.rows.length;j++){
            alert(results.rows.item(j).price);
            unitPrice[j] = Number((results.rows.item(j).price)* (results.rows.item(j).quantity));
            total += Number((results.rows.item(j).price) * (results.rows.item(j).quantity));
            
        }    
        alert(unitPrice);
        alert(total);
        localStorage.setItem("unitPrice",JSON.stringify(unitPrice));
        localStorage.Total = total;
    });
        });
        })      
    })
    $('.btn-secondary').mouseup(function(){
        setTimeout(() => {
            console.log('Clicked');
            window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/shop.html?";    
        }, 500);
        CustName = localStorage;
        
    })

    $('.btn-primary').mouseup(function(){
        setTimeout(() => {
        window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/cart.html?";    
            
        }, 10000);
    })
    $('#cart').click(function(){
        window.location.href ="file:///G:/ITI/jquery/Pharmacy%20manager%20simple%20web/cart.html?";    

    })
})