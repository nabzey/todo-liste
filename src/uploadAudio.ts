import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("./uploads/audio");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`),
});

const uploadAudio = multer({ storage });

export default uploadAudio;
