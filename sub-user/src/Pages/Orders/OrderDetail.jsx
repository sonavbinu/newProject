import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle2, ArrowLeft, Package, LogOut } from "lucide-react";
import API from "../../api/api";
import { logout } from "../../redux/slices/customerAuthSlice";
import Navbar from "../../Components/Navbar";

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

  if (loading) return <div className="text-center mt-20">Loading order...</div>;
  if (!order) return <div className="text-center mt-20">Order not found</div>;
  return (
    <div className="min-h-screen bg-[#FAFAF7]   pb-24">
      <Navbar />
      <div className="max-w-xl mx-auto pt-10">
        <div>
          <button
            className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-[#8BAD2B] mb-6"
            onClick={() => navigate("/stores")}
          >
            <ArrowLeft size={16} />
            Continue shopping
          </button>
          <div className="flex items-center gap-4 justify-end pb-10">
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

        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#8BAD2B]">
            <CheckCircle2 size={20} />
            <span className="font-semibold">Order Placed successfully</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Store</p>
            <p className="font-medium">{order.store?.storeName}</p>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
            {order.items.map((item) => (
              <div key={item.product} className="flex justify-between text-sm">
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
          <p className="text-xs text-gray-400 flex gap-2 justify-between">
            Status: {order.status}
            <span>Payment : Cash on delivery</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
