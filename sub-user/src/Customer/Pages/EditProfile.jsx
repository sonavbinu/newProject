import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar";
import { User, Mail, Phone, MapPin, Save, ArrowLeft } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/customer-auth/profile");

        setFormData({
          name: res.data.customer.name || "",
          email: res.data.customer.email || "",
          phone: res.data.customer.phone || "",
          address: res.data.customer.address || "",
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/customer-auth/profile", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );

  const initials = formData.name
    ? formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-[#F7F9F2]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
          {/* Header */}
          <div className="h-32 bg-gradient-to-r from-[#8BAD2B] to-[#A6C93A]" />

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex justify-center -mt-14">
              <div className="w-28 h-28 rounded-full bg-[#8BAD2B] border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-white">
                {initials}
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold">Edit Profile</h2>

              <p className="text-gray-500 mt-2">
                Keep your personal information up to date.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name */}
              <div>
                <label className="font-medium mb-2 block">Full Name</label>

                <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#8BAD2B]">
                  <User className="text-[#8BAD2B]" size={20} />

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-medium mb-2 block">Email Address</label>

                <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-100">
                  <Mail className="text-[#8BAD2B]" size={20} />

                  <input
                    value={formData.email}
                    disabled
                    className="w-full ml-3 bg-transparent outline-none text-gray-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="font-medium mb-2 block">Phone Number</label>

                <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#8BAD2B]">
                  <Phone className="text-[#8BAD2B]" size={20} />

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full ml-3 outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="font-medium mb-2 block">Address</label>

                <div className="flex items-start border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#8BAD2B]">
                  <MapPin className="text-[#8BAD2B] mt-1" size={20} />

                  <textarea
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full ml-3 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex-1 border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                  <ArrowLeft size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#8BAD2B] text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-[#799B26] transition shadow-md"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
