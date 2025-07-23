import {products , categories , Product} from './data.js';

const getElement =(elem)=> document.querySelector(elem);

// let products =[...products ];


  

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
        tr.appendChild(createCells(product.ProductName,'font-semibold'));
        tr.appendChild(createCells(product.description));
        tr.appendChild(createCells(getCategory(product.categoryId).categoryName));
        tr.appendChild(createCells(`${product.price} $`,'text-md font-bold'));
        tr.appendChild(createButton('Edit',' editBtn btn btn-ghost btn-xs mt-4',product.id));
        tr.appendChild(createButton('Delete','deleteBtn btn btn-ghost text-red-500 btn-xs mt-4',product.id));
       
        tbodyProducts.appendChild(tr);
       
    }else{
      console.log('the product id is null');
    }

    }) : console.log('the length list 0');
      getElement('#productCount').textContent = `Total Products: ${lst.length}`;

    attachEditEvent();
    attachDeleteEvent();
}

const getCategory =(id)=>{ return (id) ? categories.find(c=>c.categoryId == id) : ''; }

const SelectCategoriesFilter = getElement('#SelectCategories');
window.onload =()=>{
  const SelectCategories = getElement('#SelectCategories2');

  if (!localStorage.getItem('myProducts')) {
    localStorage.setItem('myProducts', JSON.stringify([]));
   }
 // let retrievedJsonString = localStorage.getItem('myProducts');
   products.length = 0; 
   products.push(...JSON.parse(localStorage.getItem('myProducts')));
   if (products.length > 0) {
    const maxId = Math.max(...products.map(p => p.id));
    Product.currentId = maxId + 1;
  } else {
    Product.currentId = 1;
  }
   RenderListProducts(products);
   renderSelect(categories,SelectCategories);
   renderSelect(categories,SelectCategoriesFilter);
}

let countInputs=0;
function getNonEmptyInputValues(form) {
  const data = {};
  //const inputs = Array.from(form.querySelectorAll('input, select'));
    const inputs = form.querySelectorAll('input, select');
    countInputs = inputs.length;
  inputs.forEach(input => {
    const value = input.value.trim();
   if (value !== '') {
   const key = input.name || 'unknown';
   if (input.tagName.toLowerCase() === 'select') {
    const selectedOption = input.options[input.selectedIndex];
    const selectedDataId = selectedOption.getAttribute('data-id');

    if (selectedDataId) {
      data[key] = selectedDataId;
    }
   } else {
    data[key] = value;
  }
}
  });
  return data;
}


const form = document.getElementById('addProductForm');
const addBtn = getElement('#AddBtn');
  
addBtn.addEventListener('click', e => {
  
  const formData = getNonEmptyInputValues(form);
  const allFields = ['ProductName', 'description', 'price', 'image', 'categoryId'];
  const userInputData=Object.keys(formData);
  const emptydata = allFields.filter(f=> !userInputData.includes(f));
  
  e.preventDefault();

  if(Object.keys(formData).length == countInputs){
  
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      errorMessage.textContent = 'Please enter a valid price greater than 0';
      return;
    }
    formData.categoryId = getCategory(formData.categoryId).categoryId;

    const newProduct=new Product(formData);
    products.unshift(newProduct);
    console.log(products);
   ///convert the array to json 
    const jsonString = JSON.stringify(products);
    localStorage.setItem('myProducts',jsonString);
    form.reset();
    RenderListProducts(products);
    getElement('#errorMessage').textContent='';
    SelectCategories.selectedIndex = 0;
    inputSearch.value='';
  }
  else{

    emptydata.includes('categoryId') ? getElement('#errorMessage').textContent =`please Choose the Category` : getElement('#errorMessage').textContent =`please enter data ${emptydata.join(',')}`;
  }
 
});


/////cancel btn
const cancelModalBtn = getElement('#cancelModalBtn');
const ModelAddProduct = getElement('#ModelAddProduct');
cancelModalBtn.addEventListener('click',(e)=>{
  e.preventDefault();
 // ModelAddProduct.classList.add('hidden');
 ModelAddProduct.style.display='none';
 document.getElementById('add-product-modal').checked = false;
});


///show model
const addproductmodalbtn = getElement('#add-product-modal');
addproductmodalbtn.addEventListener('click',()=>{
  //ModelAddProduct.classList.remove('hidden');
ModelAddProduct.style.display='block';

});


const inputSearch = getElement('#inputSearch');
let productsSearch =[];
inputSearch.addEventListener('input',()=>{

  ///clean the table
   refershList();
   debugger;
   //return the list filter 
   ///base list if the user search without filter 
     const baseList = productsSearch.length > 0 ? productsSearch : products;

  const lstfiltered=searchByProductName(baseList,inputSearch.value);
  RenderListProducts(lstfiltered);
});

const refershList=()=>{
  RenderListProducts([{}]);
}

/// filter 

 products.length = 0;
 products.push(...JSON.parse(localStorage.getItem('myProducts')));

 SelectCategoriesFilter.addEventListener('change',()=>{
  inputSearch.value='';

  if(SelectCategoriesFilter.selectedIndex > 0)  {  

    const categoryId= SelectCategoriesFilter.options[SelectCategoriesFilter.selectedIndex].getAttribute('data-id');
    productsSearch=products.filter(p=>p.categoryId == categoryId);
     const lst = products.filter(p=>p.categoryId == categoryId);
    RenderListProducts(lst);
  }else{
    //alert('done');
    productsSearch=products;
    RenderListProducts(JSON.parse(localStorage.getItem('myProducts')));
  }
 });


 //////////////Edit 

 const cancelModalEditBtn = getElement('#cancelModalEditBtn');
const ModelEditProduct = getElement('#ModelEditProduct');

cancelModalEditBtn.addEventListener('click',(e)=>{
  e.preventDefault();
 // ModelAddProduct.classList.add('hidden');
 document.getElementById('edit-product-modal').checked = false;
 ModelEditProduct.style.display='none';
});



///////edit form 

const formEdit = document.querySelector('#EditProductForm');
formEdit.addEventListener('submit',(e)=>{
  
  getElement('#errorMessageEdit').textContent='';
  debugger;
  e.preventDefault();
  const EditProductForm = getElement('#EditProductForm');
  const formData=getNonEmptyInputValues(EditProductForm);
    const allFields = ['ProductName', 'description', 'price', 'image', 'categoryId'];
  const userInputData=Object.keys(formData);
  const emptydata = allFields.filter(f=> !userInputData.includes(f));
  
  if(Object.keys(formData).length == countInputs){

     const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      getElement('#errorMessageEdit').textContent = 'Please enter a valid price greater than 0';
      return;
    }
    formData.categoryId = getCategory(formData.categoryId).categoryId;

    const OldProduct=products.find(p=>p.id == formData.id);

    OldProduct.ProductName = formData.ProductName;
    OldProduct.description = formData.description;
    OldProduct.price = formData.price;
    OldProduct.image = formData.image;
    OldProduct.categoryId = formData.categoryId;
  
  
    const jsonString = JSON.stringify(products);
     localStorage.setItem('myProducts',jsonString);

    RenderListProducts(products);
    if(SelectCategoriesFilter.selectedIndex > 0){
      SelectCategoriesFilter.selectedIndex = formData.categoryId;
       const lst = products.filter(p=>p.categoryId == formData.categoryId);
    RenderListProducts(lst);
    }else{
      SelectCategoriesFilter.selectedIndex = 0;
    }
    inputSearch.value='';
    // getElement('#errorMessage').textContent='';
  }
  else{

    getElement('#errorMessageEdit').textContent =`please enter data ${emptydata.join(',')}`;
  }

  document.getElementById('edit-product-modal').checked = false;

   document.getElementById('ModelEditProduct').style.display = 'none';

});



 function attachDeleteEvent(){
     const deleteBtn = document.querySelectorAll('.deleteBtn');

     deleteBtn.forEach(elem => {

     elem.addEventListener('click',()=>{

      const productId=elem.getAttribute('data-id');

     const index=products.findIndex(p=> p.id == productId);
     if(index > -1 ){
       products.splice(index,1);
        localStorage.setItem('myProducts', JSON.stringify(products)); 
        RenderListProducts(products);
       }
   
    });
 });
 }

function attachEditEvent() {
  const editBtns = document.querySelectorAll('.editBtn');
  
  editBtns.forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });

  const newEditBtns = document.querySelectorAll('.editBtn');

  newEditBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const product = products.find(p => p.id == id);
      if (product) {
        const ModelEditProduct = getElement('#ModelEditProduct');
        document.getElementById('edit-product-modal').checked = true;
        ModelEditProduct.style.display = 'block';
        const EditProductForm = getElement('#EditProductForm');
        fillFormDate(EditProductForm, product);
      }
    });
  });
}



////////////fill the form when make edit 

 const fillFormDate=(form,product)=>{
    const inputsForm = form.querySelectorAll('input , select ');
    
    inputsForm.forEach(input=>{
      const key = input.name;
      input.value=product[key];
      form.querySelector('input[name="id"]').value = product.id;

      if(input.tagName.toLowerCase() == 'select')
      {
         const SelectCategoriesEdit = getElement('#SelectCategoriesEdit');
         SelectCategoriesEdit.innerHTML = '';
        renderSelect(categories,SelectCategoriesEdit);
        input.selectedIndex = product[key]-1;
      }

    });
    
 }