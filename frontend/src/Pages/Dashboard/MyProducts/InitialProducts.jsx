const initialProducts = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    products: [
      {
        id: 101,
        productName: "Fresh Apple",
        price: 180,
        stock: 50,
      },
      {
        id: 102,
        productName: "Banana",
        price: 60,
        stock: 120,
      },
      { id: 103, productName: "Pineapple", price: 200, stock: 0 },
      { id: 104, productName: "Tomato", price: 40, stock: 80 },
      { id: 105, productName: "Potato", price: 35, stock: 100 },
    ],
  },

  {
    id: 2,
    name: "Dairy, Bread & Eggs",
    products: [
      { id: 201, productName: "Amul Milk", price: 35, stock: 70 },
      { id: 202, productName: "Brown Bread", price: 45, stock: 25 },
      { id: 203, productName: "Eggs", price: 90, stock: 150 },
    ],
  },

  {
    id: 3,
    name: "Snacks & Biscuits",
    products: [
      { id: 301, productName: "Oreo", price: 35, stock: 40 },
      { id: 302, productName: "Good Day", price: 30, stock: 55 },
      { id: 303, productName: "Lays Chips", price: 20, stock: 90 },
      { id: 304, productName: "Doritos", price: 50, stock: 35 },
      { id: 305, productName: "Pringles", price: 120, stock: 15 },
    ],
  },

  {
    id: 4,
    name: "Atta, Dal & Rice",
    products: [
      { id: 401, productName: "Aashirvaad Atta", price: 320, stock: 22 },
      { id: 402, productName: "Basmati Rice", price: 580, stock: 18 },
      { id: 403, productName: "Wheat Flour", price: 260, stock: 28 },
    ],
  },

  {
    id: 5,
    name: "Dry Fruits & Masala",
    products: [
      { id: 501, productName: "Cashew Nuts", price: 850, stock: 20 },
      { id: 502, productName: "Almonds", price: 900, stock: 18 },
      { id: 503, productName: "Black Pepper", price: 120, stock: 40 },
      { id: 504, productName: "Turmeric Powder", price: 80, stock: 60 },
      { id: 505, productName: "Cardamom", price: 220, stock: 15 },
    ],
  },

  {
    id: 6,
    name: "Tea, Coffee & More",
    products: [
      { id: 601, productName: "Bru Coffee", price: 290, stock: 18 },
      { id: 602, productName: "Green Tea", price: 180, stock: 25 },
      { id: 603, productName: "Boost", price: 340, stock: 12 },
    ],
  },

  {
    id: 7,
    name: "Chocolate & Desserts",
    products: [
      { id: 701, productName: "Dairy Milk", price: 100, stock: 60 },
      { id: 702, productName: "KitKat", price: 30, stock: 80 },
      { id: 703, productName: "Snickers", price: 45, stock: 50 },
      { id: 704, productName: "Ferrero Rocher", price: 450, stock: 10 },
    ],
  },
];

export default initialProducts;
