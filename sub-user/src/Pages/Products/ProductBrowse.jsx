import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStoreProducts } from "../../redux/slices/storeBrowseSlice";

const ProductBrowse = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const { selectedStoreProducts, loading } = useSelector(
    (state) => state.storeBrowse,
  );

  useEffect(() => {
    if (storeId) dispatch(fetchStoreProducts(storeId));
  }, [storeId, dispatch]);

  if (loading)
    return <div className="text-center mt-10">Loading products...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
      {selectedStoreProducts.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No products available
        </p>
      ) : (
        selectedStoreProducts.map((product) => (
          <div key={product._id} className="border rounded-xl p-3 shadow-sm">
            <h3 className="font-semibold">{product.productName}</h3>
            <p className="text-sm text-gray-500">₹{product.price}</p>
            <p className="text-xs text-gray-400">Stock: {product.stock}</p>
            <button className="mt-2 w-full bg-green-600 text-white rounded-lg py-1.5 text-sm hover:opacity-90">
              Add to cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductBrowse;
