import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import {
  notEmptyValidation,
  emailValidation,
  minLengthValidation,
  compareFieldValidation,
  phoneValidation,
  isValidObjectId,
} from "../utils/validators.js";
import {
  generate20CharToken,
  generateAccessRefreshToken,
  generatePasswordResetToken,
  options,
} from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  welcomeEmail,
} from "../configs/email.config.js";

// Get User Controller
export const getUserProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get User from request
   * TODO: Send Response
   * **/

  // * Get User from request
  const requestUser = req.user;
  const user = await User.findById(requestUser._id).select(
    "-password -refreshToken"
  );

  // * Send Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Fetched user profile successfully!"));
});

// Register Controller
export const registerController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Check if the user exists
   * TODO: Create a new User
   * TODO: Check if the user is created
   * TODO: Generate Access & Refresh Token
   * TODO: Send Response to user
   * **/

  // * Get data from frontend
  const { name, email, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([name, email, password, password2]);
  emailValidation(email);
  minLengthValidation(password, 6, "Password");
  compareFieldValidation(password, password2, "Password does not match");

  // * Check if the user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exsists");
  }

  // * Create a new user
  const createdUser = await User.create({
    fullName: name,
    email,
    password,
    subscribed: true,
  });

  // * Check if the user is created
  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(400, "Error creating user");

  // * Send Email
  await welcomeEmail(user);

  // * Generate Access & Refresh Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  // * Sending Response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user,
          accessToken,
          refreshToken,
        },
        "User created successfully!"
      )
    );
});

// Login Controller
export const loginController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from user
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Check Password
   * TODO: Generate Token
   * TODO: Sending Response
   * **/

  // * Get data from user
  const { email, password } = req.body;

  // * Validate data
  notEmptyValidation([email, password]);
  emailValidation(email);
  minLengthValidation(password, 6, "Password");

  // * Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  // * Check Password
  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    throw new ApiError(401, "Invalid password");
  }

  // * Generate Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // * Sending Response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});

// Logout Controller
export const logoutController = asyncHandler(async (req, res) => {
  /**
   * TODO: Update token in backend
   * TODO: Delete cookie from frontend
   * TODO: Sending Response
   * **/

  // * Update token in backend
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // * Sending Response & Delete cookie from frontend
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!"));
});

// Refresh Access Token Controller
export const refreshAccessTokenController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Refresh token from cookie
   * TODO: Decode Refresh Token
   * TODO: Check if user exists
   * TODO: Compare cookie refresh token with refresh token stored in database
   * TODO: Generate new access token
   * TODO: Sending Response
   * **/

  // * Get Refresh token from cookie
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized Request");
  }

  try {
    // * Decode refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // * Check if user exists
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(400, "Invalid refresh token");
    }

    // * Compare cookie refresh token with refresh token stored in database
    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401).json({ message: "Refres token is expired!" });
    }

    // * Generate new access token
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    // * Sending Response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(400, error.message || "Invalid refresh token");
  }
});

// Forgot Password Controller
export const forgotPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get email from frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Sending Email with password reset token
   * TODO: Sending Response
   * **/

  // * Get email from frontend
  const { email } = req.body;

  // * Validate data
  notEmptyValidation([email]);
  emailValidation(email);

  // * Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // * Sending Email with password reset token
  const token = generate20CharToken();
  generatePasswordResetToken(user._id, token);
  sendPasswordResetEmail(user.email, user.fullName, token);

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

// Forgot Password Request Controller
export const forgotPasswordRequestController = asyncHandler(
  async (req, res) => {
    /**
     * TODO: Get token from URL
     * TODO: Check if token is valid
     * TODO: Get data from Frontend
     * TODO: Validate data
     * TODO: Update new password
     * TODO: Sending Response
     * **/

    // * Get token from URL
    const { token } = req.query;

    // * Check if token is valid
    const user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    const currentDate = new Date();
    if (currentDate > user.passwordResetTokenExpiry) {
      throw new ApiError(400, "Password reset token has expired");
    }

    // * Get data from Frontend
    const { password, password2 } = req.body;

    // * Validate data
    notEmptyValidation([password, password2]);
    minLengthValidation(password, 6, "Password");
    compareFieldValidation(password, password2, "Password does not match");

    // * Update new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully!"));
  }
);

// Reset Password Controller
export const resetPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: check if old password is correct
   * TODO: Update password to new password
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { oldPassword, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([oldPassword, password, password2]);
  minLengthValidation(password, 6, "Password");
  if (oldPassword === password) {
    throw new ApiError(400, "Old password cannot be same as new password");
  }
  compareFieldValidation(password, password2, "Password does not match");

  // * Check if old password is correct
  const user = await User.findById(req.user._id);
  const passwordCheck = await user.isPasswordCorrect(oldPassword);
  if (!passwordCheck) {
    throw new ApiError(400, "Old password is incorrect");
  }

  // * Update password to new password
  user.password = password;
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully!"));
});

// Update User Profile Controller
export const updateProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Update user profile
   * TODO: Send Response with user profile
   * **/

  // * Get data from frontend
  const { fullName, email, phone, gender, birthDate, pronounce } = req.body;

  // * Validate data
  notEmptyValidation([fullName, email, phone, gender, birthDate]);
  emailValidation(email);
  phoneValidation(phone);

  try {
    // * Find the user by ID
    const user = await User.findById(req.user._id);

    // Check if the email has changed
    if (email !== req.user.email) {
      // * Check if the new email already exists in the database
      const existingEmailUser = await User.findOne({ email });

      if (existingEmailUser) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Email already exists"));
      }
    }

    // Check if the phone has changed
    if (phone !== req.user.phone) {
      // * Check if the new phone number already exists in the database
      const existingPhoneUser = await User.findOne({ phone });

      if (existingPhoneUser) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Phone number already exists"));
      }
    }

    // * Update user profile
    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    user.gender = gender;
    user.birthDate = birthDate;
    user.pronounce = pronounce;
    await user.save();

    // * Updated User
    const updatedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully!"));
  } catch (error) {
    throw new ApiError(500, `Server Error : ${error.message}`);
  }
});

// Update User Avatar Controller
export const updateAvatarController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get File from frontend
   * TODO: Upload File
   * TODO: Sending Response
   * **/

  // * Get File from frontend
  const avatar = req.file?.path;
  console.log(avatar);
  if (!avatar) {
    throw new ApiError(400, "Please upload an image");
  }

  // * Upload file
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar } },
    { new: true }
  ).select("-password -refreshToken");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image uploaded successfully!"));
});

// Remove User Avatar Controller
export const removeAvatarController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get User from request and remove avatar
   * TODO: Sending Response
   * **/

  // * Get User from request and remove avatar
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $unset: { avatar: "" } },
    { new: true }
  );

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar removed successfully!"));
});

// Redirect to Google for authentication
export const googleAuthentication = async (req, res) => {
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage" // Specify the redirect URI (for example: 'postmessage' for client-side apps)
  );

  const { code } = req.body;

  if (!code) {
    throw new ApiError(400, "Code not provided");
  }

  try {
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    // Verify the ID token using Google's OAuth2Client
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    // Check if the user already exists in your database
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = await User.create({
        googleId: sub,
        email,
        fullName: name,
        avatar: picture,
        subscribed: true,
      });

      // * Send Email
      await welcomeEmail(user);
    }
    console.log(user);

    // Generate Access & Refresh Token
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    // Sending Response
    return res
      .status(201)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({
        user: user.toObject({
          transform: function (doc, ret) {
            delete ret.password;
            delete ret.refreshToken;
            return ret;
          },
        }),
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new ApiError(500, "Internal Server Error");
  }
};

// Unsubscribe User
export const unsubscribeUserController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get id from params
   * TODO: Get Email from frontend
   * TODO: Search user and mark as unsubscribed
   * TODO: Send Response
   * **/

  // * Get User from request and update
  const reqUser = req.params._id;
  if (!isValidObjectId(reqUser)) {
    throw new ApiError(400, "Invalid User Id");
  }

  // * Get Email from frontend
  const { email } = req.body;
  emailValidation(email);
  if (!email) {
    throw new ApiError(400, "Email not provided");
  }

  // * Search for user
  const user = await User.findById(reqUser);

  // * Check if user exists
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // * Check if email matches user's email
  if (user.email !== email) {
    throw new ApiError(400, "Invalid Email.");
  }

  // * Mark user as unsubscribed
  user.subscribed = false;
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User unsubscribed successfully!"));
});
