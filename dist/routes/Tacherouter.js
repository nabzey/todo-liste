"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TacheController_1 = require("../controllers/TacheController");
const PerMiddleware_1 = require("../middlewares/PerMiddleware");
const cont = new TacheController_1.TacheController();
const router = (0, express_1.default)();
router.get('/', cont.getAll);
router.post('/', cont.create);
router.get('/:id', cont.getOne);
router.put('/:id', PerMiddleware_1.PerMiddleware.permi, cont.updateOne);
router.delete('/:id', PerMiddleware_1.PerMiddleware.permi, cont.Tachedelete);
exports.default = router;
//# sourceMappingURL=Tacherouter.js.map