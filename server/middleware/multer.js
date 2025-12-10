import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "animals",
    format: file.mimetype.split("/")[1],
  }),
});


const upload = multer({ storage });

export default upload;
