import { Boxes, Package2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const ProductData = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.products.categories);
  const totalProducts = categories.reduce(
    (count, category) => count + category.products.length,
    0,
  );
  const COLORS = [
    "#8CAD2B",
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#EF4444",
  ];

  const totalStock = categories.reduce(
    (count, category) =>
      count +
      category.products.reduce((sum, product) => sum + product.stock, 0),
    0,
  );

  const productData = categories.map((category) => ({
    category: category.name,
    products: category.products.length,
  }));
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div
        onClick={() => navigate("/my-products")}
        className="grid  grid-cols-1  sm:grid-cols-2   gap-6"
      >
        <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer transition-all">
          <Package2 size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold text-center">Total Products </h3>
          <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
        </div>
        <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center hover:shadow-xl cursor-pointer">
          <Boxes size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold text-center">Total Stock</h3>
          <h2 className="text-3xl font-bold mt-2">{totalStock}</h2>
        </div>
        <div />
      </div>
      {/* ..... */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Products By Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="category" width={140} />
            <Tooltip />
            <Bar dataKey="products" radius={[6, 6, 0, 0]}>
              {productData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductData;
