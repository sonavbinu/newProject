import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerCustomer } from "../../redux/slices/customerAuthSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerCustomer(formData)).unwrap();
      toast.success("Account created");
      navigate("/stores");
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold">Create an account</h1>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] border-gray-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] border-gray-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] border-gray-300"
        />
        <button
          type="submit"
          className="bg-[#8BAD2B] text-white rounded-lg py-2 hover:opacity-90"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="text-[#8BAD2B] hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
