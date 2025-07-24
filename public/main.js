import {products , categories , Product} from './data.js';

   products.length = 0; 
   products.push(...JSON.parse(localStorage.getItem('myProducts')));


import { products,categories } from "./data.js";

const categorySelect = document.querySelector(".category-filter");
const productsContainer = document.querySelector(".products-container");
const priceMinInput = document.querySelector(".price-min");
const priceMaxInput = document.querySelector(".price-max");
const applyPriceBtn = document.querySelector(".apply-price-btn");
const searchInput = document.querySelector(".search-input");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCategories() {
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.categoryName;
    option.textContent = cat.categoryName;
    categorySelect.appendChild(option);
  });
}

function createElement(tag, classes = []) {
  const el = document.createElement(tag);
  classes.forEach((cl) => el.classList.add(cl));
  return el;
}

function elementsAppender(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

function getCategoryNameById(categoryId) {
  const category = categories.find((cat) => cat.categoryId === categoryId);
  return category ? category.categoryName : "";
}

function renderProducts(array) {
  productsContainer.innerHTML = "";

  array.forEach((product) => {
    const categoryName = getCategoryNameById(product.categoryId, categories);

    const cardClasses = [
      "card",
      "bg-white",
      "shadow-md",
      "hover:shadow-lg",
      "transition",
      "duration-300",
      "text-sm",
    ];

    if (currentView === "list") {
      cardClasses.push("flex", "items-center", "space-x-4", "p-4");
    }

    const card = createElement("div", cardClasses);

    const figure = createElement("figure");
    const imgClasses = ["object-cover"];
    if (currentView === "grid") {
      imgClasses.push("w-full", "h-40");
    } else {
      imgClasses.push("w-24", "h-24", "flex-shrink-0", "rounded");
    }
    const img = createElement("img", imgClasses);
    img.src = product.image;
    img.alt = product.title;
    figure.appendChild(img);

    const cardBodyClasses = ["card-body"];
    if (currentView === "grid") {
      cardBodyClasses.push("p-4");
    } else {
      cardBodyClasses.push("flex-1");
    }
    const cardBody = createElement("div", cardBodyClasses);

    const div = createElement("div", [
      "flex",
      "items-center",
      "justify-between",
      "mb-2",
    ]);
    const title = createElement("h2", ["card-title", "text-base"]);
    title.textContent = product.title;

    const categorySpan = createElement("span", ["text-xs", "text-gray-500"]);
    categorySpan.textContent = categoryName;

    elementsAppender(div, [title, categorySpan]);

    const desc = createElement("p", ["text-xs", "text-gray-600"]);
    desc.textContent = product.description;

    const cardActions = createElement("div", [
      "card-actions",
      "flex",
      "items-center",
      "justify-between",
      "mt-3",
    ]);

    if (currentView === "list") {
      cardActions.classList.add("w-48", "flex-shrink-0");
    }

    const buyBtn = createElement("button", [
      "btn",
      "btn-sm",
      "bg-[#48cae4]",
      "hover:bg-blue-600",
      "text-white",
    ]);
    buyBtn.textContent = "Buy Now";
    buyBtn.addEventListener("click", () => {
  const isAlreadyInCart = cart.some((item) => item.id === product.id);
  if (!isAlreadyInCart) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("added to cart ");
  } else {
    alert("already in cart");
  }
});


    const priceSpan = createElement("span", [
      "text-sm",
      "font-semibold",
      "text-gray-700",
    ]);
    priceSpan.textContent = `$${product.price}`;

    elementsAppender(cardActions, [buyBtn, priceSpan]);

    if (currentView === "grid") {
      elementsAppender(cardBody, [div, desc, cardActions]);
      elementsAppender(card, [figure, cardBody]);
    } else {
      elementsAppender(cardBody, [div, desc]);
      elementsAppender(card, [figure, cardBody, cardActions]);
    }

    productsContainer.appendChild(card);
  });
}

let currentView = "grid";

productsContainer.classList.add("grid", "grid-cols-3", "gap-4");

gridView.addEventListener("click", () => {
  currentView = "grid";

  productsContainer.classList.remove("flex", "flex-col", "space-y-4");
  productsContainer.classList.add("grid", "grid-cols-3", "gap-4");

  gridView.classList.add("bg-[#48cae4]", "text-white");
  gridView.classList.remove("text-gray-600");

  listView.classList.remove("bg-[#48cae4]", "text-white");
  listView.classList.add("text-gray-600");

  renderProducts(products);
});

listView.addEventListener("click", () => {
  currentView = "list";
  productsContainer.classList.remove("grid", "grid-cols-3", "gap-4");
  productsContainer.classList.add("flex", "flex-col", "space-y-4");

  listView.classList.add("bg-[#48cae4]", "text-white");
  gridView.classList.remove("bg-[#48cae4]", "text-white");
  gridView.classList.add("text-gray-600");
  listView.classList.remove("text-gray-600");

  renderProducts(products);
});


searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword === "") {
    renderProducts(products);
    return;
  }
  const filtered = products.filter(product => {
    return (
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
    );
  });

  renderProducts(filtered);
});

function filterProductsByCategory(products, categoryName, categories) {
  if (categoryName === "All") {
    return products;
  }
  const category = categories.find((cat) => cat.categoryName === categoryName);
  if (!category) return [];
return products.filter((product) => product.categoryId === category.categoryId);
}
function filterByPrice(products, minPrice, maxPrice) {
  let filteredPrice = [...products];

  if (minPrice !== null && minPrice !== undefined ) {
    return filteredPrice.filter(p => p.price >= minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined ) {
     return filteredPrice.filter(p => p.price <= maxPrice);
  }

}
priceMinInput.addEventListener("input", applyPriceFilter);
priceMaxInput.addEventListener("input", applyPriceFilter);

function applyPriceFilter() {
  const min = priceMinInput.value;
  const max = priceMaxInput.value;
  const result = filterByPrice(products, min, max);
  renderProducts(result);
}


categorySelect.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filteredProducts = filterProductsByCategory(
    products,
    selectedCategory,
    categories
  );
  renderProducts(filteredProducts);
});


renderCategories();
renderProducts(products);





