// import sharp from "sharp";
// import path from "path";
// import fs from "fs";

// export const processAvatarImage = async (file) => {
//   if (!file) return null;

//   const outputFilename = path.parse(file.filename).name + "-processed.jpeg";
//   const outputPath = path.join(file.destination, outputFilename);

//   await sharp(file.path)
//     .resize(256, 256)
//     .toFormat("jpeg")
//     .jpeg({ quality: 80 })
//     .toFile(outputPath);

//   // Delete original upload
//   fs.unlink(file.path, () => {});

//   // Convert to public URL path (served from /uploads)
//   const marker = `${path.sep}uploads${path.sep}`;
//   const idx = outputPath.indexOf(marker);
//   let publicPath = outputPath;

//   if (idx !== -1) {
//     publicPath = outputPath.slice(idx).replace(/\\/g, "/");
//   }

//   if (!publicPath.startsWith("/")) publicPath = "/" + publicPath;
//   return publicPath; // e.g. /uploads/avatars/abc-processed.jpeg
// };


import sharp from "sharp";
import path from "path";
import fs from "fs";

const toPublicPath = (filePath) => {
  const marker = `${path.sep}uploads${path.sep}`;
  const idx = filePath.indexOf(marker);
  let publicPath = filePath;

  if (idx !== -1) {
    publicPath = filePath.slice(idx).replace(/\\/g, "/");
  }
  if (!publicPath.startsWith("/")) publicPath = "/" + publicPath;
  return publicPath; // /uploads/...
};

// Avatars: small square
export const processAvatarImage = async (file) => {
  if (!file) return null;

  const outputFilename = path.parse(file.filename).name + "-avatar.jpeg";
  const outputPath = path.join(file.destination, outputFilename);

  await sharp(file.path)
    .resize(256, 256)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(outputPath);

  fs.unlink(file.path, () => {});
  return toPublicPath(outputPath);
};

// Posts: wider image
export const processPostImage = async (file) => {
  if (!file) return null;

  const outputFilename = path.parse(file.filename).name + "-post.jpeg";
  const outputPath = path.join(file.destination, outputFilename);

  await sharp(file.path)
    .resize({ width: 1080 })
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(outputPath);

  fs.unlink(file.path, () => {});
  return toPublicPath(outputPath);
};
