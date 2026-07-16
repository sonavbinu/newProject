import API from "./api";

export const sendOTP = (email) => {
  return API.post("/auth/send-otp", { email });
};

export const verifyOTP = (email, otp) => {
  return API.post("/auth/verify-otp", {
    email,
    otp,
  });
};

export const firebaseLogin = (phone, email) => {
  return API.post("/auth/firebase-login", {
    phone,
    email,
  });
};

export const getProfile = () => {
  const token = localStorage.getItem("token");
  return API.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = (data) => {
  const token = localStorage.getItem("token");
  return API.put("/auth/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
