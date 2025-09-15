"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
class UserRepository {
    async findAll() {
        return await prisma.users.findMany();
    }
    async findById(id) {
        return await prisma.users.findUnique({ where: { id } });
    }
    create(data) {
        return prisma.users.create({
            data
        });
    }
    async update(id, data) {
        return await prisma.users.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await prisma.users.delete({ where: { id } });
    }
    async findByEmail(email) {
        return await prisma.users.findUnique({
            where: { email }
        });
    }
    async updatestatus(id, data) {
        return await prisma.users.update({
            where: { id },
            data
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map