"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const UserRepository_1 = require("../repository/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const repos = new UserRepository_1.UserRepository;
class UsersService {
    async findUsers() {
        return await repos.findAll();
    }
    async findUser(id) {
        return await repos.findById;
    }
    async create(users) {
        const pass = await bcrypt_1.default.hash(users.password, 10);
        const data = repos.create({
            ...users,
            password: pass
        });
        return data;
    }
    async update(id, data) {
        return await repos.update(id, data);
    }
    async deleteuser(id) {
        await repos.delete(id);
    }
    async loginUser(perso) {
        const users = await repos.findByEmail(perso.email);
        if (!users)
            throw new Error("utilisateur non trouve");
        const data = await bcrypt_1.default.compare(perso.password, users.password);
        if (!data)
            throw new Error("passe incorredte");
        const accesToken = jsonwebtoken_1.default.sign({
            id: users.id,
            email: users.email
        }, process.env.JWT_SECRETE, { expiresIn: "1h" });
        const refreshToken = jsonwebtoken_1.default.sign({
            email: users.email
        }, process.env.JWT_SECRETE, { expiresIn: "1d" });
        return { users, accesToken, refreshToken };
    }
    async refresh(perso) {
        const user = await repos.findByEmail(perso.email);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const accesToken = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRETE, { expiresIn: "24h" });
        return {
            accesToken
        };
    }
    async Update(id, data) {
        return await repos.updatestatus(id, data);
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.js.map