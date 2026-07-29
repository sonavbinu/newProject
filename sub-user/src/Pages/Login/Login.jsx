import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../../redux/slices/customerAuthSlice";
import { toast } from "react-toastify";
import { ShoppingBasket, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await dispatch(
        loginCustomer({
          email,
          password,
        }),
      ).unwrap();

      toast.success("Logged in successfully");
      navigate("/stores");
    } catch (err) {
      toast.error(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9F2] via-white to-[#EEF7D4] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-[#8BAD2B] flex items-center justify-center shadow-lg">
            <ShoppingBasket size={38} className="text-white" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">Login to continue shopping</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8 space-y-5"
        >
          {/* Email */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-[#8BAD2B]">
              <Mail size={20} className="text-[#8BAD2B]" />

              <input
                type="email"
                placeholder="Enter your email"
                className="ml-3 flex-1 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-[#8BAD2B]">
              <Lock size={20} className="text-[#8BAD2B]" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="ml-3 flex-1 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-[#8BAD2B] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#8BAD2B] py-3 text-white font-semibold shadow-md transition-all duration-300 hover:bg-[#799B26] hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#8BAD2B] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
