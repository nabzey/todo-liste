"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = __importDefault(require("./index.js"));
dotenv_1.default.config();
const port = Number(process.env.port) || 5000;
index_js_1.default.listen(port, () => {
    console.log(`serveur http://localhost:${port}`);
});
//# sourceMappingURL=serveur.js.map