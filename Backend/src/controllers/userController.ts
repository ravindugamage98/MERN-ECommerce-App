import { Request, Response } from "express";
import User from "../models/user";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error " });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.status(200).json(user.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Error updating user" });
  }
};

export default {
  createUser,
  updateUser,
  getUser,
};
