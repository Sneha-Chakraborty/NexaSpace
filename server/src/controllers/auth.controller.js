// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { registerUser, loginUser } from "../services/auth.service.js";
// import { signAccessToken } from "../utils/token.js";

// const buildUserPayload = (user) => ({
//   id: user._id,
//   email: user.email,
//   username: user.username,
//   name: user.name,
//   role: user.role,
//   createdAt: user.createdAt
// });

// export const register = asyncHandler(async (req, res) => {
//   const { email, username, password, name } = req.body;

//   const user = await registerUser({ email, username, password, name });
//   const token = signAccessToken(user);

//   const response = new ApiResponse(
//     201,
//     {
//       user: buildUserPayload(user),
//       token
//     },
//     "User registered successfully"
//   );

//   res.status(201).json(response);
// });

// // export const login = asyncHandler(async (req, res) => {
// //   const { email, password } = req.body;

// //   const user = await loginUser({ email, password });
// //   const token = signAccessToken(user);

// //   const response = new ApiResponse(
// //     200,
// //     {
// //       user: buildUserPayload(user),
// //       token
// //     },
// //     "Login successful"
// //   );

// //   res.status(200).json(response);
// // });


// export const login = asyncHandler(async (req, res) => {
//   console.log("LOGIN BODY:", req.body); // <--- debug log

//   const { email, password } = req.body || {};

//   if (!email || !password) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.passwordHash);
//   if (!isMatch) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const accessToken = signAccessToken(user); // use your existing helper

//   res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: {
//             id: user._id.toString(),
//             email: user.email,
//             username: user.username,
//             name: user.name,
//             role: user.role,
//             followersCount: user.followers?.length || 0,
//             followingCount: user.following?.length || 0,
//             profilePic: user.profilePic,
//             avatarUrl: user.avatarUrl,
//             verified: user.verified,
//           },
//           accessToken,
//         },
//         "Login successful"
//       )
//     );
// });


// export const getMe = asyncHandler(async (req, res) => {
//   const user = buildUserPayload(req.user);

//   const response = new ApiResponse(200, { user }, "Current user");
//   res.status(200).json(response);
// });


// export const logout = asyncHandler(async (req, res) => {
//   const response = new ApiResponse(200, {}, "User logged out successfully");
//   res.status(200).json(response);
// });



// server/src/controllers/auth.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";   // ✅ THIS was missing
import bcrypt from "bcryptjs";
import { signAccessToken } from "../utils/token.js"; // use your existing helper

// Helper to shape user object for client
const mapUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  username: user.username,
  name: user.name,
  role: user.role,
  followersCount: user.followers?.length || 0,
  followingCount: user.following?.length || 0,
  profilePic: user.profilePic,
  avatarUrl: user.avatarUrl,
  verified: user.verified,
});

// POST /auth/register
export const registerController = asyncHandler(async (req, res) => {
  const { email, password, username, name } = req.body || {};

  if (!email || !password || !username) {
    throw new ApiError(400, "Email, password and username are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    name,
    passwordHash,
    role: "user",
  });

  const accessToken = signAccessToken(user);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          user: mapUser(user),
          accessToken,
        },
        "Registration successful"
      )
    );
});

// POST /auth/login
export const loginController = asyncHandler(async (req, res) => {
  console.log("🔐 LOGIN BODY:", req.body);
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = signAccessToken(user);

  res.json(
    new ApiResponse(
      200,
      {
        user: mapUser(user),
        accessToken,
      },
      "Login successful"
    )
  );
});

// GET /auth/me
export const meController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Not authenticated");
  }

  res.json(new ApiResponse(200, { user: mapUser(req.user) }, "Current user"));
});

// POST /auth/logout
export const logoutController = asyncHandler(async (_req, res) => {
  // If you were using cookies, you’d clear them here.
  // For token-in-localStorage, just return success.
  res.json(new ApiResponse(200, {}, "Logged out"));
});
