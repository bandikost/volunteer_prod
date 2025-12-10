import express from "express";
import upload from "../middleware/multer.js";
import { uploadImg } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", upload.array("image", 3), uploadImg);

export default router;
