import { Taches } from '@prisma/client';
export declare class TacheService {
    findAll(): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }[]>;
    createTache(tache: Taches): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }>;
    findId(id: number): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    } | null>;
    updateId(id: number, data: Partial<Taches>): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }>;
    deleteTache(id: number): Promise<void>;
}
//# sourceMappingURL=TacheService.d.ts.map