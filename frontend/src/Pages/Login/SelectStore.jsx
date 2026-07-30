import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Store as StoreIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/bgimg.jpg";
import { useDispatch } from "react-redux";
import { selectStore } from "../../redux/slices/storeSlice";
import { deleteStore } from "../../api/storeApi";
import { toast } from "react-toastify";
import API from "../../api/api";

const SelectStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await API.get("/stores");
        setStores(res.data.stores || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleContinue = () => {
    const store = stores.find((s) => s._id === selectedStoreId);
    if (!store) return;

    dispatch(selectStore(store));
    navigate("/dashboard");
  };

  const handleDelete = async (e, storeId) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      "Delete this store? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeletingId(storeId);
    try {
      await deleteStore(storeId);
      setStores((prev) => prev.filter((s) => s._id !== storeId));
      if (selectedStoreId === storeId) {
        setSelectedStoreId(null);
      }
      toast.success("Store deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete store");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg})` }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-10">
        <div className="relative mb-8">
          <button
            onClick={() => navigate("/mobile-input")}
            className="absolute left-0 top-1 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>

          <h2 className="text-3xl font-bold text-center text-gray-900">
            Select Your Store
          </h2>

          {!loading && (
            <p className="text-center text-gray-500 mt-2">
              Your number is connected with{" "}
              <span className="font-semibold text-gray-700">
                {stores.length}
              </span>{" "}
              store
              {stores.length !== 1 && "s"}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-100 animate-pulse h-64"
              />
            ))}
          </div>
        ) : stores.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-2xl">
            <StoreIcon className="text-gray-300 mb-3" size={36} />
            <p className="text-gray-500">No stores found for this account</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stores.map((store) => (
              <label
                key={store._id}
                className={`relative cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-200
                ${
                  selectedStoreId === store._id
                    ? "border-[var(--primary-color)] bg-[var(--primary-light)] shadow-lg"
                    : "border-gray-200 hover:border-[var(--primary-color)] hover:shadow-md"
                }`}
              >
                <input
                  type="radio"
                  name="store"
                  className="hidden"
                  checked={selectedStoreId === store._id}
                  onChange={() => setSelectedStoreId(store._id)}
                />

                <button
                  type="button"
                  onClick={(e) => handleDelete(e, store._id)}
                  disabled={deletingId === store._id}
                  title="Delete store"
                  className="absolute top-3 left-3 z-10 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-2 shadow-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

                <div className="w-full h-44 bg-[#F1F5E3] flex items-center justify-center overflow-hidden">
                  {store.storeImage ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace("/api", "")}${store.storeImage}`}
                      alt={store.storeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <StoreIcon
                      className="text-[var(--primary-color)]"
                      size={40}
                    />
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {store.storeName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{store.address}</p>
                  {/* {store.status && (
                    <span
                      className={`inline-block mt-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                        store.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : store.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {store.status.charAt(0).toUpperCase() +
                        store.status.slice(1)}
                    </span>
                  )} */}
                </div>

                {selectedStoreId === store._id && (
                  <div className="absolute top-3 right-3 bg-[var(--primary-color)] rounded-full p-1 text-white">
                    <CheckCircle2 size={18} />
                  </div>
                )}
              </label>
            ))}
          </div>
        )}

        {!loading && stores.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              disabled={!selectedStoreId}
              onClick={handleContinue}
              className={`px-12 py-3 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer
                ${
                  selectedStoreId
                    ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectStore;
