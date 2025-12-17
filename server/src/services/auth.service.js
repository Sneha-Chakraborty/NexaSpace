import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

const SALT_ROUNDS = 10;

export const registerUser = async ({ email, username, password, name }) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "Email already registered");
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "Username already taken");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    email,
    username,
    name,
    passwordHash
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-passwordHash");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};
