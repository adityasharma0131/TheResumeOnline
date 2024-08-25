import { Router } from "express";
import {
  forgotPasswordController,
  forgotPasswordRequestController,
  getUserProfileController,
  googleAuthentication,
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
  removeAvatarController,
  resetPasswordController,
  unsubscribeUserController,
  updateAvatarController,
  updateProfileController,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/multer.middleware.js";

// Router
const router = new Router();

// Upload folders
const avatarUpload = uploadMiddleware("avatar");

// Routes
router.route("/google").post(googleAuthentication);

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(verifyUser, logoutController);

router.route("/profile").get(verifyUser, getUserProfileController);
router.route("/refresh-access-token").post(refreshAccessTokenController);

router.route("/forgot-password").post(forgotPasswordController);
router.route("/forgot-password-request").patch(forgotPasswordRequestController);
router.route("/reset-password").patch(verifyUser, resetPasswordController);

router.route("/update-profile").patch(verifyUser, updateProfileController);
router
  .route("/update-avatar")
  .patch(verifyUser, avatarUpload, updateAvatarController);
router.route("/remove-avatar").patch(verifyUser, removeAvatarController);

router.route("/unsubscribe/:_id").patch(unsubscribeUserController);

export default router;
