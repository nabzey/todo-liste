"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UsersService_1 = require("../services/UsersService");
const validate_1 = require("../validators/validate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service = new UsersService_1.UsersService;
class UserController {
    async getAll(req, res) {
        try {
            const data = await service.findUsers();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(400).json({ message: 'vous ne pouvez recuper les donnees', error });
        }
    }
    async getOne(req, res) {
        try {
            const idparams = req.params.id;
            if (!idparams)
                return res.status(404).json({ message: 'erreur' });
            const id = parseInt(idparams);
            if (Number.isNaN(id))
                return res.json({ message: 'nombre' });
            const data = validate_1.schemaUser.safeParse(req.body);
            if (!data.success)
                return res.status(404).json({ message: 'donnees requise' });
            const u = await service.update(id, data.data);
            res.status(200).json(u);
        }
        catch (error) {
        }
    }
    async createUser(req, res) {
        const users = validate_1.schemaUser.safeParse(req.body);
        if (!users.success)
            return res.status(400).json({ message: "error", error: users.error.format });
        const a = await service.create(req.body);
        res.status(200).json({
            message: "reussi",
            data: a
        });
    }
    async login(req, res) {
        const verif = validate_1.schemalogin.safeParse(req.body);
        if (!verif.success)
            return res.status(401).json({ message: "invalide", error: verif.error.format() });
        const a = await service.loginUser(req.body);
        res.status(200).json({
            message: 'reussi',
            data: a
        });
    }
    async tokenrefresh(req, res) {
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
            const accesToken = await service.refresh(payload);
            return res.status(200).json(accesToken);
        }
        catch (error) {
        }
        //  const result = schemalogin.safeParse(req.body)
        //       if (!result) 
        //       {return res.status(400).json({ message: 'email invalide'})}
        //      const refresh = await service.refresh(req.body)
        //        return res.status(200).json({ refresh })
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map