import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../../redux/slices/customerAuthSlice";
import { toast } from "react-toastify";
import { ShoppingBasket, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginCustomer({ email, password })).unwrap();
      toast.success("Logged in");
      navigate("/stores");
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#F1F5E3] flex items-center justify-center">
            <ShoppingBasket size={26} className="text-[#8BAD2B] " />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to start ordering</p>
        </div>{" "}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm flex flex-col gap-4"
        >
          <div className="flex items-center  gap-3">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B]"
            />
          </div>

          <div className="flex items-center gap-3">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8BAD2B] cursor-pointer text-white rounded-lg py-2 hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-500">
            New here?
            <Link
              to="/register"
              className="text-[#8BAD2B] hover:underline font-medium pl-1"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
