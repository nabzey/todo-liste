"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const cont = new UserController_1.UserController();
const router = (0, express_1.default)();
router.get('/', cont.getAll);
router.post('/', cont.createUser);
router.post('/auth', cont.login);
router.get('/refresh', cont.tokenrefresh);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map