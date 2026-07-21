import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.avif";
import { ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/bgimg.jpg";
import { useDispatch } from "react-redux";
import { selectStore } from "../../redux/slices/storeSlice";
import { deleteStore } from "../../api/storeApi";
import { toast } from "react-toastify";
import axios from "axios";

const SelectStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStores(res.data.stores || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleContinue = () => {
    const store = stores.find((s) => s._id === selectedStore);

    if (!store) return;

    dispatch(selectStore(store));
    navigate("/dashboard");
  };

  const handleDelete = async (e, storeId) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      "Delete this store ? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeletingId(storeId);
    try {
      await deleteStore(storeId);
      setStores((prev) => prev.filter((s) => s._id !== storeId));
      if (selectStore === storeId) {
        setSelectedStore(null);
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

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <div className="relative mb-8">
          <button
            onClick={() => navigate("/mobile-input")}
            className="absolute left-0 top-1 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>

          <h2 className="text-3xl font-bold text-center">Select Your Store</h2>

          <p className="text-center text-gray-500 mt-2">
            Your number is connected with{" "}
            <span className="font-semibold">{stores.length}</span> store
            {stores.length !== 1 && "s"}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No stores found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stores.map((store) => (
              <label
                key={store._id}
                className={`relative cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-200
                ${
                  selectedStore === store._id
                    ? "border-[var(--primary-color)] bg-[var(--primary-light)] shadow-lg"
                    : "border-gray-200 hover:border-[var(--primary-color)] hover:shadow-md"
                }`}
              >
                <input
                  type="radio"
                  name="store"
                  className="hidden"
                  checked={selectedStore === store._id}
                  onChange={() => setSelectedStore(store._id)}
                />

                <button
                  type="button"
                  onClick={(e) => handleDelete(e, store._id)}
                  disabled={deletingId === store._id}
                  title="Delete store"
                  className="absolute top-3 left-3 z-10 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-2 shadow-md transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>

                <img
                  src={profile}
                  alt={store.storeName}
                  className="w-full h-44 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold">{store.storeName}</h3>

                  <p className="text-sm text-gray-500 mt-2">{store.address}</p>

                  <p className="text-xs text-gray-400 mt-4 break-all">
                    Store ID: {store._id}
                  </p>
                </div>

                {selectedStore === store._id && (
                  <div className="absolute top-3 right-3 bg-[var(--primary-color)] rounded-full p-1 text-white">
                    <CheckCircle2 size={18} />
                  </div>
                )}
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            disabled={!selectedStore}
            onClick={handleContinue}
            className={`px-12 py-3 rounded-xl font-semibold text-white transition-all duration-200
              ${
                selectedStore
                  ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectStore;
