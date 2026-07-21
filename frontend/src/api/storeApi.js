import API from "./api";

const noCache = {
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
};

export const registerStore = (data) => API.post("/stores/register", data);

export const getStores = () => API.get("/stores", noCache);

export const getStoreById = (storeId) => API.get(`/stores/${storeId}`, noCache);

export const saveStore = (formDataPayload) =>
  API.post("/stores", formDataPayload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const removeStoreImage = (storeId) =>
  API.delete("/stores/image", { data: { storeId } });
export const deleteStore = (storeId) => API.delete(`/stores/${storeId}`);
