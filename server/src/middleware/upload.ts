import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directories
const uploadDirChannels = "uploads/channels";
const uploadDirVideos = "uploads/videos";

// Ensure directories exist
[uploadDirChannels, uploadDirVideos].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, uploadDirChannels);
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, uploadDirVideos);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max for video
  },
});
