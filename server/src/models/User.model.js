// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     name: {
//       type: String,
//       trim: true
//     },
//     passwordHash: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },
//     avatarUrl: {
//       type: String
//     },
//     bio: {
//       type: String,
//       trim: true
//     }
//   },
//   { timestamps: true }
// );

// userSchema.index({ email: 1 });
// userSchema.index({ username: 1 });

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    followersCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },


    //New profile fields
    avatarUrl: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.index({ followersCount: -1 });
userSchema.index({ followingCount: -1 });
export const User = mongoose.model("User", userSchema);

