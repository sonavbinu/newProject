import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, ShoppingBasket } from "lucide-react";
import { registerCustomer } from "../../redux/slices/customerAuthSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
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

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full name",
      icon: User,
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: Mail,
      requrie: true,
    },
    { name: "phone", type: "tel", placeholder: "Phone number", icon: Phone },
    {
      name: "address",
      type: "text",
      placeholder: "Delivery address",
      icon: MapPin,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: Lock,
      required: true,
      minLength: 6,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#F1F5F3] flex items-center justify-center mb-4">
            <ShoppingBasket className="text-[#8BAD2B]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start ordering from local stores
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
        >
          {fields.map(
            ({ name, type, placeholder, icon: Icon, required, minLength }) => (
              <div className="flex items-center gap-3" key={name}>
                <Icon size={18} />
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  minLength={minLength}
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] focus:border-transparent transition"
                />
              </div>
            ),
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8BAD2B] text-white rounded-lg py-2 hover:opacity-90"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-[#8BAD2B] hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
