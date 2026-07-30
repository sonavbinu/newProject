require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping((err, result) => {
  console.log("PING");
  console.log(err);
  console.log(result);
});

cloudinary.uploader
  .upload("./images.jpg", {
    folder: "origin/products",
    resource_type: "image",
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
