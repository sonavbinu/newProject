import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { fetchStoreProducts } from "../../redux/slices/storeBrowseSlice";

const categoryLabels = {
  1: "Fruits & Vegetables",
  2: "Dairy, Bread & Eggs",
  3: "Snacks & Biscuits",
  4: "Atta, Dal & Rice",
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
    <div className="min-h-screen bg-[#FAFAF7] p-3 ">
      <div className="sticky top-0 z-10 bg-[#FAFAF7]/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 ">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/stores")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#8BAD2B] transition cursor-pointer mb-3 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to stores
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : selectedStoreProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-xl">
            <Package className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-gray-500">
              No products available at this store yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10  p-2 ">
            {Object.entries(groupedByCategory).map(([categoryId, products]) => (
              <div key={categoryId}>
                <div className="flex items-center gap-4 p-2 ">
                  <h2 className="text-xl font-bold text-gray-900">
                    {categoryLabels[categoryId] || `Category ${categoryId}`}
                  </h2>
                  <span className="text-xs text-gray-400">
                    {products.length} item{products.length !== 1 && "s"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => {
                    const price = finalPrice(product);
                    const hasDiscount = price < product.price;
                    const discountPercent =
                      hasDiscount &&
                      Math.round(
                        ((product.price - price) / product.price) * 100,
                      );

                    return (
                      <div
                        key={product._id}
                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                      >
                        <div className="relative  bg-[#F1F5E3] flex items-center justify-center overflow-hidden p-2">
                          {product.image ? (
                            <img
                              src={`http://localhost:5000${product.image}`}
                              alt={product.productName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <Package className="text-[#8BAD2B]" size={28} />
                          )}

                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                                Out of stock
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-3 flex flex-col gap-1 flex-1">
                          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
                            {product.productName}
                          </h3>

                          {product.size && (
                            <p className="text-xs text-gray-400">
                              {product.size} {product.unit}
                            </p>
                          )}

                          <div className="flex items-center gap-3 mt-1 ">
                            <span className="font-bold text-gray-900">
                              ₹{price}
                            </span>
                            {hasDiscount && (
                              <span
                                className=" text-gray-400 line-through"
                                style={{ textDecoration: "line-through" }}
                              >
                                ₹{product.price}
                              </span>
                            )}
                            {hasDiscount && (
                              <span className=" bg-[#8BAD2B] text-white text-[11px] font-semibold text-sm p-2  rounded-xl">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>

                          {product.stock > 0 && (
                            <span className="text-xs text-gray-400">
                              {product.stock} left in stock
                            </span>
                          )}

                          <button
                            disabled={product.stock === 0}
                            className="mt-2 cursor-pointer flex items-center justify-center gap-1.5 w-full bg-[#8BAD2B] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 active:scale-[0.98] transition"
                          >
                            <ShoppingCart size={14} />
                            Add
                          </button>
                        </div>
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
