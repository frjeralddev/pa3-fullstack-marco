import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ success: false, error: "El email ya está registrado" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (error: unknown) {
    res
      .status(500)
      .json({ success: false, error: "Error al registrar el usuario" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, error: "Credenciales inválidas" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: "Credenciales inválidas" });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({
        success: false,
        error: "Error de configuración del servidor",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "2h" });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: "Error al iniciar sesión" });
  }
};
