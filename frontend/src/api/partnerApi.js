import API from "./api";

export const getProfile = () => {
  return API.get("/users/profile");
};

export const updateProfile = (data) => {
  return API.put("/users/profile", data);
};
