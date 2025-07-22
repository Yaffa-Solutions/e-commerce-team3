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