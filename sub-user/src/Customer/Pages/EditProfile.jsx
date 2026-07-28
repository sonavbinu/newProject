import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar";

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
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#FAFAF7] ">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border focus:outline-none focus:ring-[#8BAD2B] focus:ring-2 border-gray-300 rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              value={formData.email}
              disabled
              className="w-full focus:outline-none focus:ring-[#8BAD2B] focus:ring-2 border-gray-300 border rounded-lg p-3 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full focus:outline-none focus:ring-[#8BAD2B] focus:ring-2 border-gray-300 border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label>Address</label>
            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full focus:outline-none focus:ring-[#8BAD2B] focus:ring-2  border-gray-300 border rounded-lg p-3 mt-1"
            />
          </div>

          <button className="w-full bg-[#8BAD2B] text-white py-3 rounded-xl hover:opacity-90">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
