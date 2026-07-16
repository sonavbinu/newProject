import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.avif";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/bgimg.jpg";
import { useDispatch } from "react-redux";
import { selectStore } from "../../redux/slices/storeSlice";
import axios from "axios";

const SelectStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

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

    dispatch(selectStore(store));

    navigate("/dashboard");
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${bgimg})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="relative mb-8">
          <button
            className="absolute left-0 top-1"
            onClick={() => navigate("/mobile-input")}
          >
            <ArrowLeft color="#555a5f" />
          </button>

          <h2 className="text-2xl font-bold text-center">Select Your Store</h2>

          <p className="text-center text-gray-500 mt-2">
            Your number is connected with <strong>{stores.length}</strong> store
            {stores.length !== 1 && "s"}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading stores...</p>
        ) : stores.length === 0 ? (
          <p className="text-center text-gray-500">No stores found.</p>
        ) : (
          stores.map((store) => (
            <label
              key={store._id}
              className={`flex justify-between items-center w-full p-4 rounded-lg border cursor-pointer mb-4 transition
                ${
                  selectedStore === store._id
                    ? "border-[var(--primary-color)] ring-2 ring-[var(--primary-color)] bg-[var(--primary-light)]"
                    : "border-gray-200 hover:border-[var(--primary-color)]"
                }`}
            >
              <div className="flex gap-4">
                <img
                  src={store.storeImage || profile}
                  alt={store.storeName}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>
                  <p className="font-semibold">{store.storeName}</p>

                  <p className="text-sm text-gray-500">{store.address}</p>

                  <p className="text-sm text-gray-400">Store ID: {store._id}</p>
                </div>
              </div>

              <input
                type="radio"
                name="store"
                checked={selectedStore === store._id}
                onChange={() => setSelectedStore(store._id)}
              />
            </label>
          ))
        )}

        <button
          disabled={!selectedStore}
          onClick={handleContinue}
          className={`w-full py-3 rounded-lg font-semibold text-white mt-4
            ${
              selectedStore
                ? "bg-[var(--primary-color)]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectStore;
