import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../../redux/slices/customerAuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold">Login to order</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B]"
        />
        <button
          type="submit"
          className="bg-[#8BAD2B] cursor-pointer text-white rounded-lg py-2 hover:opacity-90"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-[#8BAD2B] hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
