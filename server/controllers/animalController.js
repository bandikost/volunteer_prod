import { db } from "../config/db.js";

export const getAnimals = async (req, res) => {
  try {
    const [animals] = await db.query("SELECT * FROM animals");
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAnimals = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const [animals] = await db.query(
      "SELECT * FROM animals WHERE owner_id = ?",
      [ownerId]
    );

    res.json(animals);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


