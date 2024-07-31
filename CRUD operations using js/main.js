let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchbytitle = document.getElementById("searchbytitle");
let searchbycategory = document.getElementById("searchbycategory");
let mood = 'Create'
let tmp;


// calculating the total price 
function getTotal(){
    if( price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = `Total : ${result}`;
        total.style.background = 'rgb(26, 135, 84)';
    }else{
        total.innerHTML = 'Total :';
        total.style.background = 'rgb(219, 53, 69)';
    }
}


// create new prod
let datapro;
if (localStorage.product != null){
    datapro = JSON.parse(localStorage.getItem('product'));
}else{
    datapro = [{
        title: 'oppo',
        price: '2000',
        taxes: '200',
        ads: '200',
        discount: '100',
        total: '2300',
        count: '8',
        category: 'mob',
    }];
    console.log('Local storage is empty');
}


submit.onclick = function (){
    
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    //check mood
    if(title.value != '' && price.value != '' && category.value !='' && newpro.count <= 100){
        if(mood==='Create'){

            //push new object in products array 
            if(newpro.count > 1)
                {
                    for(let i = 0; i < newpro.count; i++)
                    {
                        datapro.push(newpro);
                    }
                }
                else
                {
                    datapro.push(newpro);
                }
        }
        //else if mood is update
        else{
            datapro[tmp] = newpro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            submit.style.background = 'rgb(107, 117, 125)'
            count.style.display = 'block';
        }
    

    // save in local storage
    localStorage.setItem('product' , JSON.stringify(datapro));
    console.log(datapro);
    showdata();
    cleardata();
}
    else{
        alert('enter right data');
    }
}



// clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = 'Total :';
    count.value = '';
    category.value = '';
    total.style.background = 'rgb(219, 53, 69)';
}

// read data 
function showdata(){
    let table = '';
    
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" class="btn btn-success" id="update">Update</button></td>
                <td><button onclick="deleteItem(${i})" class="btn btn-danger" id="delete">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    // delete all button
    let deleteallbtn = document.getElementById('deleteall');
    if (datapro.length > 0){
        deleteallbtn.innerHTML = `
            <button onclick="deleteAll()" class="btn btn-danger" id="delete">Delete All (${datapro.length})</button>
        `
    }else {
        deleteallbtn.innerHTML = '';
    }
    
}
showdata();


// delete data row
function deleteItem(i)
{
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
    cleardata();
}

// delete all the products 
function deleteAll(){
    localStorage.clear(); // clear local storage
    datapro.splice(0); // clear the array
    showdata(); // refresh the page
    cleardata();
}

// update row 
function update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    total.innerHTML = datapro[i].total;
    count.style.display = 'none';
    category.value = datapro[i].category;
    total.style.background = 'rgb(26, 135, 84)';
    submit.innerHTML = 'Update';
    submit.style.background = 'rgb(26, 135, 84)';
    mood = 'Update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search by two modes 
let searchmood = 'title';

function getsearch(id){
    
    if(id === 'searchbytitle'){
        searchmood = 'title';
        search.placeholder = 'Search By Titlte';
    }else{
        searchmood = 'category';
        search.placeholder = 'Search By category';
    }
    search.focus();
    search.value = '';
    showdata();
}

function searchbydata(value){
    let table = '';
    for(let i = 0; i<datapro.length ; i++){
        if(searchmood === 'title')  // for title mood
        {
                if(datapro[i].title.includes(value.toLowerCase())){

                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" class="btn btn-success" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" class="btn btn-danger" id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }
        else  // for category mood
        {
                if(datapro[i].category.includes(value.toLowerCase())){

                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" class="btn btn-success" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" class="btn btn-danger" id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}