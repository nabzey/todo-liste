"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TacheRepository {
    async findAll() {
        return await prisma.taches.findMany();
    }
    async create(data) {
        return prisma.taches.create({
            data
        });
    }
    async findById(id) {
        return prisma.taches.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.taches.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await prisma.taches.delete({ where: { id } });
    }
    async tachedelete(id, usersid) {
        await prisma.taches.delete({ where: { id } });
    }
}
exports.TacheRepository = TacheRepository;
//# sourceMappingURL=TacheRepository.js.map