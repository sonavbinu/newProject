import React, { useEffect, useState } from "react";
import ProfileHeader from "../Components/ProfileHeader";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-toastify";
import ProfileMenu from "../Components/ProfileMenu";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/customer-auth/profile");
        setUser(res.data.customer);
      } catch (error) {
        toast.error(error.response?.data.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-10">
      <div className="max-w-xl mx-auto px-6">
        <ProfileHeader user={user} onEdit={() => navigate("/profile/edit")} />
        <ProfileMenu user={user} />
      </div>
    </div>
  );
};

export default Profile;
