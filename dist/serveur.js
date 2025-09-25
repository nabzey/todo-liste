"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("./index.js"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 4000;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: "http://localhost:5173", // autoriser ton front
//     methods: ["GET", "POST", "PUT", "DELETE"], // ce que tu autorises
//     credentials: true,
//   })
// );
index_js_1.default.listen(port, () => {
    console.log(`serveur http://localhost:${port}`);
});
//# sourceMappingURL=serveur.js.map