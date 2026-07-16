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
