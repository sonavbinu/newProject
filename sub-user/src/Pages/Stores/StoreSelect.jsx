import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchApprovedStores,
  selectStore,
} from "../../redux/slices/storeBrowseSlice";

const StoreSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores } = useSelector((state) => state.storeBrowse);

  useEffect(() => {
    dispatch(fetchApprovedStores());
  }, [dispatch]);

  const handleSelect = (e) => {
    const storeId = e.target.value;
    if (storeId) {
      dispatch(selectStore(storeId));
      navigate(`/stores/${storeId}/products`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Choose a store</h1>
      <select
        onChange={handleSelect}
        defaultValue=""
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B]"
      >
        <option value="" disabled>
          Select a store
        </option>
        {stores.map((store) => (
          <option key={store._id} value={store._id}>
            {store.storeName} — {store.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreSelect;
