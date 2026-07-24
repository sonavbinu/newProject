import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import {
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from "../../redux/slices/cartSlice";
import { placeOrder } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, storeId } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.order);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    try {
      const order = await dispatch(placeOrder({ storeId, items })).unwrap();
      dispatch(clearCart());
      toast.success("Order placed!");
      navigate(`/orders/${order._id}`);
    } catch (err) {
      toast.error(err || "Failed to place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center gap-3">
        <ShoppingBag className="text-gray-300" size={40} />
        <p className="text-gray-500">Your cart is empty</p>
        <button
          onClick={() => navigate("/stores")}
          className="text-[#8BAD2B] font-medium text-sm hover:underline"
        >
          Browse stores
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] px-6 pt-10 pb-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {item.productName}
                </h3>
                <p className="text-sm text-gray-500">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementItem(item.productId))}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(incrementItem(item.productId))}
                  disabled={item.quantity >= item.stock}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="font-semibold text-gray-900 w-16 text-right">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => dispatch(removeItem(item.productId))}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-900">₹{total}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="bg-[#8BAD2B] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "Placing order..." : "Place Order (COD)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
