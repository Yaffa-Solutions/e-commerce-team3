import {products , categories} from './data.js';

const getElement =(elem)=> document.querySelector(elem);



const renderSelect =()=>{
  const SelectCategories = getElement('#SelectCategories');
  categories.forEach(c=>{
     const categoryOption=document.createElement('option');
      categoryOption.textContent =c.categoryName;
      categoryOption.setAttribute('data-id',c.categoryId);
      SelectCategories.appendChild(categoryOption);
  });

}

const RenderListProducts=(lst)=>{
    
    const tbodyProducts = document.getElementById('tbodyProducts');

    tbodyProducts.innerHTML =``;
    lst.length > 0 ?
    lst.forEach(product => {
    if(product.id > 0 ){
           const tr = document.createElement('tr');
        if(product.image){
            const td = createCells('');
            const imgProduct=document.createElement('img');
            imgProduct.src=product.image;
            td.appendChild(imgProduct);
            td.className = `mask mask-squircle h-12 w-12`;
            tr.appendChild(td);
        }
       // tr.appendChild(createCells(product.id)); 
        tr.setAttribute('data-id',product.id);
        tr.appendChild(createCells(product.title,'font-semibold'));
        tr.appendChild(createCells(product.description));
        tr.appendChild(createCells(getCategory(product.categoryId).categoryName));
        tr.appendChild(createCells(product.price));
        tr.appendChild(createButton('Edit','btn btn-ghost btn-xs mt-4','editBtn'));
        tr.appendChild(createButton('Delete','btn btn-ghost btn-xs mt-4','deleteBtn'));
       
        tbodyProducts.appendChild(tr);
    }else{
      console.log('the product id is null');
    }

    }) : console.log('the length list 0');
    
}

const createCells = (text, classname)=>{
      const td = document.createElement('td');
      td.textContent = text;
      if(classname) td.className=classname;
      return td;
};

function createButton (text , className='' , id =''){
    const btn = document.createElement('button');
    if(id) btn.id=id;
    if(className) btn.className = className;
    if(text) btn.textContent= text;
 
    return btn;
}

window.onload =()=>{
    const retrievedJsonString = localStorage.getItem('myProducts');
    const retrievedProducts = JSON.parse(retrievedJsonString);
    retrievedProducts ?  RenderListProducts(retrievedProducts): RenderListProducts(products);
   //RenderListProducts(products);
    renderSelect();
}


function getNonEmptyInputValues(form) {
  const data = {};
  //const inputs = Array.from(form.querySelectorAll('input, select'));
    const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    const value = input.value.trim();
    if ( value !== '' && !(input.tagName.toLowerCase() === 'select' && input.selectedIndex === 0) ) {
      const key =  input.name || 'unknown';
      if(input.tagName.toLowerCase() === 'select'){
        const selectedOption = input.options[input.selectedIndex];
        data[key]= selectedOption.getAttribute('data-id');
      }else{
        data[key]=value;
      }  
    }
  });
  return data;
}

const getCategory =(id)=>{ return (id) ? categories.find(c=>c.categoryId == id) : ''; }

const form = document.getElementById('addProductForm');
const addBtn = getElement('#AddBtn');

addBtn.addEventListener('click', e => {
  //e.preventDefault(); 

  debugger;
  const formData = getNonEmptyInputValues(form);
  console.log('Collected form data:', formData);

  const maxIdProduct = Math.max(...products.map(p=>p.id));
  formData.categoryId = getCategory(formData.categoryId).categoryId;
  formData.id = maxIdProduct+1;
  products.push({...formData});
  console.log(products);
  ///convert the array to json 
  const jsonString = JSON.stringify(products);
  localStorage.setItem('myProducts',jsonString);
  form.reset();

});


const cancelModalBtn = getElement('#cancelModalBtn');
const ModelAddProduct = getElement('#ModelAddProduct');

cancelModalBtn.addEventListener('click',(e)=>{
  e.preventDefault();
 // ModelAddProduct.classList.add('hidden');
 ModelAddProduct.style.display='none';
 document.getElementById('add-product-modal').checked = false;
});

const addproductmodalbtn = getElement('#add-product-modal');

addproductmodalbtn.addEventListener('click',()=>{
  //ModelAddProduct.classList.remove('hidden');
ModelAddProduct.style.display='block';

});


const inputSearch = getElement('#inputSearch');
let productsListCopy =[...products ];

inputSearch.addEventListener('input',()=>{

  ///clean the table
   refershList();
   //return the list filter 
   debugger;
  const lstfiltered=searchByProductName(productsListCopy,inputSearch.value);
  RenderListProducts(lstfiltered);
});

const searchByProductName=(lstProducts,text)=>{
    const lst = lstProducts.filter(p=>p.title.toLowerCase().trim().includes(text.toLowerCase().trim()));
    return lst;
}

const refershList=()=>{
  RenderListProducts([{}]);
}

/// filter 
///when make search in filter --> you must make search list categories 

const SelectCategories = getElement('#SelectCategories');

 SelectCategories.addEventListener('change',()=>{
  inputSearch.value='';
  if(SelectCategories.selectedIndex > 0)  {
  const categoryId= SelectCategories.options[SelectCategories.selectedIndex].getAttribute('data-id');
    productsListCopy=products.filter(p=>p.categoryId == categoryId);
  const lst = products.filter(p=>p.categoryId == categoryId);
  RenderListProducts(lst);

  }else{
    RenderListProducts(products);
  }
 });
