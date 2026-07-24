import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { fetchMyOrders } from "../../redux/slices/orderSlice";

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

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-24">
        <button
          onClick={() => navigate("/stores")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#8BAD2B] transition mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to stores
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-xl">
            <ShoppingBag className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-gray-500 mb-3">
              You haven't placed any orders yet
            </p>
            <button
              onClick={() => navigate("/stores")}
              className="text-[#8BAD2B] font-medium text-sm hover:underline"
            >
              Browse stores
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="text-[#8BAD2B]" size={18} />
                    <span className="font-semibold text-gray-900">
                      {order.store?.storeName || "Store"}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      statusColors[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="flex flex-col gap-1 border-t border-gray-100 pt-2">
                  {order.items.slice(0, 3).map((item) => (
                    <div
                      key={item.product}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{order.items.length - 3} more item
                      {order.items.length - 3 !== 1 && "s"}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
