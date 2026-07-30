export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path; // already a full Cloudinary URL
  return `${import.meta.env.VITE_API_URL?.replace("/api", "")}${path}`; // legacy local path
};
