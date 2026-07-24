import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreIcon, MapPin, Search, LogOut, Package } from "lucide-react";
import {
  fetchApprovedStores,
  selectStore,
} from "../../redux/slices/storeBrowseSlice";
import { useState } from "react";
import { logout } from "../../redux/slices/customerAuthSlice";

const StoreSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, loading } = useSelector((state) => state.storeBrowse);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchApprovedStores());
  }, [dispatch]);

  const handleSelect = (storeId) => {
    if (storeId) {
      dispatch(selectStore(storeId));
      navigate(`/stores/${storeId}/products`);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const filteredStores = stores.filter(
    (store) =>
      store.storeName.toLowerCase().includes(query.toLowerCase()) ||
      store.address.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium tracking-wide text-[#8BAD2B] uppercase">
              Pick a Store
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#8BAD2B] transition cursor-pointer"
              >
                <Package size={16} />
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Where are you ordering from today?
          </h1>
        </div>

        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or area"
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] focus:border-transparent transition"
          />
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-gray-100 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
            <StoreIcon className="mx-auto text-gray-300 mb-3" size={32} />
            <p>
              {query
                ? `No stores match "${query}"`
                : "No Stores available right now"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 ">
            {filteredStores.map((store) => (
              <button
                key={store._id}
                onClick={() => handleSelect(store._id)}
                className="group flex items-center gap-4 w-full cursor-pointer text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-[#8BAD2B] hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-[#F1F5E3] flex items-center justify-center overflow-hidden shrink-0">
                  {store.storeImage ? (
                    <img
                      src={`http://localhost:5000${store.storeImage}`}
                      alt={store.storeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <StoreIcon className="text-[#8BAD2B]" size={22} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {store.storeName}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                    <MapPin size={13} className="shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                </div>
                <div className="text-[#8BAD2B] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">
                  Order →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreSelect;
