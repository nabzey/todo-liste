"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentificate = authentificate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authentificate(req, res, next) {
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
            res.status(401).json({ message: "Token is missing" });
            return;
        }
        const token = bearerToken.split(" ")[1];
        const secret = process.env.JWT_SECRETE;
        if (!secret) {
            res.status(401).json({ message: "Clé secrete introuvable" });
            return;
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload.id)
            res.status(400).json({ message: "jwt invalide" });
        req.user = {
            id: typeof payload.id === "string" ? parseInt(payload.id, 10) : payload.id,
            email: payload.email,
        };
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.default = authentificate;
//# sourceMappingURL=Authmiddleware.js.map