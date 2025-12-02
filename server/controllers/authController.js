import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

// ==================== REGISTER ====================
export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    volunteer,
    organization
  } = req.body;

  try {

    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isVolunteer = volunteer === true || volunteer === "true";
    const rights = 0;

    const [result] = await db.query(
    `INSERT INTO users
    (first_name, last_name, email, phone, password, volunteer, organization, rights, descrip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        first_name,
        last_name,
        email,
        phone,
        hashedPassword,
        isVolunteer,
        organization || null,
        rights,
        "" 
    ]
    );


    const accessToken = jwt.sign(
      { id: result.insertId, first_name, last_name, email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: result.insertId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    await db.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshToken, result.insertId]
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "User registered successfully",
      accessToken
    });

  } catch (error) {
    console.error("Registration error:", error); 
    res.status(500).json({ message: "Server error" });
  }
};


// ==================== LOGIN ====================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!users.length) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = users[0];
    
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    await db.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshToken, user.id]
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
    accessToken,
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    rights: user.rights,
    volunteer: user.volunteer
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==================== REFRESH TOKEN ====================
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const [users] = await db.query(
      "SELECT * FROM users WHERE id = ? AND refresh_token = ?",
      [decoded.id, token]
    );

    if (!users.length) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = users[0];

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token expired or invalid" });
  }
};
