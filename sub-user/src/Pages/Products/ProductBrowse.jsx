import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { fetchStoreProducts } from "../../redux/slices/storeBrowseSlice";

const categoryLabels = {
  1: "Fruits & Vegetables",
  2: "Dairy ,Bread & Eggs",
  3: "Snacks & Biscuits",
  4: "Atta ,Dal & Rice",
  5: "Dry Fruits & Masala",
  6: "Tea & Coffee",
  7: "Chocolates & Desserts",
};

const ProductBrowse = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStoreProducts, loading } = useSelector(
    (state) => state.storeBrowse,
  );

  useEffect(() => {
    if (storeId) dispatch(fetchStoreProducts(storeId));
  }, [storeId, dispatch]);

  const groupedByCategory = selectedStoreProducts.reduce((acc, product) => {
    const key = product.categoryId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  const finalPrice = (product) => {
    if (!product.discountType || !product.discountValue) return product.price;
    if (product.discountType === "%") {
      return Math.round(
        product.price - (product.price * product.discountValue) / 100,
      );
    }
    return Math.max(0, product.price - product.discountValue);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] p-4">
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        <button
          onClick={() => navigate("/stores")}
          className="flex items-center gap-3 text-md text-gray-500 hover:text-[#8BAD2B] transition mb-6 hover:underline cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to stores
        </button>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-gray-100 animate-pulse"
              ></div>
            ))}
          </div>
        ) : selectedStoreProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-xl">
            <Package className="mx-auto text-gray-300 mb-3 " size={32} />
            <p className="text-gray-500">
              No products available at this store yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {Object.entries(groupedByCategory).map(([categoryId, products]) => (
              <div key={categoryId}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {categoryLabels[categoryId] || `Category ${categoryId}`}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => {
                    const price = finalPrice(product);
                    const hasDiscount = price < product.price;
                    return (
                      <div
                        key={product._id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col p-4"
                      >
                        <div className="aspect-square bg-[#F1F5E3] p-2 flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <img
                              src={`http://localhost:5000${product.image}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="text-[#8BAD2B] " size={28} />
                          )}
                        </div>

                        <div className="p-3 flex flex-col gap-1 flex-1">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {product.productName}
                          </h3>
                          {product.size && (
                            <p className="text-xs text-gray-400">
                              {product.size}
                              {product.unit}
                            </p>
                          )}{" "}
                          <span
                            className={`text-xs mt-0.5 p-2 ${
                              product.stock > 0
                                ? "text-[#8BAD2B]"
                                : "text-red-500"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of Stock"}
                          </span>
                        </div>

                        <button
                          disabled={product.stock === 0}
                          className="mt-auto cursor-pointer pt-2 flex items-center justify-center gap-1.5 w-full bg-[#8BAD2B] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition"
                        >
                          <ShoppingCart size={14} />
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBrowse;
