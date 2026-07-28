import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Phone, MapPin, Calendar, BadgeCheck } from "lucide-react";

const ProfileMenu = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("selectedStoreId");

    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  if (!user) return null;
  return (
    <div>
      <div className="mt-6 space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-[#8BAD2B]" size={18} />
              <p className="text-sm text-gray-500">Full Name</p>
            </div>{" "}
            <p className="font-medium border p-3 w-full rounded-lg border-gray-300">
              {user.name}
            </p>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#8BAD2B]" />
              <p className="text-sm text-gray-500">Email</p>
            </div>{" "}
            <p className="font-medium border border-gray-300 p-3 rounded-lg w-full">
              {user.email}
            </p>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#8BAD2B]" />
              <p className="text-sm text-gray-500">Phone</p>
            </div>{" "}
            <p className="border border-gray-300 p-3 rounded-lg w-full font-medium">
              {user.phone}
            </p>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#8BAD2B]" />
              <p className="text-sm text-gray-500">Address</p>
            </div>{" "}
            <p className="border border-gray-300 p-3 rounded-lg w-full font-medium">
              {user.address || "Not added"}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BadgeCheck size={18} />
              <p className="text-sm text-gray-500">Customer ID</p>
              <p>{user._id}</p>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <p className="text-sm text-gray-500">Joined On</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck size={18} />
              <p className="text-sm text-gray-500">Status</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/profile/edit")}
            className="w-full bg-[#8BAD2B] hover:bg-white hover:text-black hover:border-[#8BAD2B] border cursor-pointer text-white py-3 rounded-xl"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full mb-10 hover:bg-red-500 hover:text-white border border-red-500 text-red-500 py-3 transition-all duration-200 cursor-pointer rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
