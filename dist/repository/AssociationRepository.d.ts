import { Association } from "@prisma/client";
export declare class AssocciationRepository {
    findById(data: Omit<Association, "id">): Promise<{
        id: number;
        usersId: number;
        tacheId: number;
        permission: import("@prisma/client").$Enums.Choix;
    } | null>;
}
//# sourceMappingURL=AssociationRepository.d.ts.map