import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ShoppingBasket,
  Eye,
  EyeOff,
} from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(registerCustomer(formData)).unwrap();
      toast.success("Account created");
      navigate("/stores");
    } catch (err) {
      toast.error(err || "Registration failed");
    } finally {
      setLoading(false);
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
      required: true,
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F7F9F2] via-white to-[#EEF7D4]">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-3 mt-2">
          <div className="w-20 h-20 rounded-3xl bg-[#8BAD2B] flex items-center justify-center">
            <ShoppingBasket className="text-white" size={38} />
          </div>
          <h1 className="text-3xl mt-6 font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-500 mt-2">Start ordering from local stores</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full flex flex-col gap-5"
        >
          {fields.map(
            ({ name, type, placeholder, icon: Icon, required, minLength }) => (
              <div
                className="flex items-center rounded-xl border border-gray-300 p-2 
              focus-within:ring-2 focus-within:ring-[#8BAD2B] transition gap-3"
                key={name}
              >
                <Icon size={20} className="text-[#8BAD2B] flex-shrink-0" />
                <input
                  type={
                    name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  minLength={minLength}
                  className="w-full  rounded-lg p-2
                  focus:outline-none transparent"
                />
                {name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-[#8BAD2B]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            ),
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8BAD2B] hover:bg-[#799B26] hover:shadow-lg disabled:opacity-60
             w-full text-white rounded-xl 
             font-semibold shadow-md transition py-3 hover:opacity-90"
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
