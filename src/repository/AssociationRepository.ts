import { Association, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class AssocciationRepository {
    async findById(data: Omit<Association, "id">) {
        return await prisma.association.findFirst({
            where: {
                usersId: data.usersId,
                tacheId: data.tacheId,
                permission: data.permission
            }
        })
    }
}