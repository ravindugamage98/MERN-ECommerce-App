import express from "express";
import { param } from "express-validator";
import allRestaurantsController from "../controllers/allRestaurantsController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId parameter must be a valid string"),
  allRestaurantsController.getRestaurant
);

// /api/restaurants/search/london
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  allRestaurantsController.searchRestaurant
);

export default router;
