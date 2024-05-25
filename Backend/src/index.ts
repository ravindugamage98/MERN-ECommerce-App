import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import allRestaurantsRoute from "./routes/allRestaurantsRoute";
import orderRoute from "./routes/orderRoute";
import restaurantRoute from "./routes/restaurantRoute";
import userRoute from "./routes/userRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

// In order to handle the validation stripe needs access to raw data of the request
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/restaurants", allRestaurantsRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
