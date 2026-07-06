import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const categories = useSelector((state) => state.products.categories);
  console.log(categories);
  return (
    <div className="flex flex-col border border-gray-300 gap-5 rounded p-5 ">
      {categories.map((category) => (
        <div
          className="flex flex-col border gap-6 border-gray-300 p-2 rounded-xl shadow"
          key={category.id}
        >
          <h2 className="bg-[var(--primary-color)] text-white p-2 rounded-xl">
            {category.name}
          </h2>

          {category.products.length === 0 ? (
            <p>No products</p>
          ) : (
            category.products.map((product) => (
              <div key={product.id}>
                <h4>{product.productName}</h4>
                <p>Rs{product.price}</p>
                <p>Stock:{product.quantity}</p>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
