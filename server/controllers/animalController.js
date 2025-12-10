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

export const updateAnimal = async (req, res) => {
  const id = Number(req.params.id);
  const { type, breed, name, descrip, lefts } = req.body;

  try {
    const [update] = await db.query(
      `UPDATE animals 
       SET type = ?, breed = ?, name = ?, descrip = ?, lefts = ?
       WHERE id = ?`,
      [type, breed, name, descrip, Number(lefts), id]
    );

    res.json({ message: "Животное обновлено", affectedRows: update.affectedRows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера при обновлении животного" });
  }
};


export const addFavorite = async (req, res) => {
  const { user_id, animal_id } = req.body;

  try {
    await db.query(
      "INSERT INTO favorites (user_id, animal_id) VALUES (?, ?)",
      [user_id, animal_id]
    );

    res.json({ message: "Animal added to favorites" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM favorites");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFavorite = async (req, res) => {
  const { user_id, animal_id } = req.body;

  try {
    const [result] = await db.query(
      "DELETE FROM favorites WHERE user_id = ? AND animal_id = ?",
      [user_id, animal_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Animal removed from favorites" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};



export const getUserFavorites = async (req, res) => {
  const user_id = req.params.id;

  try {
    const [data] = await db.query(
      `SELECT DISTINCT a.*
       FROM favorites f
       JOIN animals a ON f.animal_id = a.id
       WHERE f.user_id = ?`,
      [user_id]
    );

    res.json(data);

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};


export const addNewAnimal = async (req, res) => {
  try {
    const { type, breed, name, descrip, lefts, owner_name, owner_rights, owner_descrip, owner_id, image_url } = req.body;

    const [result] = await db.query(
      `INSERT INTO animals 
        (type, breed, name, descrip, lefts, owner_name, owner_rights, owner_descrip, owner_id, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, breed, name, descrip, lefts, owner_name, owner_rights, owner_descrip, owner_id, image_url]
    );

    res.json({ message: "Животное добавлено", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера при добавлении животного" });
  }
};
