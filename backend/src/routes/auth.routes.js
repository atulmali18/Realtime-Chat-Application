import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.put(
  "/update-profile",
  authMiddleware.authUser,
  userController.updateUserProfile
);

router.get('/check', authMiddleware.authUser, userController.checkAuth);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);


export default router;
