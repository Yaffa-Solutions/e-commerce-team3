const cartItemsContainer = document.getElementById("cart-items");
const totalPrice = document.querySelector(".total-price");
const purchase = document.querySelector(".purchase");
const subtotal = document.querySelector(".subtotal");
const numProducts = document.querySelector(".num-products");



function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.textContent = "Empty";
    totalPrice.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "flex",
      "items-center",
      "gap-4",
      "p-2",
      "border",
      "rounded",
      "mb-2"
    );

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.classList.add("w-16", "h-16", "object-cover", "rounded");

    const infoDiv = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = product.title;
    title.classList.add("font-semibold");

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    infoDiv.appendChild(title);
    infoDiv.appendChild(price);

    itemDiv.appendChild(img);
    itemDiv.appendChild(infoDiv);

    cartItemsContainer.appendChild(itemDiv);

    total += product.price;
  });

  totalPrice.textContent = `$${total}`;
  subtotal.textContent = `$${total}`;
  numProducts.textContent=cart.length


}

purchase.addEventListener("click", () => {
  localStorage.removeItem("cart");

  alert(":)");
  cartItemsContainer.innerHTML = "";
  totalPrice.innerHTML = "0.0";
});
renderCartItems();
