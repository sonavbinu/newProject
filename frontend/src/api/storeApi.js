import API from "./api";

export const registerStore = (data) => {
  return API.post("/stores/register", data);
};
