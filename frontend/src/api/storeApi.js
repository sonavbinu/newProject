import API from "./api";

export const registerStore = (data) => API.post("/stores/register", data);
export const getMyStores = () => API.get("/stores/me");
export const saveStore = (formDataPayload) =>
  API.post("/stores", formDataPayload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const removeStoreImage = () => API.delete("/stores/image");
