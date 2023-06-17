let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tmp;

let mood = 'Create';


// get total

function GetTotal()
{
   if(price.value !='')
   {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result ; 
        total.style.background ="green"
    }
    else
    {
        total.innerHTML = '' ; 
        total.style.background ="red"

    }
}

// create product
let dataPro;
if(localStorage.product != null)
{dataPro = JSON.parse(localStorage.product)}
else{dataPro =[];}
submit.onclick = function()
{
    let newPro = 
    {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
  if(title.value !='' && newPro.count <100 ){
    if(mood === 'Create')
{
    if(newPro.count >1 )
        {for( let i=0 ;i< newPro.count; i++){dataPro.push(newPro)}}
    else {dataPro.push(newPro)}
}
else
    {
    dataPro[ tmp] = newPro;
    mood= 'Create';
    submit.innerHTML = 'Create';
    count.style.display = 'block'
    clearData()
    } 
}

//// save storage ////
   localStorage.setItem('product',JSON.stringify(dataPro))
    readData()
    clearData()
}

//clear data //
function clearData()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    readData()
}
 //read data  //
function readData()
{
    GetTotal()
    let table ='';
  for (let i=0; i< dataPro.length;i++)
     {     
    table +=
    `<tr>
    <td> ${i} </td>
    <td> ${dataPro[i].title}</td>
    <td> ${dataPro[i].price}</td>
    <td> ${dataPro[i].taxes}</td>
    <td> ${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td> ${dataPro[i].count}</td>
    <td> ${dataPro[i].category}</td>
    <td><button onclick='upadteData(${i})'id="update"> Update</button></td>
    <td><button onclick='deleteData(${i})' id="Delete"> Delete</button></td>
</tr>`;}
     document.getElementById('tbody').innerHTML = table ;
     let Delete = document.getElementById('deleteAll');
     if(dataPro.length > 0)
    {Delete.innerHTML =`<button onclick="deleteall()"> Delete ALL</button>`}
    else{Delete.innerHTML ='';}
    } 
    readData()
    
// delete //
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    readData()
}

/// delete all /// 
function deleteall()
{
    localStorage.clear()
    dataPro.splice(0)
    readData()
}

// update //
function upadteData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    GetTotal()
    count.style.display = 'none';
    submit.innerHTML ="Update";
    mood= 'Update' ;
    tmp=i;
    scroll({top : 0, behavior : 'smooth',})
}
/// search ///

let searchmood ='title';

function searchMode(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {searchmood ='title';}
    else{searchmood ='category';}
    search.placeholder = 'Search By ' + searchmood;
    search.focus();
    search.value ='';
    readData()
}
/// searchData /// 
function searchData(value)
{
    let table;
    for (let i= 0 ; i<dataPro.length ; i++)
{
        if(searchmood == 'title'){
            if(dataPro.title.includes(value.toLowerCase()))
                    {
                    table +=
                            `<tr>
                            <td> ${i} </td>
                            <td> ${dataPro[i].title}</td>
                            <td> ${dataPro[i].price}</td>
                            <td> ${dataPro[i].taxes}</td>
                            <td> ${dataPro[i].ads}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].total}</td>
                            <td> ${dataPro[i].category}</td>
                            <td><button onclick='upadteData(${i})'id="update"> Update</button></td>
                            <td><button onclick='deleteData(${i})' id="Delete"> Delete</button></td>
                        </tr>`;  
                    }
        }
    else{
            if(dataPro.category.includes(value.toLowerCase()))
                    {
                    table +=
                            `<tr>
                            <td> ${i} </td>
                            <td> ${dataPro[i].title}</td>
                            <td> ${dataPro[i].price}</td>
                            <td> ${dataPro[i].taxes}</td>
                            <td> ${dataPro[i].ads}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].total}</td>
                            <td> ${dataPro[i].category}</td>
                            <td><button onclick='upadteData(${i})'id="update"> Update</button></td>
                            <td><button onclick='deleteData(${i})' id="Delete"> Delete</button></td>
                        </tr>`;
                        }   
    } 
}
 document.getElementById('tbody').innerHTML = table;   
}
      