"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerMiddleware = void 0;
const TacheService_1 = require("../services/TacheService");
const AssociationRepository_1 = require("../repository/AssociationRepository");
const client_1 = require("@prisma/client");
const service = new TacheService_1.TacheService;
const repos = new AssociationRepository_1.AssocciationRepository;
class PerMiddleware {
    static async permi(req, res, next) {
        try {
            const idtache = Number(req.params.id);
            const tache = await service.findId(idtache);
            if (tache?.usersid !== req.user?.id) {
                const data = {
                    usersId: req.user?.id,
                    tacheId: idtache,
                    permission: req.method === "PUT" ? client_1.Choix.MODIFIER : client_1.Choix.SUPPRIMER
                };
                const permis = await repos.findById(data);
                if (!permis) {
                    return res.status(401).json({ message: 'pas de permission pour modifier' });
                }
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ message: 'erreur serveur' });
        }
    }
}
exports.PerMiddleware = PerMiddleware;
//# sourceMappingURL=PerMiddleware.js.map