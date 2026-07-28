import React from "react";
import { Mail, Phone, Pencil } from "lucide-react";

const ProfileHeader = ({ user, onEdit }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#8BAD2B] text-white flex items-center justify-center text-3xl font-bold shadow-md">
          {initials}
        </div>

        {/* Name */}
        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          {user?.name || "Customer"}
        </h2>

        <div className="flex gap-5">
          {/* Email */}
          <div className="flex items-center gap-2 mt-3 text-gray-500 bg-[#eef7d4] p-2 rounded-xl">
            <Mail size={16} />
            <span>{user?.email || "-"}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mt-2 text-gray-500 bg-[#eef7d4] p-2 rounded-xl">
            <Phone size={16} />
            <span>{user?.phone || "-"}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8BAD2B] text-white font-medium hover:bg-[#799B26] transition"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
