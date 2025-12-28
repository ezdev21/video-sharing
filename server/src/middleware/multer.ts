import multer from "multer";
import path from "path";
import fs from "fs";

// Base directory for uploads inside project
const BASE_UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Subdirectories
const uploadDirs = [
  path.join(BASE_UPLOAD_DIR, "channels", "avatar"),
  path.join(BASE_UPLOAD_DIR, "channels", "background"),
  path.join(BASE_UPLOAD_DIR, "videos", "thumbnail"),
  path.join(BASE_UPLOAD_DIR, "videos", "video"),
];

// Ensure all directories exist
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") cb(null, path.join(BASE_UPLOAD_DIR, "channels", "avatar"));
    else if (file.fieldname === "background") cb(null, path.join(BASE_UPLOAD_DIR, "channels", "background"));
    else if (file.fieldname === "thumbnail") cb(null, path.join(BASE_UPLOAD_DIR, "videos", "thumbnail"));
    else if (file.fieldname === "video") cb(null, path.join(BASE_UPLOAD_DIR, "videos", "video"));
    else cb(new Error("Unknown field"));
  },
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (_, file, cb) => {
  if (file.fieldname === "avatar" || file.fieldname === "background" || file.fieldname === "thumbnail") {
    if (!file.mimetype.startsWith("image/")) cb(new Error("Only images allowed"));
    else cb(null, true);
  } else if (file.fieldname === "video") {
    if (!file.mimetype.startsWith("video/")) cb(new Error("Only videos allowed"));
    else cb(null, true);
  } else {
    cb(new Error("Unknown field"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
});
