import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle2, ArrowLeft, Package, LogOut } from "lucide-react";
import API from "../../api/api";
import { logout } from "../../redux/slices/customerAuthSlice";
import Navbar from "../../Components/Navbar";

const statusColors = {
  confirmation: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  packed: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels = {
  confirmation: "Order placed",
  preparing: "Preparing",
  packed: "Packed",
  completed: "Delivered",
  rejected: "Rejected",
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${orderId}`);
        setOrder(res.data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center gap-3">
        <Package className="text-gray-300" size={32} />
        <p className="text-gray-500">Order not found</p>
        <button
          onClick={() => navigate("/stores")}
          className="text-[#8BAD2B] font-semibold text-sm hover:underline"
        >
          Back to stores
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#FAFAF7]   pb-24">
      <Navbar />
      <div className="max-w-xl mx-auto pt-10">
        <div className="flex justify-between items-center mb-6">
          {" "}
          <button
            className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-[#8BAD2B] "
            onClick={() => navigate("/stores")}
          >
            <ArrowLeft size={16} />
            Continue shopping
          </button>
          <div className="flex items-center  gap-4 justify-end ">
            <button
              onClick={() => navigate("/orders")}
              className="flex items-center gap-1.5 
            text-sm text-gray-500 hover:text-[#8BAD2B] transition cursor-pointer
            "
            >
              <Package size={16} />
              My Orders
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500
               hover:text-[#8BAD2B] transition cursor-pointer     "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white to-lime-100 border border-lime-200 rounded-xl p-8 shadow-lg flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#8BAD2B]">
              <CheckCircle2 size={34} />
              <span className="font-semibold text-2xl">
                Order Placed successfully
              </span>
            </div>
            <div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  statusColors[order.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabels[order.status] || order.status}
              </span>
            </div>
          </div>{" "}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Store
            </p>
            <p className="font-semibold text-gray-900">
              {order.store?.storeName}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
            {order.items.map((item) => (
              <div
                key={item.product}
                className="flex justify-between text-gray-700 text-sm"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rs{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold border-t border-gray-100 pt-4">
            <span>Total</span>
            <span>{order.total}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
            <span>Order #{order._id.slice(-8).toUpperCase()}</span>
            <span>Cash on delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
