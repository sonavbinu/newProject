import React from "react";
import { Mail, Phone, Pencil, BadgeCheck } from "lucide-react";

const ProfileHeader = ({ user, onEdit }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
      {/* Top Gradient */}
      <div className="h-32 bg-gradient-to-r from-[#8BAD2B] via-[#95B933] to-[#A8C93A]" />

      <div className="relative px-8 pb-8">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="-mt-14 relative">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-[#8BAD2B] shadow-xl flex items-center justify-center text-4xl font-bold text-white">
              {initials}
            </div>

            {/* Verified Badge */}
            <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
              <BadgeCheck className="text-[#8BAD2B]" size={20} fill="#8BAD2B" />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mt-5 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {user?.name || "Customer"}
          </h2>

          <p className="mt-1 text-gray-500">
            Welcome back! Manage your profile information.
          </p>
        </div>

        {/* Contact Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-[#EEF7D4] px-5 py-3 shadow-sm">
            <Mail className="text-[#8BAD2B]" size={18} />
            <span className="text-sm font-medium text-gray-700">
              {user?.email || "Not Available"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#EEF7D4] px-5 py-3 shadow-sm">
            <Phone className="text-[#8BAD2B]" size={18} />
            <span className="text-sm font-medium text-gray-700">
              {user?.phone || "Not Available"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 border-t border-gray-200"></div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl bg-[#F8FAF4] p-4 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#8BAD2B]">100%</h3>
            <p className="mt-1 text-sm text-gray-500">Verified</p>
          </div>

          <div className="rounded-2xl bg-[#F8FAF4] p-4 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#8BAD2B]">
              {user?.createdAt ? new Date(user.createdAt).getFullYear() : "--"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Member Since</p>
          </div>

          <div className="rounded-2xl bg-[#F8FAF4] p-4 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-[#8BAD2B]">Active</h3>
            <p className="mt-1 text-sm text-gray-500">Status</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl bg-[#8BAD2B] px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#799B26] hover:shadow-xl"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
