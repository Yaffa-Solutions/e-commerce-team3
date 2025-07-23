 export let products = [
  // {
  //   id: 1,
  //   title: "Essence Mascara Lash Princess",
  //   description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  //   categoryId: 3, // beauty
  //   price: 9.99,
  //   image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
  // },
  // {
  //   id: 2,
  //   title: "Powder Canister",
  //   description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
  //   categoryId: 3, // beauty
  //   price: 14.99,
  //   image: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp"
  // },
  // {
  //   id: 3,
  //   title: "Red Lipstick",
  //   description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
  //   categoryId: 3, // beauty
  //   price: 12.99,
  //   image: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"
  // },
  // {
  //   id: 4,
  //   title: "Knoll Saarinen Executive Conference Chair",
  //   description: "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
  //   categoryId: 2, // furniture
  //   price: 499.99,
  //   image: "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp"
  // },
  // {
  //   id: 5,
  //   title: "Bedside Table African Cherry",
  //   description: "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
  //   categoryId: 2, // furniture
  //   price: 299.99,
  //   image: "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp"
  // },
  // {
  //   id: 6,
  //   title: "Annibale Colombo Sofa",
  //   description: "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
  //   categoryId: 2, // furniture
  //   price: 2499.99,
  //   image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp"
  // },
  // {
  //   id: 7,
  //   title: "Chanel Coco Noir Eau De",
  //   description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
  //   categoryId: 1, // fragrances
  //   price: 129.99,
  //   image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp"
  // },
  // {
  //   id: 8,
  //   title: "Dior J'adore",
  //   description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
  //   categoryId: 1, // fragrances
  //   price: 89.99,
  //   image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp"
  // },
  // {
  //   id: 9,
  //   title: "Dolce Shine Eau de",
  //   description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
  //   categoryId: 1, // fragrances
  //   price: 69.99,
  //   image: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp"
  // }
];

export let categories = [
  { categoryId: 1, categoryName: "fragrances" },
  { categoryId: 2, categoryName: "furniture" },
  { categoryId: 3, categoryName: "beauty" }
];


const carts = [];




export class Product{
  static currentId = 1;

  constructor({ ProductName, description, price, image, categoryId}){
    this.id = Product.currentId++;
    this.ProductName = ProductName;
    this.description=description;
    this.price=price;
    this.image=image;
    this.categoryId=categoryId;
  }
}