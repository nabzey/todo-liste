"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acces = acces;
const AssociationRepository_1 = require("../repository/AssociationRepository");
const client_1 = require("@prisma/client");
const TacheService_1 = require("../services/TacheService");
const service = new TacheService_1.TacheService();
const repos = AssociationRepository_1.AssocciationRepository;
function acces(req, res, next) {
    const idtache = Number(req.params.id);
    const permission = {
        usersId: req.user?.id,
        tacheId: idtache,
        permission: req.method === "PUT" ? client_1.Choix.MODIFIER : client_1.Choix.SUPPRIMER
    };
    if (!permission) {
        return res.status(401).json({ message: "Accès interdit" });
    }
    next();
}
//# sourceMappingURL=AccesMIddleware.js.map