"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const Tacherouter_1 = __importDefault(require("./routes/Tacherouter"));
const Authmiddleware_1 = __importDefault(require("./middlewares/Authmiddleware"));
const app = (0, express_1.default)();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// Middlewares
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
// Pour servir les fichiers statiques du dossier uploads
app.use('/uploads', express_1.default.static('uploads'));
// Routes
app.use('/users', UserRoute_1.default);
app.use('/taches', Authmiddleware_1.default, Tacherouter_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map