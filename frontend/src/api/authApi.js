import API from "./api";

export const sendOTP = (phone) => {
  return API.post("/auth/send-otp", { phone });
};

export const verifyOTP = (phone, otp) => {
  return API.post("/auth/verify-otp", {
    phone,
    otp,
  });
};
