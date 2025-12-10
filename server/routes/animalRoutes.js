import express from "express";
import { getAnimals, getUserAnimals, updateAnimal, getUserFavorites, addFavorite, getFavorites, removeFavorite, addNewAnimal  } from "../controllers/animalController.js";

const router = express.Router();

router.get("/", getAnimals);
router.get("/user/:id", getUserAnimals);
router.put("/:id", updateAnimal);
router.get("/favorites/user/:id", getUserFavorites);
router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites", removeFavorite);
router.post("/add", addNewAnimal);


export default router;
