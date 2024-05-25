import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";
const router = express.Router();

// import the userController
// get the user
router.get("/", jwtCheck, jwtParse, userController.getUser);
// if get a post request to backend /api/users, call the users_controller
router.post("/", jwtCheck, userController.createUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateUserRequest,
  userController.updateUser
);

export default router;
