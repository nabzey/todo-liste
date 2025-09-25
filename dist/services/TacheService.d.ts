import { Taches } from '@prisma/client';
export declare class TacheService {
    findAll(): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
        photoUrl: string | null;
    }[]>;
    createTache(tache: Omit<Taches, 'id'>): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
        photoUrl: string | null;
    }>;
    findId(id: number): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
        photoUrl: string | null;
    } | null>;
    updateId(id: number, data: Partial<Taches>): Promise<{
        id: number;
        titre: string;
        description: string;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
        photoUrl: string | null;
    }>;
    deleteTache(id: number): Promise<void>;
}
//# sourceMappingURL=TacheService.d.ts.map