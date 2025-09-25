import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirPhoto = 'uploads/';
const uploadDirAudio = 'uploads/audio/';

if (!fs.existsSync(uploadDirPhoto)) fs.mkdirSync(uploadDirPhoto);
if (!fs.existsSync(uploadDirAudio)) fs.mkdirSync(uploadDirAudio, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photo') {
      cb(null, uploadDirPhoto);
    } else if (file.fieldname === 'audio') {
      cb(null, uploadDirAudio);
    } else {
      cb(new Error('Type de fichier non autorisé'), '');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtre pour accepter images et audios
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.fieldname === 'photo' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else if (file.fieldname === 'audio' && file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images et audios sont autorisés !'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
