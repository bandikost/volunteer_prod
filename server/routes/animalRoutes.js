import express from "express";
import { getAnimals, getUserAnimals } from "../controllers/animalController.js";

const router = express.Router();

router.get("/", getAnimals);
router.get("/user/:id", getUserAnimals);

export default router;
