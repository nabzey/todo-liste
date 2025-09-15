"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssocciationRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class AssocciationRepository {
    async findById(data) {
        return await prisma.association.findFirst({
            where: {
                usersId: data.usersId,
                tacheId: data.tacheId,
                permission: data.permission
            }
        });
    }
}
exports.AssocciationRepository = AssocciationRepository;
//# sourceMappingURL=AssociationRepository.js.map