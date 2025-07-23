import {products , categories , Product} from './data.js';

const getElement =(elem)=> document.querySelector(elem);

let productsListCopy =[...products ];

const renderSelect =(elem)=>{
  categories.forEach(c=>{
     const categoryOption=document.createElement('option');
      categoryOption.textContent =c.categoryName;
      categoryOption.setAttribute('data-id',c.categoryId);
      elem.appendChild(categoryOption);
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
        tr.appendChild(createCells(product.ProductName,'font-semibold'));
        tr.appendChild(createCells(product.description));
        tr.appendChild(createCells(getCategory(product.categoryId).categoryName));
        tr.appendChild(createCells(product.price));
        tr.appendChild(createButton('Edit',' editBtn btn btn-ghost btn-xs mt-4',product.id));
        tr.appendChild(createButton('Delete','deleteBtn btn btn-ghost btn-xs mt-4',product.id));
       
        tbodyProducts.appendChild(tr);
       
    }else{
      console.log('the product id is null');
    }

    }) : console.log('the length list 0');
    
attachEditEvent();
 attachDeleteEvent();


}

const getCategory =(id)=>{ return (id) ? categories.find(c=>c.categoryId == id) : ''; }


window.onload =()=>{
     
  if (!localStorage.getItem('myProducts')) {
    localStorage.setItem('myProducts', JSON.stringify([]));
   }
  const retrievedJsonString = localStorage.getItem('myProducts');
   productsListCopy = JSON.parse(retrievedJsonString);

   if (productsListCopy.length > 0) {
    const maxId = Math.max(...productsListCopy.map(p => p.id));
    Product.currentId = maxId + 1;
  } else {
    Product.currentId = 1;
  }
   RenderListProducts(productsListCopy);
}

let countInputs=0;
function getNonEmptyInputValues(form) {
  const data = {};
  //const inputs = Array.from(form.querySelectorAll('input, select'));
    const inputs = form.querySelectorAll('input, select');
    countInputs = inputs.length;
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


const form = document.getElementById('addProductForm');
const addBtn = getElement('#AddBtn');
 const SelectCategories = getElement('#SelectCategories2');

  renderSelect(SelectCategories);
  
addBtn.addEventListener('click', e => {
  
  const formData = getNonEmptyInputValues(form);
  const allFields = ['ProductName', 'description', 'price', 'image', 'categoryId'];
  const userInputData=Object.keys(formData);
  const emptydata = allFields.filter(f=> !userInputData.includes(f));
  
  e.preventDefault();

  if(Object.keys(formData).length == countInputs){
  
    formData.categoryId = getCategory(formData.categoryId).categoryId;

    const newProduct=new Product(formData);
    productsListCopy.push(newProduct);
    console.log(products);
   ///convert the array to json 
    const jsonString = JSON.stringify(productsListCopy);
    localStorage.setItem('myProducts',jsonString);
    form.reset();
    RenderListProducts(productsListCopy);
    getElement('#errorMessage').textContent='';

  }
  else{

    emptydata.includes('categoryId') ? getElement('#errorMessage').textContent =`please Choose the Category` : getElement('#errorMessage').textContent =`please enter data ${emptydata.join(',')}`;
  }
 
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
let productsSearch =[];
inputSearch.addEventListener('input',()=>{

  ///clean the table
   refershList();
   debugger;
   //return the list filter 
   ///base list if the user search without filter 
     const baseList = productsSearch.length > 0 ? productsSearch : productsListCopy;

  const lstfiltered=searchByProductName(baseList,inputSearch.value);
  RenderListProducts(lstfiltered);
});

const refershList=()=>{
  RenderListProducts([{}]);
}

/// filter 
  productsListCopy=JSON.parse(localStorage.getItem('myProducts'));


const SelectCategoriesFilter = getElement('#SelectCategories');
renderSelect(SelectCategoriesFilter);
 SelectCategoriesFilter.addEventListener('change',()=>{
  inputSearch.value='';
debugger;
  if(SelectCategoriesFilter.selectedIndex > 0)  {
    
    const categoryId= SelectCategoriesFilter.options[SelectCategoriesFilter.selectedIndex].getAttribute('data-id');
    productsSearch=productsListCopy.filter(p=>p.categoryId == categoryId);
     const lst = productsListCopy.filter(p=>p.categoryId == categoryId);
    RenderListProducts(lst);
  }else{
    //alert('done');
    productsSearch=productsListCopy;
    RenderListProducts(JSON.parse(localStorage.getItem('myProducts')));
  }
 });




 //////////////Edit 

 const cancelModalEditBtn = getElement('#cancelModalEditBtn');
const ModelEditProduct = getElement('#ModelEditProduct');

cancelModalEditBtn.addEventListener('click',(e)=>{
  e.preventDefault();
 // ModelAddProduct.classList.add('hidden');
 ModelEditProduct.style.display='none';
 document.getElementById('add-product-modal').checked = false;
});



///////edit form 

const formEdit = document.querySelector('#EditProductForm');
formEdit.addEventListener('submit',(e)=>{

  debugger;
  e.preventDefault();
  const EditProductForm = getElement('#EditProductForm');
  const formData=getNonEmptyInputValues(EditProductForm);
    const allFields = ['ProductName', 'description', 'price', 'image', 'categoryId'];
  const userInputData=Object.keys(formData);
  const emptydata = allFields.filter(f=> !userInputData.includes(f));
  
  if(Object.keys(formData).length == countInputs){
  
    formData.categoryId = getCategory(formData.categoryId).categoryId;

    const OldProduct=productsListCopy.find(p=>p.id == formData.id);

    OldProduct.ProductName = formData.ProductName;
    OldProduct.description = formData.description;
    OldProduct.price = formData.price;
    OldProduct.image = formData.image;
    OldProduct.categoryId = formData.categoryId;
  
  
    const jsonString = JSON.stringify(productsListCopy);
     localStorage.setItem('myProducts',jsonString);

    RenderListProducts(productsListCopy);
    // getElement('#errorMessage').textContent='';
  }
  else{

    emptydata.includes('categoryId') ? getElement('#errorMessage').textContent =`please Choose the Category` : getElement('#errorMessage').textContent =`please enter data ${emptydata.join(',')}`;
  }

  
  document.getElementById('ModelEditProduct').style.display = 'none';
 document.getElementById('add-product-modal').checked = false;


});





 function attachDeleteEvent(){
     const deleteBtn = document.querySelectorAll('.deleteBtn');

     deleteBtn.forEach(elem => {

     elem.addEventListener('click',()=>{

      const productId=elem.getAttribute('data-id');

     const index=productsListCopy.findIndex(p=> p.id == productId);
     if(index > -1 ){
       productsListCopy.splice(index,1);
        localStorage.setItem('myProducts', JSON.stringify(productsListCopy)); 
        RenderListProducts(productsListCopy);
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
      const product = productsListCopy.find(p => p.id == id);
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
        renderSelect(SelectCategoriesEdit);
        input.selectedIndex = product[key];
      }

    });
    
 }