import { Boxes, Package2, PackageX, TriangleAlert } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductData = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.products.categories);
  const totalProducts = categories.reduce(
    (count, category) => count + category.products.length,
    0,
  );

  const totalStock = categories.reduce(
    (count, category) =>
      count +
      category.products.reduce((sum, product) => sum + product.stock, 0),
    0,
  );

  const outOfStock = categories.reduce(
    (count, category) =>
      count + category.products.filter((product) => product.stock === 0).length,
    0,
  );

  const lowStock = categories.reduce(
    (count, category) =>
      count +
      category.products.filter(
        (product) => product.stock > 0 && product.stock <= 10,
      ).length,
    0,
  );
  return (
    <div
      onClick={() => navigate("/my-products")}
      className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer">
        <Package2 size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold text-center">Total Products </h3>
        <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
      </div>
      <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer">
        <Boxes size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold text-center">Total Stock</h3>
        <h2 className="text-3xl font-bold mt-2">{totalStock}</h2>
      </div>
      {/* <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer">
        <TriangleAlert size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold ">Low Stock</h3>
        <h2 className="text-3xl font-bold">{lowStock}</h2>
      </div>
      <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer">
        <PackageX size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold">Out of Stock</h3>
        <h2 className="text-3xl font-bold">{outOfStock}</h2>
      </div> */}
    </div>
  );
};

export default ProductData;
