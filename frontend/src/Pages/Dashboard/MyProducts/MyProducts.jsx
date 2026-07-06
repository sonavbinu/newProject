import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addProduct } from "../../../redux/slices/productSlice";

const MyProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      addProduct({
        categoryId: 1,
        product: {
          name,
          price,
          stock,
          image,
          description,
        },
      }),
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-lg font-bold">Product Listing</h2>
        <div className="flex gap-4 justify-between">
          <input
            type="text"
            placeholder="Search for products or category"
            className="border border-gray-300 rounded-xl px-2 py-2 focus:ring-2 focus:ring-[var(--primary-color)] 
            outline-none w-[80%]"
          />
          <button
            onClick={() => navigate("/add-product")}
            className="bg-[var(--primary-color)]  text-white rounded-xl px-2 hover:opacity-90 cursor-pointer"
          >
            Add Product
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyProducts;
