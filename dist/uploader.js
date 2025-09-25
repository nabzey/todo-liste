"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDirPhoto = 'uploads/';
const uploadDirAudio = 'uploads/audio/';
if (!fs_1.default.existsSync(uploadDirPhoto))
    fs_1.default.mkdirSync(uploadDirPhoto);
if (!fs_1.default.existsSync(uploadDirAudio))
    fs_1.default.mkdirSync(uploadDirAudio, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'photo') {
            cb(null, uploadDirPhoto);
        }
        else if (file.fieldname === 'audio') {
            cb(null, uploadDirAudio);
        }
        else {
            cb(new Error('Type de fichier non autorisé'), '');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
// Filtre pour accepter images et audios
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'photo' && file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else if (file.fieldname === 'audio' && file.mimetype.startsWith('audio/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Seules les images et audios sont autorisés !'));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
//# sourceMappingURL=uploader.js.map