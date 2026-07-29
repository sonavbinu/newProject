import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BadgeCheck,
  LogOut,
  Pencil,
  ShieldCheck,
} from "lucide-react";

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

  const InfoCard = ({ icon: Icon, title, value }) => (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 hover:bg-[#EEF7D4] transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8BAD2B]/10">
        <Icon className="text-[#8BAD2B]" size={22} />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-gray-800 break-all">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="mt-6 space-y-6">
      {/* Personal Information */}
      <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Personal Information
          </h2>

          <span className="rounded-full bg-[#EEF7D4] px-3 py-1 text-sm font-medium text-[#8BAD2B]">
            Customer
          </span>
        </div>

        <div className="space-y-4">
          <InfoCard
            icon={User}
            title="Full Name"
            value={user.name || "Not Available"}
          />

          <InfoCard
            icon={Mail}
            title="Email Address"
            value={user.email || "Not Available"}
          />

          <InfoCard
            icon={Phone}
            title="Phone Number"
            value={user.phone || "Not Available"}
          />

          <InfoCard
            icon={MapPin}
            title="Address"
            value={user.address || "Address not added"}
          />
        </div>
      </div>

      {/* Account Information */}
      <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Account Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#F8FAF4] p-5">
            <div className="flex items-center gap-2 text-[#8BAD2B]">
              <BadgeCheck size={18} />
              <span className="text-sm font-medium">Customer ID</span>
            </div>

            <p className="mt-3 text-sm font-semibold break-all">{user._id}</p>
          </div>

          <div className="rounded-2xl bg-[#F8FAF4] p-5">
            <div className="flex items-center gap-2 text-[#8BAD2B]">
              <Calendar size={18} />
              <span className="text-sm font-medium">Joined On</span>
            </div>

            <p className="mt-3 font-semibold">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "--"}
            </p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mt-5 rounded-2xl bg-green-50 border border-green-200 p-4 flex items-center gap-3">
          <ShieldCheck className="text-green-600" size={24} />

          <div>
            <h4 className="font-semibold text-green-700">Verified Account</h4>

            <p className="text-sm text-green-600">
              Your account has been successfully verified.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => navigate("/profile/edit")}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#8BAD2B] py-3.5 text-white font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#799B26] hover:shadow-lg"
        >
          <Pencil size={18} />
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-red-500 py-3.5 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
