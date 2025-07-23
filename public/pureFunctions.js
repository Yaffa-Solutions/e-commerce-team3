function createElement(tag, classes = []) {
  const el = document.createElement(tag);
  classes.forEach((cl) => el.classList.add(cl));
  return el;
}

function elementsAppender(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

function getCategoryNameById(id, categories) {
  const category = categories.find((cat) => cat.id === id);
  return category ? category.categorie : "";
}

function filterProductsByCategory(products, categoryName, categories) {
  if (categoryName === "All") return products;
  const category = categories.find(cat => cat.categorie === categoryName);
  if (!category) return [];
  return products.filter(product => product.categoryId === category.id);
}


//////Nada 


const createCells = (text, classname)=>{
      const td = document.createElement('td');
      td.textContent = text;
      if(classname) td.className=classname;
      return td;
};

function createButton (text , className='',productId ){
    const btn = document.createElement('button');
    // if(id) btn.id=id;
    if(className) btn.className = className;
    if(text) btn.textContent= text;
    btn.setAttribute('data-id',productId);
    return btn;
}


const searchByProductName=(lstProducts,text)=>{
    const lst = lstProducts.filter(p=>p.ProductName.toLowerCase().trim().includes(text.toLowerCase().trim()));
    return lst;
}


const renderSelect =(lstCategories,elem)=>{
  lstCategories.forEach(c=>{
     const categoryOption=document.createElement('option');
      categoryOption.textContent =c.categoryName;
      categoryOption.setAttribute('data-id',c.categoryId);
      elem.appendChild(categoryOption);
  });

}

// module.exports = {
//   createCells,
//   createButton,
//   searchByProductName,
//   renderSelect
// };
