// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const ensureDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }
// };

// const avatarStorage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     const uploadDir = path.join(process.cwd(), "src", "uploads", "avatars");
//     ensureDir(uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname) || ".jpg";
//     const base = (req.user?._id?.toString() || "avatar") + "-" + Date.now();
//     cb(null, `${base}${ext}`);
//   }
// });

// export const avatarUpload = multer({
//   storage: avatarStorage,
//   limits: {
//     fileSize: 2 * 1024 * 1024 // 2MB
//   },
//   fileFilter: (_req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("Only image uploads are allowed"));
//     } else {
//       cb(null, true);
//     }
//   }
// });


import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Avatar storage
const avatarStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = path.join(process.cwd(), "src", "uploads", "avatars");
    ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const base = (req.user?._id?.toString() || "avatar") + "-" + Date.now();
    cb(null, `${base}${ext}`);
  }
});

// Post media storage
const postMediaStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = path.join(process.cwd(), "src", "uploads", "posts");
    ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const base = (req.user?._id?.toString() || "post") + "-" + Date.now();
    cb(null, `${base}${ext}`);
  }
});

export const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
    } else cb(null, true);
  }
});

export const postMediaUpload = multer({
  storage: postMediaStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads (for now) are allowed"));
    } else cb(null, true);
  }
});
