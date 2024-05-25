import express from "express";
import multer from "multer";
import restaurantController from "../controllers/restaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  restaurantController.getRestaurantOrders
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  restaurantController.updateOrderStatus
);

// GET api/restaurant
router.get("/", jwtCheck, jwtParse, restaurantController.getRestaurant);
// POST api/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  restaurantController.createRestaurant
);
// PUT /api/restaurant/:
router.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  restaurantController.updateRestaurant
);

export default router;
